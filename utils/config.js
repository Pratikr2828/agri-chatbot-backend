
const INDICATORS = {
    // ==================== CROP AREA TABLE ====================
    crop_area: {
        table: "crop_area_data",
        column: "crop_area_approved",
        title: "Approved Crop Area",
        unit: "Hectares",
        keywords: [
            "crop area",
            "approved area",
            "approved crop",
            "crop status",
            "cultivation area",
            "crop cultivation",
            "production"
        ]
    },

    crop_area_closed: {
        table: "crop_area_data",
        column: "crop_area_closed",
        title: "Closed Crop Area",
        unit: "Hectares",
        keywords: ["closed area", "crop closed", "closed crop", "crop_area_closed"]
    },

    farmers: {
        table: "crop_area_data",
        column: "no_of_farmers",
        title: "Registered Farmers",
        unit: "Farmers",
        keywords: [
            "farmer",
            "farmers",
            "farmer count",
            "number of farmers",
            "total farmers",
            "farmer participation"
        ]
    },

    plots: {
        table: "crop_area_data",
        column: "no_of_plots",
        title: "Number of Plots",
        unit: "Plots",
        keywords: ["plots recorded", "crop plots", "number of plots"]
    },

    // pending_validation: {
    //     table: "crop_area_data",
    //     column: "pending",
    //     title: "Crops Pending Validation",
    //     unit: "Hectares",
    //     keywords: [
    //         "pending validation",
    //         "pending approval",
    //         "not approved",
    //         "awaiting approval",
    //         "pending crops",
    //         "validation pending"
    //     ]
    // },

    // ==================== AGGREGATE TABLE ====================
    total_plots: {
        table: "aggregate_summary_data",
        column: "total_plots",
        title: "Total Plots",
        unit: "Plots",
        keywords: ["total plots", "all plots", "total number of plots"]
    },

    assigned_plots: {
        table: "aggregate_summary_data",
        column: "total_assigned_plots",
        title: "Assigned Plots for Survey",
        unit: "Plots",
        keywords: ["assigned plots", "plots assigned", "assigned for survey"]
    },

    surveyed_plots: {
        table: "aggregate_summary_data",
        column: "total_plots_surveyed",
        title: "Plots Surveyed",
        unit: "Plots",
        keywords: [
            "surveyed plots",
            "plots surveyed",
            "survey completed",
            "survey progress"
        ]
    },

    unsurveyed_plots: {
        table: "aggregate_summary_data",
        column: "total_plots_unable_to_survey",
        title: "Unable to Survey Plots",
        unit: "Plots",
        keywords: ["unable to survey", "unsurveyed", "not surveyed"]
    },

    survey_approved: {
        table: "aggregate_summary_data",
        column: "total_survey_approved",
        title: "Surveys Approved",
        unit: "Surveys",
        keywords: ["survey approved", "approved surveys"]
    },

    survey_under_review: {
        table: "aggregate_summary_data",
        column: "total_survey_under_review",
        title: "Surveys Under Review",
        unit: "Surveys",
        keywords: ["under review", "pending review"]
    },

    today_survey: {
        table: "aggregate_summary_data",
        column: "total_today_survey",
        title: "Today's Survey Count",
        unit: "Surveys",
        keywords: ["today survey", "daily survey"]
    },

    surveyors: {
        table: "aggregate_summary_data",
        column: "total_no_of_surveyors",
        title: "Number of Surveyors",
        unit: "Surveyors",
        keywords: ["surveyors", "surveyor count"]
    },

    // ==================== CULTIVATED TABLE ====================
    surveyed_area: {
        table: "cultivated_summary_data",
        column: "total_surveyed_area",
        title: "Total Surveyed Area",
        unit: "Hectares",
        keywords: [
            "surveyed area",
            "cultivated area",
            "agricultural area"
        ]
    },

    surveyable_area: {
        table: "cultivated_summary_data",
        column: "total_surveyable_area",
        title: "Total Surveyable Area",
        unit: "Hectares",
        keywords: ["surveyable area"]
    },

    fallow_area: {
        table: "cultivated_summary_data",
        column: "total_fallow_area",
        title: "Fallow Area",
        unit: "Hectares",
        keywords: ["fallow", "fallow land"]
    },

    na_area: {
        table: "cultivated_summary_data",
        column: "total_na_area",
        title: "NA Area",
        unit: "Hectares",
        keywords: ["na area", "not available"]
    },

    harvested_area: {
        table: "cultivated_summary_data",
        column: "total_harvested_area",
        title: "Harvested Area",
        unit: "Hectares",
        keywords: ["harvested area"]
    },

    irrigated_area: {
        table: "cultivated_summary_data",
        column: "total_irrigated_area",
        title: "Irrigated Area",
        unit: "Hectares",
        keywords: ["irrigated area"]
    },

    unirrigated_area: {
        table: "cultivated_summary_data",
        column: "total_unirrigated_area",
        title: "Unirrigated Area",
        unit: "Hectares",
        keywords: ["unirrigated", "rainfed"]
    },

    perennial_area: {
        table: "cultivated_summary_data",
        column: "total_perennial_crop_area",
        title: "Perennial Crop Area",
        unit: "Hectares",
        keywords: ["perennial crop"]
    },

    biennial_area: {
        table: "cultivated_summary_data",
        column: "total_biennial_crop_area",
        title: "Biennial Crop Area",
        unit: "Hectares",
        keywords: ["biennial crop"]
    },

    seasonal_area: {
        table: "cultivated_summary_data",
        column: "total_seasonal_crop_area",
        title: "Seasonal Crop Area",
        unit: "Hectares",
        keywords: ["seasonal crop", "rabi vs", "season wise survey"]
    },

    surveyed_plots_cult: {
        table: "cultivated_summary_data",
        column: "total_surveyed_plots",
        title: "Total Surveyed Plots",
        unit: "Plots",
        keywords: ["total surveyed plots"]
    }
};


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
    INDICATORS,
    DISTRIBUTION_KEYWORDS,
    CURRENT_WORDS,
    dimensionColumnMap,
    DICTIONARY,
    SYNONYMS
}
