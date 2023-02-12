const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const facilityProvider = require("./facilityProvider");
const facilityDao = require("./facilityDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const crypto = require("crypto");
const {connect} = require("http2");



exports.registerFacility = async function (location, title, type, installAgency, la, lo) {
    try {
        // 시설 중복 확인
        const locationRows = await facilityProvider.locationCheck(location);
        if (locationRows.length > 0)
            return errResponse(baseResponse.REGISTER_REDUNDANT_LOCATION);

        const insertFacilInfoParams = [location, title, type, installAgency, la, lo];

        const connection = await pool.getConnection(async (conn) => conn);

        const facilResult = await facilityDao.insertFacilInfo(connection, insertFacilInfoParams);
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - registerFacility Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

// 이미지 있는 시설 업로드
//exports.registerFacilityImgExsits = async function (location, title, type, installAgency, la, lo, FacImg) {
//    try {
//        // 시설 중복 확인
//        const locationRows = await facilityProvider.locationCheck(location);
//        if (locationRows.length > 0)
//            return errResponse(baseResponse.REGISTER_REDUNDANT_LOCATION);
//
//        const insertFacilInfoParams = [location, title, type, installAgency, la, lo, FacImg];
//
//        const connection = await pool.getConnection(async (conn) => conn);
//
//        const facilResult = await facilityDao.insertFacilInfoImgExist(connection, insertFacilInfoParams);
//        connection.release();
//        return response(baseResponse.SUCCESS);
//
//    } catch (err) {
//        logger.error(`App - registerFacility Service error\n: ${err.message}`);
//        return errResponse(baseResponse.DB_ERROR);
//    }
//}