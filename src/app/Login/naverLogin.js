const bodyParser = require("body-parser");
const { use } = require("passport/lib");
const { naverLogin } = require("./loginProvider");
const loginProvider = require("../Login/loginProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

module.exports = function (app) {
  var client_id = "N0ZEtPeJzyzxu0vAtQ7j";
  var client_secret = "buratDFMaE";
  var state = "RAMDOM_STATE";
  var redirectURI = encodeURI("http://localhost:3000/callback");
  var api_url = "";
  var userData = {};
  // 프론트에서 처리하는 곳인데 일단 작성함
  // 네이버 로그인 요청 api
  app.get("/naverlogin", function (req, res) {
    api_url =
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
      client_id +
      "&redirect_uri=" +
      redirectURI +
      "&state=" +
      state;
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.end(
      "<a href='" +
        api_url +
        "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>"
    );
  });
  // 위에 요청하면 자동으로 요청됨
  app.get("/callback", function (req, res) {
    code = req.query.code;
    state = req.query.state;
    api_url =
      "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
      client_id +
      "&client_secret=" +
      client_secret +
      "&redirect_uri=" +
      redirectURI +
      "&code=" +
      code +
      "&state=" +
      state;
    var request = require("request");
    var options = {
      url: api_url,
      headers: {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
      },
    };
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
        res.end(body);
      } else {
        res.status(response.statusCode).end();
        console.log("error = " + response.statusCode);
      }
    });
  });
  // 회원가입 API (프론트한테 액세스토큰 헤더로 받아야 됨)
  // 유저 정보 받아서 DB 저장 후 userId 리턴
  app.get("/member", function (req, res) {
    var api_url = "https://openapi.naver.com/v1/nid/me";
    var request = require("request");
    // var header = req.header["x-access-token"] || req.query.token;
    var token = req.headers["x-access-token"];
    var header = "Bearer " + token; // Bearer 다음에 공백 추가
    var options = {
      url: api_url,
      headers: { Authorization: header },
    };
    if (token) {
      request.get(options, async function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
          userData = JSON.parse(body).response;
          console.log("userData");
          console.log(userData);
          const name = userData.name;
          const email = userData.email;
          const phone_number = userData.mobile_e164;
          const birth = userData.birthyear + "-" + userData.birthday;
          const sex = userData.gender;
          const nickname = userData.nickname; //닉네임 없어서 일단 이름으로,,
          // const profile = userData.profile_image;
          const platform_type = "naver";
          const access_token = token;
          const naverLogin = await loginProvider.naverLogin(
            name,
            email,
            phone_number,
            birth,
            sex,
            nickname,
            // profile,
            platform_type,
            access_token
          );
          return res.send(naverLogin);
        } else {
          console.log("error");
          if (response != null) {
            res.status(response.statusCode).end();
            console.log("error = " + response.statusCode);
          }
        }
      });
    } else {
      return res.send({
        status: false,
        message: "token 없음",
      });
    }

    //
  });
};
