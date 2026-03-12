import axios from "axios";
import { fuzzy } from "fast-fuzzy";
import {
    INDICATORS,
    DIMENSIONS,
    CROP_NAMES,
    SEASON_NAMES,
    DISTRIBUTION_KEYWORDS,
    CONVERSATION_RESPONSES,
    DICTIONARY,
    SYNONYMS,
} from "../utils/config.js";

import village_lgd_data from "../models/village_lgd_data.js";
import { Sequelize } from "sequelize";
import district_lgd_data from "../models/district_lgd_data.js";
import state_lgd_data from "../models/state_lgd_data.js";
import { LGD_TO_STATE } from "../utils/lgdStateMap.js";


const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL = "llama3";

function detectIndicator(query) {

    let bestIndicator = null;
    let bestScore = 0;

    for (const [indicatorKey, indicatorConfig] of Object.entries(INDICATORS)) {

        let score = 0;

        for (const keyword of indicatorConfig.keywords) {

            const keywordLower = keyword.toLowerCase();

            if (query.includes(keywordLower)) {

                // Longer keywords get higher score
                score += keywordLower.split(" ").length;

            }

        }

        if (score > bestScore) {
            bestScore = score;
            bestIndicator = indicatorKey;
        }

    }

    return bestIndicator;

}
function classifyIntent(query) {

    const q = query.toLowerCase().trim();
    const words = new Set(q.split(/\W+/));

    // -----------------------------
    // Conversation Detection
    // -----------------------------
    if (isGreeting(words)) {
        return {
            mode: "conversation",
            sub_type: "greeting",
            confidence: 0.9
        };
    }

    if (isHelpQuery(words)) {
        return {
            mode: "conversation",
            sub_type: "help",
            confidence: 0.9
        };
    }

    // -----------------------------
    // Analytics Detection
    // -----------------------------
    const indicator = detectIndicator(q);
    const dimension = detectDimension(q);

    let year_filter = detectYear(q);
    const season_filter = detectSeason(q);
    const crop_filter = detectCrop(q);

    const isNational = detectNationalScope(q);

    // If dimension is year, remove year filter
    if (dimension === "year" && year_filter) {
        year_filter = null;
    }

    // -----------------------------
    // Top N Detection (optimized)
    // -----------------------------
    const detectedTop = detectTopN(q);

    const top_n = dimension === "district"
        ? (detectedTop || 5)
        : detectedTop;

    // -----------------------------
    // Indicator Fallback
    // -----------------------------
    if (!indicator) {
        return {
            mode: "conversation",
            sub_type: "fallback",
            confidence: 0.3
        };
    }

    // -----------------------------
    // Final Intent Object
    // -----------------------------
    return {
        mode: "analytics",
        indicator,
        dimension,

        filter: {
            crop: crop_filter,
            season: season_filter,
            year: year_filter
        },

        comparison_type: detectComparison(q),

        top_n,

        intent_type: dimension ? "distribution" : "summary",

        current_type: detectCurrentType(q),

        sorting_type: detectOrder(q),

        scope: isNational ? "national" : "state",

        confidence: 0.9
    };

}

function resolveImplicitContext(intent) {
    console.log(":emnter into step 2")
    if (!intent.current_type) return intent;

    if (intent.current_type === "year") {
        intent.filter.year = getCurrentFinancialYear();
        return intent;
    }

    if (intent.current_type === "both" || intent.current_type === "season") {
        intent.filter.year = getCurrentFinancialYear();
        intent.filter.season = [getCurrentSeason()];
    }

    return intent;
}

