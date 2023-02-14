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

// 1-3. 흡연구역 상세 조회
async function selectFacilityDetailInfo(connection, facilityid) {
  //흡연구역 상세정보 select
  const selectFacilityDetailQuery = `
                  SELECT  title, img, report, rating, location, type, installAgency
                  FROM facility
                  WHERE facility_id = ?;
                   `;
  const [selectFacilityDetail] = await connection.query(
    selectFacilityDetailQuery,
    facilityid
  );

  //해당 흡연구역 모든 리뷰 select
  const selectReviewQuery = `
                  SELECT  u.nickname, u.profile, r.content, r.rating
                  from facility f 
                  join review r 
                  on f.facility_id = r.facility_facility_id
                  join user u 
                  on r.user_user_id = u.user_id
                  where facility_id =?;
                   `;
  const [selectReview] = await connection.query(selectReviewQuery, facilityid);

  //리턴값
  const reviews = [];
  for (let i = 0; i < selectReview.length; i++) {
    let j = {
      nickname: selectReview[i].nickname,
      profileImg: selectReview[i].profile,
      content: selectReview[i].content,
      rating: selectReview[i].rating,
    };
    reviews.push(j);
  }

  const checkFacilityDetailInfo = {
    title: selectFacilityDetail[0].title,
    img: selectFacilityDetail[0].img,
    report: selectFacilityDetail[0].report,
    location: selectFacilityDetail[0].location,
    type: selectFacilityDetail[0].type,
    installAgency: selectFacilityDetail[0].installAgency,
    reviews: reviews,
  };

  return checkFacilityDetailInfo;
}

// 위치로 시설 조회
async function selectFacilLocation(connection, location) {
  const selectFacilLocationQuery = `
    SELECT location, title
    FROM facility
    WHERE location = ?;
    `;
  const [locationRows] = await connection.query(
    selectFacilLocationQuery,
    location
  );
  return locationRows;
}

async function insertFacilInfo(connection, insertFacilInfoParams) {
  const insertFacilInfoQuery = `
      INSERT INTO facility(location, title, type, installAgency, la, lo, report, createdAt, updatedAt, status)
      VALUES (?, ?, ?, ?, ?, ?, 1, NOW(), NOW(), 1);
    `;
  const insertFacilInfoRow = await connection.query(
    insertFacilInfoQuery,
    insertFacilInfoParams
  );

  return insertFacilInfoRow;
}

// 2-4. 흡연구역 검색
async function searchFacilityInfo(connection, searchFacilityParams) {
  const selectSearchFacility = `
    SELECT st_distance(POINT(${searchFacilityParams[1]}, ${searchFacilityParams[0]}), POINT(127.0959459000, 37.5353642300));
`;
}

async function insertFacilInfoImgExist(
  connection,
  insertFacilInfoImgExistParams
) {
  const insertFacilInfoImgExistQuery = `
      INSERT INTO facility(location, title, type, installAgency, la, lo, img, report, createdAt, updatedAt, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW(), 1);
    `;
  const insertFacilInfoImgExistRow = await connection.query(
    insertFacilInfoImgExistQuery,
    insertFacilInfoImgExistParams
  );

  return insertFacilInfoImgExistRow;
}

// 1-4. 흡연구역 상세 조회에서 북마크 추가
async function insertBookmark(connection, newparams) {
  const insertBookmarkQuery = `
    insert into bookmark(facility_id, user_id) values(?,?);
  `;
  const insertBookmark = await connection.query(insertBookmarkQuery, newparams);
  return insertBookmark;
}

module.exports = {
  selectFacilityInfo,
  selectFacilityDetailInfo,
  selectFacilLocation,
  insertFacilInfo,
  insertFacilInfoImgExist,
  insertBookmark,
};
