const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const loginDao = require("./loginDao");
const { isEmpty } = require("lodash");

exports.naverLogin = async function (
  name,
  email,
  phone_number,
  birth,
  sex,
  nickname,
  platform_type,
  access_token
) {
  //등록 유무 검사 필요

  const insertUserData = [
    name,
    email,
    phone_number,
    birth,
    sex,
    nickname,
    platform_type,
    access_token,
  ];
  const connection = await pool.getConnection(async (conn) => conn);

  // DB에 이미 등록된 유저인지 확인
  const emailCheck = await loginDao.getUserId(connection, insertUserData);
  if (isEmpty(emailCheck)) {
    // 유저 정보 DB에 저장
    const login_result = await loginDao.naversignup(connection, insertUserData);

    // 해당 유저ID 리턴
    const result = await loginDao.getUserId(connection, insertUserData);

    connection.release();
    return response(baseResponse.SUCCESS, result);
  } else {
    return errResponse(baseResponse.SIGNIN_ERROR);
  }

  // return result;
};
