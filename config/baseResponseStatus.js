module.exports = {
  // Success
  SUCCESS: { isSuccess: true, code: 1000, message: true },

  // Success
  SUCCESS: { isSuccess: true, code: 1000, message: true },

  NAVERLOGIN: { isSuccess: true, code: 1002, message: "네이버 로그인 성공" },
  SIGNUP: { isSuccess: true, code: 1001, message: "신규 유저 로그인 성공" },
  SIGNIN: { isSuccess: true, code: 1002, message: "기존 유저 로그인 성공" },

  // Request Error
  USER_ID_NOT_MATCH_IN_BOOKMARK: {
    isSuccess: false,
    code: 3001,
    message: "해당 id를 찾을 수 없습니다.",
  },

  USER_ID_NOT_MATCH_IN_PROFILE: {
    isSuccess: false,
    code: 5001,
    message: "해당 id를 찾을 수 없습니다.",
  },
  NICKNAME_OVER_LENGTH: {
    isSuccess: false,
    code: 5002,
    message: "닉네임의 길이가 20자를 이상입니다.",
  },
  ALREADY_USER_RESIGN: {
    isSuccess: false,
    code: 5003,
    message: "이미 탈퇴처리 되었습니다.",
  },

  REGISTER_REDUNDANT_LOCATION: {
    isSuccess: false,
    code: 2001,
    message: "이미 존재하는 시설입니다.",
  },

  //Connection, Transaction 등의 서버 오류
  DB_ERROR: { isSuccess: false, code: 4000, message: "데이터 베이스 에러" },
  SERVER_ERROR: { isSuccess: false, code: 4001, message: "서버 에러" },

  SIGNIN_ERROR: {
    isSuccess: false,
    code: 4002,
    message: "회원가입 에러-이메일 중복",
  },
};
