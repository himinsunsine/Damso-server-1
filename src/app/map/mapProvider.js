const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const mapDao = require("./mapDao");

exports.retrievePin = async function(){
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await mapDao.selectFacilities(connection);

    connection.release();
    return result;
}
exports.retrievePinbyType = async function(type){
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await mapDao.selectFacilitiesbyType(connection, type);

    connection.release();
    return result;
}
