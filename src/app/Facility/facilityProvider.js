const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const facilityDao = require("./facilityDao");

exports.retrieveFacility = async function (facilityid) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await facilityDao.selectFacilityInfo(connection, facilityid);

  connection.release();
  return result;
};


exports.retrieveFacilityDetail = async function (facilityid) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await facilityDao.selectFacilityDetailInfo(
    connection,
    facilityid
  );

  connection.release();
  return result;
};


exports.locationCheck = async function (location) {
  const connection = await pool.getConnection(async (conn) => conn);
  const locationCheckResult = await facilityDao.selectFacilLocation(connection, location);
  connection.release();

  return locationCheckResult;
};