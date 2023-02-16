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
exports.registerFacilityImgExsits = async function (location, title, type, installAgency, la, lo, FacImg) {
   try {
       // 시설 중복 확인
       const locationRows = await facilityProvider.locationCheck(location);
       if (locationRows.length > 0) return errResponse(baseResponse.REGISTER_REDUNDANT_LOCATION);

       const insertFacilInfoParams = [location, title, type, installAgency, la, lo, FacImg];

       const connection = await pool.getConnection(async (conn) => conn);

       const facilResult = await facilityDao.insertFacilInfoImgExist(connection, insertFacilInfoParams);
       connection.release();
       return response(baseResponse.SUCCESS);

   } catch (err) {
       logger.error(`App - registerFacility Service error\n: ${err.message}`);
       return errResponse(baseResponse.DB_ERROR);
   }
}
exports.retrieveBookmark = async function(facilityid, userid){
    try{

        const connection = await pool.getConnection(async (conn)=> conn);

        const newparams = [facilityid, userid];
        const editInfoResult = await facilityDao.insertBookmark(connection, newparams);
        console.log(`${userid}의 북마크 추가 완료`);
        connection.release();

        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App - editInfo Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


exports.registerReview = async function (facilityid, userid, rating, content){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);

        const reviewparams = [facilityid, userid, rating, content];
        const registerReviewReusult = await facilityDao.insertReview(connection, reviewparams);
        console.log(`${facilityid}의 후기 추가 완료`);
        connection.release();

        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App - registerReview error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


exports.reportfacility = async function (facilityid, userid, reportType){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);

        const reportparams = [facilityid, userid, reportType];
        const reportFacilityResult = await facilityDao.insertReport(connection, reportparams);
        console.log(`${facilityid} 신고 접수 완료`);
        connection.release();

        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App = reportFacility error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
