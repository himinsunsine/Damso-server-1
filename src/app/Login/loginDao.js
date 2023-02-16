const {
  USER_ID_NOT_MATCH_IN_BOOKMARK,
} = require("../../../config/baseResponseStatus");

async function naversignup(connection, insertUserData) {
  // 좌표 삽입 값 삽입 필요 (현재는 테이블에 위치만 삽입)
  const insertUserDataQuery = `
      INSERT INTO user( name, email, phone_number, birth, sex, nickname, profile, platform_type, access_token)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
  const insertUserDataRow = await connection.query(
    insertUserDataQuery,
    insertUserData
  );
  return insertUserDataRow;
}
async function getUserId(connection, insertUserData) {
  const getUserId = `
      SELECT user_id
      FROM user
      WHERE email = '${insertUserData[1]}' ;
    `;
  const [getUserIdRow] = await connection.query(getUserId, insertUserData[1]);
  return getUserIdRow;
}

module.exports = {
  naversignup,
  getUserId,
};
