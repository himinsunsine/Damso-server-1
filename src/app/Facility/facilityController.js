const facilityProvider = require("./facilityProvider.js");
const facilityService = require("../Facility/facilityService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const fs = require("fs");

/**
 * API No. 1-2
 * API Name : 흡연구역 간단 조회 API
 * [GET] /main/facility/simple/{facility_id}
 */
exports.getFacilitySimpleInfo = async function (req, res) {
  const facilityid = req.params.facilityid;
  
  const facilityInfo = await facilityProvider.retrieveFacility(facilityid);
  console.log(facilityInfo);
  if(facilityInfo[0].img == null){
    return res.send(response(baseResponse.SUCCESS, facilityInfo));
  }
  else {
    var fileName =`./facilityImg/${facilityInfo[0].img}`;
    const data = fs.readFileSync(fileName);

    const result =[facilityInfo, data];
    return res.send(response(baseResponse.SUCCESS, result));
    
  }

};

/**
 * API No. 1-3
 * API Name : 흡연구역 상세 조회 API
 * [GET] /main/facility/detail/{facility_id}
 */
exports.getFacilityDetailInfo = async function (req, res) {
  const facilityid = req.params.facilityid;

  const facilityInfo = await facilityProvider.retrieveFacilityDetail(
    facilityid
  );
  console.log(facilityInfo);
  
  if(facilityInfo.img == null){
    return res.send(response(baseResponse.SUCCESS, facilityInfo));
  }
  else {
    var fileName =`./facilityImg/${facilityInfo.img}`;
    const data = fs.readFileSync(fileName);

    const result =[facilityInfo, data];
    return res.send(response(baseResponse.SUCCESS, result));
    
  }
};


/**
 * API No. 2-3
 * API Name : 시설 제보
 * [POST] /main/facility/register
 */  
 exports.postFacilityRegister = async function (req, res) {
  /**
   * Body: location, title, type, installAgency, la, lo   //이미지 업로드 이슈 (우선 이미지는 전달받지 X)
   */

   // 빈 값 체크
   
  if(req.files.uploadFile){
    let img = req.files.uploadFile;
    img.mv("./facilityImg/"+img.name);
    const {location, title, type, installAgency, la, lo} = req.body;
    if (!location) return res.send(response(baseResponse.REGISTER_LOCATION_EMPTY));

    const registerwithImgResponse = await facilityService.registerFacilityImgExsits(
      location,
      title,
      type,
      installAgency,
      la,
      lo,
      img.name
    );
    return res.send(registerwithImgResponse);
    
  }  
  
   
  
};
/**
 * API No. 1-4
 * API Name : 흡연구역 상세 조회에서 북마크 추가 API
 * [POST] /main/facility/detail/{facility_id}
 */
exports.postFacilityBookmark = async function (req, res) {
  const facilityid = req.params.facilityid;
  const userid = req.body.userid;

  const setFacilityBookmark = await facilityService.retrieveBookmark(
    facilityid,
    userid
  );
  return res.send(response(baseResponse.SUCCESS, setFacilityBookmark));
};
