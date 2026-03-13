// import {
//   classifyIntent,
//   generateNarration,
//   getConversationResponse,
//   resolveImplicitContext,
//   askLLMToRewriteQuery,
//   preprocessQuery,
//   detectGeographyFromQuery
// } from "./nlp.service.js";

// import { LGD_TO_STATE } from "../utils/lgdStateMap.js";
// import executeAnalytics from "./csv.service.js";


// async function handleChat(query, userLgd) {

//     const quickGreetings = ["hi", "hello", "hey", "good morning", "good evening"];

// const lowerQuery = query.trim().toLowerCase();

// if (quickGreetings.includes(lowerQuery)) {
//   return {
//     title: "AgriStack Assistant",
//     chart_data: { type: "message", labels: [], values: [], unit: "" },
//     narration:
//       "Hello! I’m the AgriStack Data Assistant. You can ask about crop area, farmers, irrigation, survey progress, and district comparisons.",
//     metadata: { intent_type: "conversation" }
//   };
// }

//   console.log("📩 Incoming query:", query);

//   const userState =
//     LGD_TO_STATE[userLgd]?.state_name || `State (LGD: ${userLgd})`;

//   /* ================================
//      1️⃣ Preprocess Query
//   ================================= */

//   let workingQuery = preprocessQuery(query);

//   /* ================================
//      2️⃣ Detect Geography
//   ================================= */
// const detectedGeo = detectGeographyFromQuery(workingQuery);

// let effectiveLgd = [];

// if (detectedGeo && detectedGeo.length > 0) {
//     effectiveLgd = detectedGeo;
// } else if (userLgd) {
//     effectiveLgd = [{ state_lgd_code: userLgd }];
// }

// console.log("📍 Geography detected:", effectiveLgd);

//   /* ================================
//      3️⃣ Intent Detection
//   ================================= */

//   let intent = classifyIntent(workingQuery);

//   console.log("🧠 RAW INTENT:", intent);

//   const lowConfidence =
//     !intent?.indicator ||
//     (intent?.confidence !== undefined && intent.confidence < 0.5);

//   /* ================================
//      4️⃣ LLM Query Rewrite (Fallback)
//   ================================= */

//   if (lowConfidence) {

//     console.log("⚠️ Low confidence intent. Using LLM rewrite...");

//     const rewrittenQuery = await askLLMToRewriteQuery(query);

//     console.log("🔁 Rewritten Query:", rewrittenQuery);

//     workingQuery = preprocessQuery(rewrittenQuery);

//     intent = classifyIntent(workingQuery);

//     console.log("🧠 Intent after rewrite:", intent);
//   }

//   /* ================================
//      5️⃣ Resolve Implicit Context
//   ================================= */

//   intent = await resolveImplicitContext(intent);

//   console.log("🧩 Resolved Intent:", intent);

//   /* ================================
//      6️⃣ Conversation Mode
//   ================================= */

//   if (intent.mode === "conversation") {

//     const message = await getConversationResponse(intent.sub_type, query);

//     return {
//       title: "AgriStack Assistant",

//       chart_data: {
//         type: "message",
//         labels: [],
//         values: [],
//         unit: ""
//       },

//       narration: message,

//       metadata: {
//         intent_type: "conversation",
//         state: userState,
//         timestamp: new Date().toISOString()
//       }
//     };
//   }

//   /* ================================
//      7️⃣ Analytics Mode
//   ================================= */

//   try {

//     let result;

//     if (intent.scope === "national") {
//       result = await executeAnalytics(intent, null);
//     } else {
//       result = await executeAnalytics(intent, effectiveLgd);
//     }

//     console.log("📊 Analytics result:", result);

//     /* ================================
//        8️⃣ Narration Generation
//     ================================= */

//     const narration = await generateNarration(result, userState, query);

//     return {
//       title: result.title || "Analysis",

//       chart_data: {
//         type: result.chart_type || "kpi",
//         labels: result.labels || [],
//         values: result.values || [],
//         unit: result.unit || "",
//         percentages: result.percentages || []
//       },

//       narration,

//       metadata: {
//         intent_type: "analytics",
//         state: userState,

//         indicator: intent.indicator,
//         dimension: intent.dimension,

//         record_count: result.record_count || 0,

//         original_query: query,
//         parsed_query: intent,

//         data_query: result.data_query || "",

//         timestamp: new Date().toISOString()
//       }
//     };

//   } catch (err) {

//     console.error("❌ Analytics error:", err);

