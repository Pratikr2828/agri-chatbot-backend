import { 
  classifyIntent, 
  generateNarration, 
  getConversationResponse, 
  resolveImplicitContext, 
  askLLMToRewriteQuery, 
  preprocessQuery, 
  detectGeographyFromQuery 
} from "./nlp.service.js";
import { LGD_TO_STATE } from "../utils/lgdStateMap.js";
import { fuzzy } from "fast-fuzzy";
import executeAnalytics from "./csv.service.js";

async function handleChat(query, userLgd) {
    const userState = LGD_TO_STATE[userLgd] || `State (LGD: ${userLgd})`;
    // 1️⃣ Classify intent
    let workingQuery = preprocessQuery(query);
    const detectedState = detectGeographyFromQuery(workingQuery);
    console.log("detectedState", detectedState);
    let effectiveLgd = [{ state_lgd_code: userLgd }];
    if (detectedState) {
        effectiveLgd = detectedState;
    }
    let intent = classifyIntent(workingQuery);
    console.log("RAW INTENT", intent);
    const lowConfidence =
        !intent?.indicator ||
        (intent?.confidence !== undefined && intent.confidence < 0.5);

    if (lowConfidence) {
        console.log("here is confidence", lowConfidence);
        const rewrittenQuery = await askLLMToRewriteQuery(query);
        console.log("RAW rewrittenQuery INTENT", rewrittenQuery);
        workingQuery = preprocessQuery(rewrittenQuery);
        intent = classifyIntent(workingQuery);
    }

    intent = await resolveImplicitContext(intent);
    console.log("RESOLVED INTENT", intent);

    // 2️⃣ Conversation mode
    if (intent.mode === "conversation") {
        const message = await getConversationResponse(intent.sub_type, query);

        return {
            title: "AgriStack Assistant",
            chart_data: { type: "message", labels: [], values: [], unit: "" },
            narration: message,
            metadata: {
                intent_type: "conversation",
                state: userState
            }
        };
    }

    // 3️⃣ Analytics mode
    try {
        let result;
        if (intent.scope === "national") {
            result = await executeAnalytics(intent, null);  // no state filter
        } else {
            result = await executeAnalytics(intent, effectiveLgd);
        }
        const narration = await generateNarration(result, userState, query);
        console.log("result data.......", result, narration, intent)
        return {
            title: result.title || "Analysis",
            chart_data: {
                type: result.chart_type || "kpi",
                labels: result.labels || [],
                values: result.values || [],
                unit: result.unit || "",
                percentages: result.percentages || []
            },
            narration,
            metadata: {
                intent_type: "analytics",
                state: userState,
                indicator: intent.indicator,
                dimension: intent.dimension,
                record_count: result.record_count || 0,
                original_query: query,
                parsed_query: intent,
                timestamp: new Date().toISOString(),
                data_query: result.data_query
            }
        };
    } catch (err) {
        console.log("here is the data", err);
        return {
            title: "Error",
            chart_data: { type: "message", labels: [], values: [], unit: "" },
            narration: `Sorry, I couldn't process your request: ${err.message}`,
            metadata: { error: true }
        };
    }
}


const STATE_LIST = [];

for (const stateCode in LGD_TO_STATE) {
    const stateObj = LGD_TO_STATE[stateCode];

    STATE_LIST.push({
        name: stateObj.state_name.toLowerCase(),
        state_name: stateObj.state_name,
        state_lgd_code: stateCode
    });
}

function detectGeographyFuzzy(query) {
    if (!query) return null;

    const lowerQuery = query.toLowerCase();

    let bestMatch = null;
    let highestScore = 0;

    for (const state of STATE_LIST) {
        const score = fuzzy(state.name, lowerQuery); // score between 0–1

        if (score > highestScore) {
            highestScore = score;
            bestMatch = state;
        }
    }

    // 🔥 Set minimum confidence
    if (highestScore >= 0.6) {
        return {
            level: "state",
            state_name: bestMatch.state_name,
            state_lgd_code: bestMatch.state_lgd_code,
            confidence: highestScore
        };
    }

    return null;
}
export default handleChat;