async function detectGeographyFromDB(detectedGeo) {
    const q = normalizeQuery(detectedGeo);
    console.log("here is the location", q);

    const { village, district, state } = detectedGeo;

    let foundState = null;
    let foundDistrict = null;
    let foundVillage = null;

    /* ===============================
       1️⃣ STATE VALIDATION
    ================================ */
    if (state) {
        foundState = await state_lgd_data.findOne({
            where: {
                state_name: {
                    [Sequelize.Op.iLike]: state
                }
            },
            raw: true
        });

        if (!foundState) {
            return { error: `State "${state}" not found` };
        }
    }

    /* ===============================
       2️⃣ DISTRICT VALIDATION
    ================================ */
    if (district) {
        const districtWhere = {
            district_name: {
                [Sequelize.Op.iLike]: district
            }
        };

        // If state is provided → validate inside that state
        if (foundState) {
            districtWhere.state_lgd_code = foundState.state_lgd_code;
        }

        foundDistrict = await district_lgd_data.findOne({
            where: districtWhere,
            raw: true
        });

        if (!foundDistrict) {
            return {
                level: "state",
                state_lgd_code: '27'
            };
            // return { error: `District "${district}" not found` };
        }
    }

    /* ===============================
       3️⃣ VILLAGE VALIDATION
    ================================ */
    if (village) {
        const villageWhere = {
            village_name: {
                [Sequelize.Op.iLike]: village
            }
        };

        if (foundDistrict) {
            villageWhere.district_lgd_code = foundDistrict.district_lgd_code;
        }

        if (foundState && !foundDistrict) {
            villageWhere.state_lgd_code = foundState.state_lgd_code;
        }

        foundVillage = await village_lgd_data.findOne({
            where: villageWhere,
            raw: true
        });

        if (!foundVillage) {
            return { error: `Village "${village}" not found` };
        }
    }

    /* ===============================
       4️⃣ HIERARCHY RETURN
    ================================ */

    // 🟢 If village exists → highest level
    if (foundVillage) {
        return {
            level: "village",
            state_lgd_code: foundVillage.state_lgd_code,
            district_lgd_code: foundVillage.district_lgd_code,
            village_lgd_code: foundVillage.village_lgd_code
        };
    }

    // 🟡 If district exists
    if (foundDistrict) {
        return {
            level: "district",
            state_lgd_code: foundDistrict.state_lgd_code,
            district_lgd_code: foundDistrict.district_lgd_code
        };
    }

    // 🔵 If only state exists
    if (foundState) {
        return {
            level: "state",
            state_lgd_code: foundState.state_lgd_code
        };
    }

    return null;
}

/* ===============================
   DETECTORS
================================ */

function detectNationalScope(query) {
    const nationalWords = [
        "all states",
        "which states",
        "across states",
        "in india",
        "nationwide",
        "overall states",
        "state-wise",
        "state wise"
    ];
    return nationalWords.some(word => query.includes(word));
}

function detectCurrentType(query) {
    if (!query) return null;

    query = query.toLowerCase();

    if (/\b(this year|current year|present year|latest year)\b/.test(query)) {
        return "year";
    }

    if (/\b(this season|current season|present season|latest season)\b/.test(query)) {
        return "season";
    }

    if (/\b(current|present|ongoing|latest|now)\b/.test(query)) {
        return "both";
    }

    return null;
}

