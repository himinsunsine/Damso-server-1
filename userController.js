const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /main
 */
exports.getTest = async function (req, res) {
  return res.send(response(baseResponse.SUCCESS));
};

/**
 * API No. 1
 * API Name : 즐겨찾기 조회 API
 * [GET] /main/heart/{user_id}
 */
exports.getBookmark = async function (req, res) {
  const userid = req.params.userid;

  if (!userid) {
    return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH_IN_BOOKMARK));
  }
  const userBookmark = await userProvider.retrieveBookmark(userid);
  return res.send(response(baseResponse.SUCCESS, userBookmark));
};
/**
 * API No. 2
 * API Name : 내 정보 조회 API
 * [GET] /main/profile/{user_id}
 */
exports.getUserInfo = async function (req, res) {
  const userid = req.params.userid;

  const userInfo = await userProvider.retrieveUser(userid);
  return res.send(response(baseResponse.SUCCESS, userInfo));
};

/**
 * API No. 3
 * API Name : 내 이미지 수정 API
 * [POST] /main/profile/{user_id}/image
 */
// exports.postUserImage = async function(req, res){
//     const profile = req.body;
//     const userid = req.params.userid;

//     const UserImageResponse = await userService.postUserImage(profile, userid);

//     return res.send(UserImageResponse);
// }

/**
 * API No. 1-2
 * API Name : 흡연구역 간단 조회 API
 * [GET] /main/facility/simple/{facility_id}
 */
exports.getFacilitySimpleInfo = async function (req, res) {
  const facilityid = req.params.facilityid;

  const facilityInfo = await userProvider.retrieveFacility(facilityid);
  return res.send(response(baseResponse.SUCCESS, facilityInfo));

/**
 * API No. 2-3 시설 제보
 * API Name : 시설 제보
 * [POST] /main/facility/register
 */  
 exports.postFacilityRegister = async function (req, res) {
     /**
      * Body; location, title, type, installAgency, img
      */
     const {location, title, type, installAgency, img} = req.body;


     const userid = req.params.userid;
    
     const registerResponse = await userService.registerFacility(
         location,
         title,
         type,
         installAgency,
         img
         );
    
     return res.send(registerResponse);
     };

};