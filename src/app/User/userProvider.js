const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

exports.retrieveBookmark = async function (userid) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await userDao.selectBookmark(connection, userid);

  connection.release();
  return result;
};
exports.retrieveUser = async function (userid) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await userDao.selectUserInfo(connection, userid);

  connection.release();
  return result;
};