function normalizeQuery(query) {
    return query
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function detectDimension(query) {

    if (!query) return null;

    const q = query.toLowerCase();

    let bestDimension = null;
    let bestScore = 0;

    // -------------------------
    // 1️⃣ Strong regex detection
    // -------------------------
    const strongPatterns = {
        district: /(by district|district-wise|districtwise|across districts|top districts|district comparison)/,
        crop: /(by crop|crop-wise|cropwise|top crops|which crops|crop comparison)/,
        year: /(by year|year-wise|yearwise|annual|year trend|year comparison)/,
        season: /(by season|season-wise|seasonwise|season trend)/,
        irrigation: /(by irrigation|irrigation-wise|water source|irrigation comparison)/,
        village: /(by village|village-wise|villagewise|village comparison)/,
        state: /(by state|state-wise|statewise|across states|state comparison)/
    };

    for (const dim in strongPatterns) {
        if (strongPatterns[dim].test(q)) {
            return dim;
        }
    }

    // -------------------------
    // 2️⃣ Special pattern
    // -------------------------
    if (/top\s+\d+\s+crops?/.test(q)) {
        return "crop";
    }

    if (/top\s+\d+\s+districts?/.test(q)) {
        return "district";
    }

    // -------------------------
    // 3️⃣ Keyword scoring
    // -------------------------
    for (const [dimensionKey, dimensionConfig] of Object.entries(DIMENSIONS)) {

        let score = 0;

        for (const keyword of dimensionConfig.keywords) {

            const keywordLower = keyword.toLowerCase();

            if (q.includes(keywordLower)) {

                // longer phrases get higher score
                score += keywordLower.split(" ").length;

            }

        }

        if (score > bestScore) {
            bestScore = score;
            bestDimension = dimensionKey;
        }

    }

    return bestScore > 0 ? bestDimension : null;

}


console.log(detectDimension("Show data by district")); // district
console.log(detectDimension("Top 5 crops in 2025"));   // crop
console.log(detectDimension("Trend over years"));      // year
console.log(detectDimension("Water source distribution")); // irrigation

function detectCrop(query) {
    if (!query) return null;

    const words = query.toLowerCase().split(/\W+/);

    const crops = CROP_NAMES.filter(crop =>
        words.includes(crop.toLowerCase())
    );

    return crops.length > 0 ? crops : null;
} 
function detectSeason(query) {
    if (!query) return null;

    const cleanedQuery = basicClean(query); 

    // Check for direct matches or common typos
    for (const season of SEASON_NAMES) {
        if (cleanedQuery.includes(season.toLowerCase())) {
            return season; // return proper season casing
        }
    }

    // Check for partial/fuzzy match (e.g., "khari" → "kharif")
    if (cleanedQuery.includes("khari")) return "kharif";
    if (cleanedQuery.includes("rabi")) return "rabi";
    if (cleanedQuery.includes("zaid")) return "zaid";

    return null;
}

function detectYear(query) {
    if (!query) return null;

    const cleanedQuery = basicClean(query);

    // Match years in formats like: 2022, 2023-24, 2023/24
    const yearRegex = /\b(20\d{2})([-\/]?(\d{2})?)?\b/g;

    const matches = [...cleanedQuery.matchAll(yearRegex)];

    if (matches.length === 0) return null;

    // Return first match
    const match = matches[0];
    if (match[2]) {
        // If range exists (e.g., 2023-24)
        const startYear = match[1];
        const endYear = match[3] ? "20" + match[3] : null;
        return endYear ? `${startYear}-${endYear}` : startYear;
    }

    return match[1]; // single year
}

function detectTopN(query) {
    if (!query) return null;

    const q = query.toLowerCase();

    // 1️⃣ Explicit "top N"
    let match = q.match(/top\s+(\d+)/);
    if (match) return Number(match[1]);

    // 2️⃣ Explicit "bottom N"
    match = q.match(/bottom\s+(\d+)/);
    if (match) return Number(match[1]);

    // 3️⃣ Superlative (highest type → default 5)
    if (/(highest|largest|maximum|most|top)/.test(q)) {
        return 5;
    }

    // 4️⃣ Reverse superlative (lowest type → default 5)
    if (/(lowest|least|minimum|smallest|less|decrease|bottom)/.test(q)) {
        return 5;
    }

    return null;
}

function detectOrder(query) {
    if (!query) return "DESC";

    const q = query.toLowerCase();

    if (/(lowest|least|minimum|smallest|less|decrease|bottom)/.test(q)) {
        return "ASC";
    }

    return "DESC";
}

const COMPARISON_KEYWORDS = [
    "compare",
    "vs",
    "versus",
    "difference",
    "between"
];

function detectComparison(query) {
    if (!query) return null;

    const words = query.toLowerCase().split(/\s+/);

    for (const word of words) {

        // ✅ 1️⃣ Partial match (handles: compar, compa, diffe etc.)
        for (const keyword of COMPARISON_KEYWORDS) {
            if (keyword.startsWith(word) || word.startsWith(keyword)) {
                return "comparison";
            }
        }

        // ✅ 2️⃣ Fuzzy fallback (handles: comapre, diference etc.)
        for (const keyword of COMPARISON_KEYWORDS) {
            const score = fuzzy(word, keyword);
            if (score > 0.7) {
                return "comparison";
            }
        }
    }

    return null;
}


/* ===============================
   CONVERSATION HANDLER
================================ */

async function getConversationResponse(type, query) {
    const responses = CONVERSATION_RESPONSES[type] || CONVERSATION_RESPONSES.fallback;
    return responses[Math.floor(Math.random() * responses.length)];
}

/* ===============================
   NARRATION GENERATION (OLLAMA)
================================ */

function isEmptyResult(result) {
    return (
        !result ||
        !Array.isArray(result.values) ||
        result.values.length === 0 ||
        result.values.every(v => v === 0 || v === null)
    );
}

async function askLLMToRewriteQuery(userQuery) {
    const prompt = `
You are a text normalization engine for an agriculture analytics chatbot.

Task:
- Detect the language of the input (Hindi, Marathi, English, or mixed).
- Translate everything into clear English.
- Correct spelling mistakes
- Fix spacing issues
- Convert to lowercase
- DO NOT translate the sentence into another language.
- Expand common short forms (e.g., "mh" → "maharashtra", "yr" → "year").
- Keep agricultural meaning intact
- Do NOT add explanation
- Do NOT add extra words
- Return ONLY the corrected sentence

User Query:
"${userQuery}"

Corrected Query:
`;

    try {
        const res = await axios.post(
            OLLAMA_URL,
            {
                model: MODEL,
                prompt,
                stream: false,
                options: {
                    temperature: 0   // deterministic output
                }
            },
            { timeout: 200000 }
        );

        const corrected = res.data?.response?.trim();

        // Safety cleanup (extra protection)
        return corrected
            ?.replace(/["']/g, "")      // remove quotes
            ?.replace(/\n/g, " ")       // remove newlines
            ?.trim() || userQuery;

    } catch (err) {
        console.log("LLM rewrite failed:", err.message);
        return userQuery;  // Always return original if LLM fails
    }
}

async function extractGeographyFromLLM(userQuery) {
    const prompt = `
You are a geography entity extraction engine for an agriculture analytics system.

Your task:
- Extract village name (if mentioned)
- Extract district name (if mentioned)
- Extract state name (if mentioned)
- Detect Hindi, Marathi, English or mixed automatically
- Convert names into proper English spelling if needed
- Fix spelling mistakes
- DO NOT add explanation
- DO NOT return anything except valid JSON
- If something is not mentioned, return null

Return STRICT JSON in this exact format:

{
  "village": string | null,
  "district": string | null,
  "state": string | null
}

User Query:
"${userQuery}"

JSON:
`;

    try {
        const res = await axios.post(
            OLLAMA_URL,
            {
                model: MODEL,
                prompt,
                stream: false,
            },
            { timeout: 2000000 }
        );

        let output = res.data?.response?.trim();

        // 🔹 Remove possible markdown formatting
        output = output
            ?.replace(/```json/g, "")
            ?.replace(/```/g, "")
            ?.trim();

        // 🔹 Parse safely
        const parsed = JSON.parse(output);

        return {
            village: parsed.village || null,
            district: parsed.district || null,
            state: parsed.state || null
        };

    } catch (err) {
        console.log("LLM geography extraction failed:", err.message);
        return {
            village: null,
            district: null,
            state: null
        };
    }
}


async function generateNarration(result, stateName, userQuery) {
    if (isEmptyResult(result)) {
        return fallbackNarration(result, stateName);
    }
    const prompt = `
You are an agriculture data analyst for Government of India.

State: ${stateName}

User Question:
"${userQuery}"

Computed Data Summary:
- Title: ${result.title}
- Indicator: ${result.indicator}
- Unit: ${result.unit}
- Labels: ${JSON.stringify(result.labels)}
- Values: ${JSON.stringify(result.values)}

Instructions:
- Write a clear, professional, government-style explanation.
- Keep the narration concise and factual.
- DO NOT exceed 150 words.
- Ideal length: 100–140 words.
- Do not add opinions, assumptions, or recommendations.
`;

    try {
        const res = await axios.post(
            OLLAMA_URL,
            {
                model: MODEL,
                prompt,
                stream: false
            },
            { timeout: 4000000 }
        );

        return res.data?.response || fallbackNarration(result, stateName);
    } catch (err) {
        console.log("fallback error logs here", err);
        return fallbackNarration(result, stateName);
    }
}

/* ===============================
   FALLBACK NARRATION
================================ */

function fallbackNarration(result, stateName) {
    if (!result.values || result.values.length === 0) {
        return `No sufficient data is available for current question.`;
    }

    const total = result.values.reduce((a, b) => a + Number(b), 0);

    return `In ${stateName}, the total ${result.indicator.replace("_", " ")} is ${total.toLocaleString()} ${result.unit}. The data has been aggregated based on the selected criteria.`;
}

/* ===============================
   HELPERS
================================ */

function isGreeting(words) {
    const greetings = new Set([
        // Basic
        "hi", "hello", "hey", "hii", "hiii", "heyy",

        // Time based
        "good", "morning", "afternoon", "evening", "night",
        "gm", "ga", "ge", "gn",

        // Casual / slang
        "yo", "sup", "wassup", "whats", "up",

        // Indian greetings
        "namaste", "namaskar", "ram", "jai", "shree", "shri",
        "salaam", "assalamualaikum", "adaab",

        // Bot addressing
        "bot", "ai", "assistant",

        // Emoji greeting
        "👋",
        "how are you",
        "what are you doing",
        "what is up",
        "who are you",
        "tell me about yourself",
        "good morning",
        "good evening"
    ]);

    return [...words].some(word => greetings.has(word)) && words.size <= 5;
}

function isHelpQuery(words) {
    const helpWords = new Set(["help", "support", "guide"]);
    return [...words].some(w => helpWords.has(w)) && words.size <= 8;
}

/* ===============================
   EXPORTS
================================ */

function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    console.log("here is the current season", month);
    if (month >= 6 && month <= 10) return "kharif";
    if (month >= 10 || month <= 3) return "rabi";
    return "zaid";
}

function getCurrentFinancialYear() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 1–12

    if (month >= 4) {
        return `${year}-${year + 1}`;
    } else {
        return `${year - 1}-${year}`;
    }
}

/* ===============================
   Data Cleaning
================================ */

function basicClean(text) {
    return text
        .toLowerCase()                  // lowercase
        .normalize("NFD")               // remove accents
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, " ")       // remove special chars
        .replace(/\s+/g, " ")           // remove extra spaces
        .trim();
}

