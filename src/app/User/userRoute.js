module.exports = function (app) {
  const fileUpload = require("express-fileupload");
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const morgan = require("morgan");
  const _ = require("lodash");
  // 파일 업로드 허용
  app.use(
    fileUpload({
      createParentPath: true,
    })
  );

  // 미들 웨어 추가
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan("dev"));

  const user = require("./userController");

  // 0. 테스트 api
  //app.get("/main", user.getTest);

  //3-1. 즐겨찾기 조회 api
  app.get("/main/heart/:userid", user.getBookmark);


  //5-1. 내 정보 조회 api
  app.get("/main/profile/:userid", user.getUserInfo);

  //5-2. 내 프로필 수정 api
  app.post("/main/profile/:userid/image", user.postUserImage);

  //5-3. 내 프로필 수정 api
  app.post("/main/profile/:userid/nickname", user.postUserNickname);

  //5-4. 탈퇴 api
  app.post("/main/profile/:userid/setting/resign", user.postUserResign);

  //5-5 내 제보 현황 조회 api
  app.get("/main/facility/register/:userid", user.myFacilityRegistered);
};
