import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _adm_permission from "./adm_permission.js";
import _adm_role from "./adm_role.js";
import _adm_role_permission from "./adm_role_permission.js";
import _adm_token from "./adm_token.js";
import _adm_user from "./adm_user.js";
import _aggregate_summary_data from "./aggregate_summary_data.js";
import _aggregate_summary_data_03_11 from "./aggregate_summary_data_03_11.js";
import _aip_telemetry_logs from "./aip_telemetry_logs.js";
import _aiu_data from "./aiu_data.js";
import _aiu_telemetry_logs from "./aiu_telemetry_logs.js";
import _chunk from "./chunk.js";
import _chunk_group from "./chunk_group.js";
import _crop from "./crop.js";
import _crop_area_data from "./crop_area_data.js";
import _crop_area_data_25_10_citus from "./crop_area_data_25_10_citus.js";
import _crop_backup_25_03 from "./crop_backup_25_03.js";
import _cultivated_summary_data from "./cultivated_summary_data.js";
import _cultivated_summary_data_25_10_citus from "./cultivated_summary_data_25_10_citus.js";
import _distributed_table from "./distributed_table.js";
import _district_lgd_data from "./district_lgd_data.js";
import _error_codes from "./error_codes.js";
import _error_data_upag from "./error_data_upag.js";
import _mv_refresh_log from "./mv_refresh_log.js";
import _options from "./options.js";
import _season from "./season.js";
import _season_dates from "./season_dates.js";
import _sharied_data_with_upag from "./sharied_data_with_upag.js";
import _sharing_data_upag_03_11 from "./sharing_data_upag_03_11.js";
import _sharing_data_upag_11_11 from "./sharing_data_upag_11_11.js";
import _state_lgd_data from "./state_lgd_data.js";
import _stripe from "./stripe.js";
import _sub_districts_lgd_data from "./sub_districts_lgd_data.js";
import _surveyor_activity_data from "./surveyor_activity_data.js";
import _surveyor_activity_data_03_11 from "./surveyor_activity_data_03_11.js";
import _surveyor_activity_data_25_10_citus from "./surveyor_activity_data_25_10_citus.js";
import _telemetry_logs from "./telemetry_logs.js";
import _telemetry_logs_new from "./telemetry_logs_new.js";
import _telemetry_logs_new_dummy from "./telemetry_logs_new_dummy.js";
import _village_lgd_data from "./village_lgd_data.js";
import _villages_excel_data from "./villages_excel_data.js";