function correctSpelling(query) {
    if (!query) return "";

    return query
        .toLowerCase()
        .split(/\s+/)
        .map(word => DICTIONARY[word] || word)
        .join(" ");
}

function applySynonyms(query) {
    let updatedQuery = query;

    // Replace longer phrases first (important!)
    const sortedKeys = Object.keys(SYNONYMS)
        .sort((a, b) => b.length - a.length);

    for (const key of sortedKeys) {
        const regex = new RegExp(`\\b${key}\\b`, "gi");
        updatedQuery = updatedQuery.replace(regex, SYNONYMS[key]);
    }

    return updatedQuery;
}


function preprocessQuery(query) {
    let cleaned = basicClean(query);
    cleaned = correctSpelling(cleaned);
    cleaned = applySynonyms(cleaned);
    return cleaned;
}

function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function detectGeographyFromQuery(query) {
    if (!query) return [];

    const lowerQuery = query.toLowerCase();

    const detectedStates = [];
    const detectedDistricts = [];

    for (const stateCode in LGD_TO_STATE) {

        const stateObj = LGD_TO_STATE[stateCode];
        const stateName = stateObj.state_name;

        const stateRegex = new RegExp(
            `\\b${escapeRegex(stateName.toLowerCase())}\\b`,
            "i"
        );

        // 🔹 Detect state
        if (stateRegex.test(lowerQuery)) {
            detectedStates.push({
                level: "state",
                state_name: stateName,
                state_lgd_code: stateCode
            });
        }

        // 🔹 Detect districts
        for (const districtCode in stateObj.districts) {

            const districtName = stateObj.districts[districtCode];

            const districtRegex = new RegExp(
                `\\b${escapeRegex(districtName.toLowerCase())}\\b`,
                "i"
            );

            if (districtRegex.test(lowerQuery)) {

                detectedDistricts.push({
                    level: "district",
                    state_name: stateName,
                    state_lgd_code: stateCode,
                    district_name: districtName,
                    district_lgd_code: districtCode
                });
            }
        }
    }

    // ✅ IMPORTANT LOGIC:
    // If district found → return ONLY district
    if (detectedDistricts.length > 0) {
        return detectedDistricts;
    }

    // Else return states
    return detectedStates;
}

export  {
    detectCrop,
    classifyIntent,
    generateNarration,
    getConversationResponse,
    resolveImplicitContext,
    askLLMToRewriteQuery,
    preprocessQuery,
    detectGeographyFromQuery,
    detectGeographyFromDB,
    extractGeographyFromLLM
};
