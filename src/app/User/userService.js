const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const crypto = require("crypto");
const {connect} = require("http2");

exports.postUserImage = async function(profile, userid){
    try{

        const connection = await pool.getConnection(async (conn)=> conn);

        const newparams = [profile, userid];
        const editInfoResult = await userDao.updateUserImage(connection, newparams);
        console.log(`${userid}의 프로필 변경 완료`);
        connection.release();

        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App - editInfo Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}