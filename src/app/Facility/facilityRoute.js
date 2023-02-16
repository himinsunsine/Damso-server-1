module.exports = function (app) {
  const facility = require("./facilityController");

  //1-2. 흡연구역 간단 조회 api
  app.get("/main/facility/simple/:facilityid", facility.getFacilitySimpleInfo);

  //1-3. 흡연구역 상세 조회 api
  app.get("/main/facility/detail/:facilityid", facility.getFacilityDetailInfo);

  // 2-3. 시설 제보 api
  app.post("/main/facility/register", facility.postFacilityRegister);

  //1-4. 흡연구역 상세 조회에서 북마크 추가 api
  app.post("/main/facility/detail/:facilityid", facility.postFacilityBookmark);

  //2-4. 흡연구역 검색 api
  app.get("/pin", facility.getSearch);

  //2-1. 후기 작성 api
  app.post("/main/facility/:facilityid/reviews/write", facility.postFacilityReviews);

  //2-2. 허위 정보 신고 api
  app.post("/main/facility/:facilityid/report", facility.postFacilityReport);
};