//     return {
//       title: "Error",

//       chart_data: {
//         type: "message",
//         labels: [],
//         values: [],
//         unit: ""
//       },

//       narration:
//         "Sorry, I couldn't process your request. Please try again.",

//       metadata: {
//         error: true,
//         message: err.message,
//         timestamp: new Date().toISOString()
//       }
//     };
//   }
// }

// export default handleChat;

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
import executeAnalytics from "./csv.service.js";

/* ==================================
   MAIN CHAT HANDLER
================================== */

async function handleChat(query, userLgd) {

  console.log("📩 Incoming query:", query);

  const lowerQuery = query.trim().toLowerCase();

  /* ==================================
     1️⃣ Instant Greeting Shortcut
  ================================== */

  const quickGreetings = [
    "hi",
    "hello",
    "hey",
    "good morning",
    "good evening",
    "good afternoon"
  ];

  if (quickGreetings.includes(lowerQuery)) {
    return {
      title: "AgriStack Assistant",
      chart_data: { type: "message", labels: [], values: [], unit: "" },
      narration:
        "Hello! I’m the AgriStack Data Assistant. You can ask about crop area, farmers, irrigation, survey progress, district comparisons, and seasonal analysis.",
      metadata: {
        intent_type: "conversation",
        timestamp: new Date().toISOString()
      }
    };
  }

  /* ==================================
     2️⃣ User State Mapping
  ================================== */

  const userState =
    LGD_TO_STATE[userLgd]?.state_name || `State (LGD: ${userLgd})`;

  /* ==================================
     3️⃣ Preprocess Query
  ================================== */

  let workingQuery = preprocessQuery(query);

  /* ==================================
     4️⃣ Intent Detection
  ================================== */

  let intent = classifyIntent(workingQuery);

  console.log("🧠 RAW INTENT:", intent);

  /* ==================================
     5️⃣ Conversation Mode
  ================================== */

  if (intent.mode === "conversation") {

    const message = await getConversationResponse(intent.sub_type, query);

    return {
      title: "AgriStack Assistant",
      chart_data: { type: "message", labels: [], values: [], unit: "" },
      narration: message,
      metadata: {
        intent_type: "conversation",
        state: userState,
        timestamp: new Date().toISOString()
      }
    };
  }

  /* ==================================
     6️⃣ LLM Query Rewrite (Fallback)
  ================================== */

  const lowConfidence =
    !intent?.indicator ||
    (intent?.confidence !== undefined && intent.confidence < 0.5);

  // only rewrite longer analytics queries
  if (lowConfidence && workingQuery.split(" ").length > 2) {

    console.log("⚠️ Low confidence intent → rewriting query");

    const rewrittenQuery = await askLLMToRewriteQuery(query);

    console.log("🔁 Rewritten Query:", rewrittenQuery);

    workingQuery = preprocessQuery(rewrittenQuery);

    intent = classifyIntent(workingQuery);

    console.log("🧠 Intent after rewrite:", intent);
  }

  /* ==================================
     7️⃣ Resolve Implicit Context
  ================================== */

  intent = await resolveImplicitContext(intent);

  console.log("🧩 Resolved Intent:", intent);

  /* ==================================
     8️⃣ Geography Detection (Analytics Only)
  ================================== */

  const detectedGeo = detectGeographyFromQuery(workingQuery);

  let effectiveLgd = [];

  if (detectedGeo?.length > 0) {
    effectiveLgd = detectedGeo;
  } else if (userLgd) {
    effectiveLgd = [{ state_lgd_code: userLgd }];
  }

  console.log("📍 Geography detected:", effectiveLgd);

  /* ==================================
     9️⃣ Analytics Mode
  ================================== */

  try {

    let result;

    if (intent.scope === "national") {
      result = await executeAnalytics(intent, null);
    } else {
      result = await executeAnalytics(intent, effectiveLgd);
    }

    console.log("📊 Analytics result:", result);

    /* ==================================
       🔟 Narration Generation
    ================================== */

    const narration = await generateNarration(result, userState, query);

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
        data_query: result.data_query || "",
        timestamp: new Date().toISOString()
      }
    };

  } catch (err) {

    console.error("❌ Analytics error:", err);

    return {
      title: "Error",
      chart_data: { type: "message", labels: [], values: [], unit: "" },
      narration:
        "Sorry, I couldn't process your request. Please try again.",
      metadata: {
        error: true,
        message: err.message,
        timestamp: new Date().toISOString()
      }
    };
  }
}

export default handleChat;