export default function initModels(sequelize) {
    const adm_permission = _adm_permission.init(sequelize, DataTypes);
    const adm_role = _adm_role.init(sequelize, DataTypes);
    const adm_role_permission = _adm_role_permission.init(sequelize, DataTypes);
    const adm_token = _adm_token.init(sequelize, DataTypes);
    const adm_user = _adm_user.init(sequelize, DataTypes);
    const aggregate_summary_data = _aggregate_summary_data.init(sequelize, DataTypes);
    const aggregate_summary_data_03_11 = _aggregate_summary_data_03_11.init(sequelize, DataTypes);
    const aip_telemetry_logs = _aip_telemetry_logs.init(sequelize, DataTypes);
    const aiu_data = _aiu_data.init(sequelize, DataTypes);
    const aiu_telemetry_logs = _aiu_telemetry_logs.init(sequelize, DataTypes);
    const chunk = _chunk.init(sequelize, DataTypes);
    const chunk_group = _chunk_group.init(sequelize, DataTypes);
    const crop = _crop.init(sequelize, DataTypes);
    const crop_area_data = _crop_area_data.init(sequelize, DataTypes);
    const crop_area_data_25_10_citus = _crop_area_data_25_10_citus.init(sequelize, DataTypes);
    const crop_backup_25_03 = _crop_backup_25_03.init(sequelize, DataTypes);
    const cultivated_summary_data = _cultivated_summary_data.init(sequelize, DataTypes);
    const cultivated_summary_data_25_10_citus = _cultivated_summary_data_25_10_citus.init(sequelize, DataTypes);
    const distributed_table = _distributed_table.init(sequelize, DataTypes);
    const district_lgd_data = _district_lgd_data.init(sequelize, DataTypes);
    const error_codes = _error_codes.init(sequelize, DataTypes);
    const error_data_upag = _error_data_upag.init(sequelize, DataTypes);
    const mv_refresh_log = _mv_refresh_log.init(sequelize, DataTypes);
    const options = _options.init(sequelize, DataTypes);
    const season = _season.init(sequelize, DataTypes);
    const season_dates = _season_dates.init(sequelize, DataTypes);
    const sharied_data_with_upag = _sharied_data_with_upag.init(sequelize, DataTypes);
    const sharing_data_upag_03_11 = _sharing_data_upag_03_11.init(sequelize, DataTypes);
    const sharing_data_upag_11_11 = _sharing_data_upag_11_11.init(sequelize, DataTypes);
    const state_lgd_data = _state_lgd_data.init(sequelize, DataTypes);
    const stripe = _stripe.init(sequelize, DataTypes);
    const sub_districts_lgd_data = _sub_districts_lgd_data.init(sequelize, DataTypes);
    const surveyor_activity_data = _surveyor_activity_data.init(sequelize, DataTypes);
    const surveyor_activity_data_03_11 = _surveyor_activity_data_03_11.init(sequelize, DataTypes);
    const surveyor_activity_data_25_10_citus = _surveyor_activity_data_25_10_citus.init(sequelize, DataTypes);
    const telemetry_logs = _telemetry_logs.init(sequelize, DataTypes);
    const telemetry_logs_new = _telemetry_logs_new.init(sequelize, DataTypes);
    const telemetry_logs_new_dummy = _telemetry_logs_new_dummy.init(sequelize, DataTypes);
    const village_lgd_data = _village_lgd_data.init(sequelize, DataTypes);
    const villages_excel_data = _villages_excel_data.init(sequelize, DataTypes);

    adm_user.belongsTo(adm_role, { as: "role", foreignKey: "role_id" });
    adm_role.hasMany(adm_user, { as: "adm_users", foreignKey: "role_id" });
    adm_token.belongsTo(adm_user, { as: "admin", foreignKey: "admin_id" });
    adm_user.hasMany(adm_token, { as: "adm_tokens", foreignKey: "admin_id" });
    sub_districts_lgd_data.belongsTo(district_lgd_data, { as: "district_lgd_code_district_lgd_datum", foreignKey: "district_lgd_code" });
    district_lgd_data.hasMany(sub_districts_lgd_data, { as: "sub_districts_lgd_data", foreignKey: "district_lgd_code" });
    village_lgd_data.belongsTo(district_lgd_data, { as: "district_lgd_code_district_lgd_datum", foreignKey: "district_lgd_code" });
    district_lgd_data.hasMany(village_lgd_data, { as: "village_lgd_data", foreignKey: "district_lgd_code" });
    district_lgd_data.belongsTo(state_lgd_data, { as: "state_lgd_code_state_lgd_datum", foreignKey: "state_lgd_code" });
    state_lgd_data.hasMany(district_lgd_data, { as: "district_lgd_data", foreignKey: "state_lgd_code" });
    sub_districts_lgd_data.belongsTo(state_lgd_data, { as: "state_lgd_code_state_lgd_datum", foreignKey: "state_lgd_code" });
    state_lgd_data.hasMany(sub_districts_lgd_data, { as: "sub_districts_lgd_data", foreignKey: "state_lgd_code" });
    village_lgd_data.belongsTo(state_lgd_data, { as: "state_lgd_code_state_lgd_datum", foreignKey: "state_lgd_code" });
    state_lgd_data.hasMany(village_lgd_data, { as: "village_lgd_data", foreignKey: "state_lgd_code" });
    village_lgd_data.belongsTo(sub_districts_lgd_data, { as: "sub_district_lgd_code_sub_districts_lgd_datum", foreignKey: "sub_district_lgd_code" });
    sub_districts_lgd_data.hasMany(village_lgd_data, { as: "village_lgd_data", foreignKey: "sub_district_lgd_code" });

    return {
        adm_permission,
        adm_role,
        adm_role_permission,
        adm_token,
        adm_user,
        aggregate_summary_data,
        aggregate_summary_data_03_11,
        aip_telemetry_logs,
        aiu_data,
        aiu_telemetry_logs,
        chunk,
        chunk_group,
        crop,
        crop_area_data,
        crop_area_data_25_10_citus,
        crop_backup_25_03,
        cultivated_summary_data,
        cultivated_summary_data_25_10_citus,
        distributed_table,
        district_lgd_data,
        error_codes,
        error_data_upag,
        mv_refresh_log,
        options,
        season,
        season_dates,
        sharied_data_with_upag,
        sharing_data_upag_03_11,
        sharing_data_upag_11_11,
        state_lgd_data,
        stripe,
        sub_districts_lgd_data,
        surveyor_activity_data,
        surveyor_activity_data_03_11,
        surveyor_activity_data_25_10_citus,
        telemetry_logs,
        telemetry_logs_new,
        telemetry_logs_new_dummy,
        village_lgd_data,
        villages_excel_data,
    };
}
