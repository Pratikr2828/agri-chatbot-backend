import { SEMANTIC_INDICATORS } from "./semanticLayer.js";

export const INDICATORS = SEMANTIC_INDICATORS;

// Dimensions

const DIMENSIONS = {
    district: {
        column: "district_lgd_code",
        title: "District",
        keywords: [
            "district",
            "district-wise",
            "by district",
            "districts",
            "districtwise"
        ]
    },

    season: {
        column: "season",
        title: "Season",
        keywords: [
            "season",
            "season-wise",
            "by season",
            "summer",
            "seasonal",
            "seasonwise"
        ]
    },

    crop: {
        column: "crop_name_eng",
        title: "Crop",
        keywords: [
            "crop",
            "crop-wise",
            "by crop",
            "crops",
            "top crops",
            "top 5 crops",
            "cropwise",
            "which crops"
        ]
    },

    year: {
        column: "year",
        title: "Year",
        keywords: [
            "year",
            "year-wise",
            "by year",
            "yearly",
            "annual",
            "yearwise"
        ]
    },
    review: {
        column: "total_survey_under_review",
        title: "Survey under review",
        keywords: [
            "review",
            "under review",
            "survey under review",
        ]
    },

    irrigation: {
        column: "irrigation_source",
        title: "Irrigation Source",
        keywords: [
            "irrigation",
            "irrigation source",
            "water source",
            "irrigation-wise"
        ]
    },

    village: {
        column: "village_lgd_code",
        title: "Village",
        keywords: [
            "village",
            "village-wise",
            "by village",
            "villagewise"
        ]
    },

    state: {
        column: "state_lgd_code",
        title: "State",
        keywords: [
            "state",
            "state-wise",
            "by state",
            "statewise",
            "across states"
        ]
    }
};


// Crops
const CROP_NAMES = [
    "wheat", "rice", "Rice/Paddy General", "Paddy", "Rice Bean", "Liquorice", "maize", "corn", "sorghum", "jowar", "bajra", "pearl millet",
    "chickpea", "gram", "chana", "pigeon pea", "tur", "arhar", "lentil", "moong", "urad",
    "sugarcane", "cotton", "soybean", "groundnut", "mustard", "sunflower", "safflower",
    "onion", "potato", "tomato", "brinjal", "chilli", "turmeric", "ginger",
    "banana", "mango", "orange", "grapes", "pomegranate", "guava", "papaya",
    "ragi", "barley", "oats", "sesame", "castor"
];

// Keywords that trigger distribution/breakdown
const DISTRIBUTION_KEYWORDS = [
    "distribution", "breakdown", "split", "comparison", "compare",
    "share", "by", "wise", "top", "highest", "lowest", "which",
    "across", "summary", "trend"
]

// Seasons
const SEASON_NAMES = ["kharif", "rabi", "zaid"];

// Conversation replies
const CONVERSATION_RESPONSES = {
    greeting: [
        "Hello! I'm your AgriStack Analytics Assistant. I can help you with crop area analysis, survey progress, farmer statistics, district comparisons, and much more. What would you like to know?",
    ],
    help: [
        "I can help with: crop area analysis, survey progress, farmer counts, irrigation data, district-wise comparisons, season-wise trends, and year-wise analysis. Try asking questions like 'Show district-wise cultivated area' or 'What is the total crop area for Kharif season?'"
    ]
};

const CURRENT_WORDS = ["current", "latest", "present", "ongoing", "now"];

const dimensionColumnMap = {
    district: "district_lgd_code",
    crop: "crop_name_eng",
    season: "season",
    year: "year",
    irrigation: "irrigation_source",
    village: "village_lgd_code",
    state: "state_lgd_code",
    review: "total_survey_under_review"
};


const DICTIONARY = {
    // survey
    "survay": "survey",
    "servay": "survey",
    "surveyd": "surveyed",

    // plots
    "plotts": "plots",
    "plotes": "plots",

    // assigned
    "asigned": "assigned",
    "assignned": "assigned",

    // farmers
    "farner": "farmer",
    "farmars": "farmers",

    // compare words
    "comapre": "compare",
    "campar": "compare",

    // superlatives
    "higest": "highest",
    "largst": "largest",
    "maximun": "maximum",
};


const SYNONYMS = {
    // --- Area / Plot ---
    acreage: "area",
    land: "plots",

    // --- Current / Present ---
    present: "current",
    ongoing: "current",
    running: "current",
    latest: "current",

    // --- Year General ---
    yr: "year",
    yrs: "year",
    yearly: "year",
    annually: "year",
    annual: "year",

    // --- Current Year Variations ---
    thisyear: "current year",
    "this year": "current year",
    currentyear: "current year",
    presentyear: "current year",
    ongoingyear: "current year",
    runningyear: "current year",
    latestyear: "current year",

    // --- Financial Year Variations ---
    fy: "financial year",
    "f.y": "financial year",
    "financialyear": "financial year",
    finyear: "financial year",
    fiscalyear: "financial year",
    fiscal: "financial",

    // --- Short State ---
    mh: "maharashtra"
};



export  {
    CONVERSATION_RESPONSES,
    SEASON_NAMES,
    CROP_NAMES,
    DIMENSIONS,
    DISTRIBUTION_KEYWORDS,
    CURRENT_WORDS,
    dimensionColumnMap,
    DICTIONARY,
    SYNONYMS
}
