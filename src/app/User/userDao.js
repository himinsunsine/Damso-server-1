//모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                  SELECT user_id, email, name 
                  FROM user;
                  `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// userId 회원 조회
async function selectUserId(connection, userid) {
  const selectUserIdQuery = `
                   SELECT user_id, email, nickname 
                   FROM user 
                   WHERE user_id = ?;
                   `;
  const [userRow] = await connection.query(selectUserIdQuery, userid);
  return userRow;
}

//5. 내 정보

//내 정보 조회 --ok
async function selectUserInfo(connection, userid) {
  const selectUserListQuery = `
        SELECT user_id, name, nickname, profile, status
        from user 
        where user_id=?;
    `;
  const [userInfoRows] = await connection.query(selectUserListQuery, userid);
  return userInfoRows;
}

//설정 - 문의

//설정 - 이용약관 조회

//설정 - 개인정보 처리방침 조회

//설정 - 회원 탈퇴
async function updateUserStatus(connection, userid) {
  const updateStatusQuery = `
        UPDATE user
        SET status = 'resign'
        WHERE user_id=?;
    `;
  const resignUserRow = await connection.query(updateStatusQuery, userid);
  return resignUserRow;
}

//내 제보 현황 조회

//내 정보 수정 - 이미지 --ok
async function updateUserImage(connection, newparams) {
  const updateUserQuery = `
        UPDATE user 
        SET profile = ? 
        WHERE user_id = ?;
    `;
  const updateUserRow = await connection.query(updateUserQuery, newparams);
  return updateUserRow;
}
//내 정보 수정 - 닉네임 --ok
async function updateUserNickname(connection, newparams) {
  const updateUserQuery = `
        UPDATE user 
        SET nickname = ? 
        WHERE user_id = ?;
    `;
  const updateUserRow = await connection.query(updateUserQuery, newparams);
  return updateUserRow;
}

//3. 즐겨찾기

//즐겨찾기 조회 --ok

async function selectBookmark(connection, userid) {
  const selectBookmarkquery = `
    select user_id, id, f.facility_id, title, location, img, rating 
    from bookmark 
    inner join facility f on bookmark.facility_id = f.facility_id
    where user_id=?;
    `;
  const [checkBookmark] = await connection.query(selectBookmarkquery, userid);
  return checkBookmark;
}

// 위치로 시설 조회
async function selectFacilLocation(connection, location) {
  const selectFacilLocationQuery = `
    SELECT location, title
    FROM facility
    WHERE location = ?;
    `;
  const [locationRows] = await connection.query(selectFacilLocationQuery, location);
  return locationRows;  
}

async function insertFacilInfo(connection, insertFacilInfoParams) {
  // 좌표 삽입 값 삽입 필요 (현재는 테이블에 위치만 삽입)
  const insertFacilInfoQuery = `
      INSERT INTO facility(location, title, type, installAgency, img, report, createdAt, updatedAt, status)
      VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW(), 1);
    `;
  const insertFacilInfoRow = await connection.query(
      insertFacilInfoQuery,
      insertFacilInfoParams
    );
    
    return insertFacilInfoRow;
}

module.exports = {
  selectBookmark,
  updateUserNickname,
  updateUserImage,
  selectUserInfo,
  updateUserStatus,
  selectFacilLocation,
  insertFacilInfo,
};
