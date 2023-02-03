const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const facilityProvider = require("./facilityProvider");
const facilityDao = require("./facilityDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const crypto = require("crypto");
const {connect} = require("http2");

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