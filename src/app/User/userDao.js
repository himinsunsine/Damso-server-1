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

//1. 내 정보

//내 정보 조회 --ok
async function selectUserInfo(connection, userid) {
  const selectUserListQuery = `
        SELECT user_id, name, nickname, profile 
        from user 
        where user_id=?;
    `;
  const [userInfoRows] = await connection.query(selectUserListQuery, userid);
  return userInfoRows;
}

//설정 - 문의

//설정 -  이용약관 조회

//설정 - 개인정보 처리방침 조회

//설정 - 회원 탈퇴

//내 제보 현황 조회

//내 정보 수정 - 이미지
async function updateUserImage(connection, newparams) {
  const updateUserQuery = `
        UPDATE user 
        SET profile = ? 
        WHERE user_id = ?;
    `;
  const updateUserRow = await connection.query(updateUserQuery, newparams);
  return updateUserRow;
}
//내 정보 수정 - 닉네임
// async function updateUserNickname(connection, userid){
//     const updateUserQuery = `
//         UPDATE user
//         SET nickname = ?
//         WHERE user_id = ?;
//     `;
//     const updateUserRow = await connection.query(updateUserQuery, userid);
//     return updateUserRow[0];
// }

//2. 즐겨찾기

//즐겨찾기 조회 --ok

async function selectBookmark(connection, userid) {
  const selectBookmarkquery = `
    select user_id, id, f.facility_id, title, location, img, rating 
    from bookmark 
    inner join facility f on bookmark.facility_id = f.facility_id;
    `;
  const [checkBookmark] = await connection.query(selectBookmarkquery, userid);
  return checkBookmark;
}

//시설 클릭

async function selectFacility(connection, la, lo) {
  const selectFacilityquery = `
        
    `;
  const selectFacility = await connection.query(updateUserQuery, la, lo);
  return selectFacility[0];
}

// 1-2. 흡연구역 간단 조회
async function selectFacilityInfo(connection, facilityid) {
  const selectFacilityIdQuery = `
                   SELECT facility_id, title, img, report, rating
                   FROM facility 
                   WHERE facility_id = ?;
                   `;
  const [checkFacilitySimpleInfo] = await connection.query(
    selectFacilityIdQuery,
    facilityid
  );
  return checkFacilitySimpleInfo;
}

module.exports = {
  selectBookmark,
  //updateUserNickname,
  updateUserImage,
  selectUserInfo,
  selectFacilityInfo,
};
