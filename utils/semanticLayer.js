
export const SEMANTIC_INDICATORS = {

  /* ==================== CROP AREA TABLE ==================== */

  crop_area: {
    table: "crop_area_data",
    column: "crop_area_approved",
    title: "Approved Crop Area",
    unit: "Hectares",
    dimensions: ["state", "district", "village", "season", "year", "crop", "irrigation"],
    keywords: [
      "crop area",
      "approved area",
      "approved crop",
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
    dimensions: ["state", "district", "village", "season", "year", "crop", "irrigation"],
    keywords: [
      "closed area",
      "crop closed",
      "closed crop"
    ]
  },

  farmers: {
    table: "crop_area_data",
    column: "no_of_farmers",
    title: "Registered Farmers",
    unit: "Farmers",
    dimensions: ["state", "district", "village", "season", "year", "crop"],
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
    dimensions: ["state", "district", "village", "season", "year", "crop"],
    keywords: [
      "plots recorded",
      "crop plots",
      "number of plots"
    ]
  },

  /* ==================== AGGREGATE SUMMARY TABLE ==================== */

  total_plots: {
    table: "aggregate_summary_data",
    column: "total_plots",
    title: "Total Plots",
    unit: "Plots",
    dimensions: ["state", "district", "village", "season", "year"],
    keywords: [
      "total plots",
      "all plots",
      "total number of plots"
    ]
  },

  assigned_plots: {
    table: "aggregate_summary_data",
    column: "total_assigned_plots",
    title: "Assigned Plots for Survey",
    unit: "Plots",
    dimensions: ["state", "district", "village", "season", "year"],
    keywords: [
      "assigned plots",
      "plots assigned",
      "assigned for survey"
    ]
  },

  surveyed_plots: {
    table: "aggregate_summary_data",
    column: "total_plots_surveyed",
    title: "Plots Surveyed",
    unit: "Plots",
    dimensions: ["state", "district", "village", "season", "year"],
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
    dimensions: ["state", "district", "village", "season", "year"],
    keywords: [
      "unable to survey",
      "unsurveyed",
      "not surveyed"
    ]
  },

  survey_approved: {
    table: "aggregate_summary_data",
    column: "total_survey_approved",
    title: "Surveys Approved",
    unit: "Surveys",
    dimensions: ["state", "district", "village", "season", "year"],
    keywords: [
      "survey approved",
      "approved surveys"
    ]
  },

  survey_under_review: {
    table: "aggregate_summary_data",
    column: "total_survey_under_review",
    title: "Surveys Under Review",
    unit: "Surveys",
    dimensions: ["state", "district", "village", "season", "year"],
    keywords: [
      "under review",
      "pending review"
    ]
  },

  today_survey: {
    table: "aggregate_summary_data",
    column: "total_today_survey",
    title: "Today's Survey Count",
    unit: "Surveys",
    dimensions: ["state", "district", "village", "season", "year"],
    keywords: [
      "today survey",
      "daily survey"
    ]
  },

  surveyors: {
    table: "aggregate_summary_data",
    column: "total_no_of_surveyors",
    title: "Number of Surveyors",
    unit: "Surveyors",
    dimensions: ["state", "district", "season", "year"],
    keywords: [
      "surveyors",
      "surveyor count"
    ]
  },

  /* ==================== CULTIVATED SUMMARY TABLE ==================== */

  surveyed_area: {
    table: "cultivated_summary_data",
    column: "total_surveyed_area",
    title: "Total Surveyed Area",
    unit: "Hectares",
    dimensions: ["state", "district", "village", "season", "year"],
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
    dimensions: ["state", "district", "village", "season", "year"],
    keywords: ["surveyable area"]
  },

  fallow_area: {
    table: "cultivated_summary_data",
    column: "total_fallow_area",
    title: "Fallow Area",
    unit: "Hectares",
    dimensions: ["state", "district", "village", "season", "year"],
    keywords: ["fallow", "fallow land"]
  },

  na_area: {
    table: "cultivated_summary_data",
    column: "total_na_area",
    title: "NA Area",
    unit: "Hectares",
    dimensions: ["state", "district", "village", "season", "year"],
    keywords: ["na area", "not available"]
  },

  harvested_area: {
    table: "cultivated_summary_data",
    column: "total_harvested_area",
    title: "Harvested Area",
    unit: "Hectares",
    dimensions: ["state", "district", "village", "season", "year"],
    keywords: ["harvested area"]
  },

  irrigated_area: {
    table: "cultivated_summary_data",
    column: "total_irrigated_area",
    title: "Irrigated Area",
    unit: "Hectares",
    dimensions: ["state", "district", "village", "season", "year"],
    keywords: ["irrigated area"]
  },

  unirrigated_area: {
    table: "cultivated_summary_data",
    column: "total_unirrigated_area",
    title: "Unirrigated Area",
    unit: "Hectares",
    dimensions: ["state", "district", "village", "season", "year"],
    keywords: ["unirrigated", "rainfed"]
  },

  perennial_area: {
    table: "cultivated_summary_data",
    column: "total_perennial_crop_area",
    title: "Perennial Crop Area",
    unit: "Hectares",
    dimensions: ["state", "district", "season", "year"],
    keywords: ["perennial crop"]
  },

  biennial_area: {
    table: "cultivated_summary_data",
    column: "total_biennial_crop_area",
    title: "Biennial Crop Area",
    unit: "Hectares",
    dimensions: ["state", "district", "season", "year"],
    keywords: ["biennial crop"]
  },

  seasonal_area: {
    table: "cultivated_summary_data",
    column: "total_seasonal_crop_area",
    title: "Seasonal Crop Area",
    unit: "Hectares",
    dimensions: ["state", "district", "season", "year"],
    keywords: ["seasonal crop", "season wise survey"]
  },

  surveyed_plots_cult: {
    table: "cultivated_summary_data",
    column: "total_surveyed_plots",
    title: "Total Surveyed Plots",
    unit: "Plots",
    dimensions: ["state", "district", "village", "season", "year"],
    keywords: ["total surveyed plots"]
  }

};