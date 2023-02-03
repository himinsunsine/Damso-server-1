module.exports = {

    // Success
    SUCCESS : {"isSuccess": true, "code":1000, "message": true},

    // Request Error
    USER_ID_NOT_MATCH_IN_BOOKMARK :{"isSuccess": false, "code":3001, "message": "해당 id를 찾을 수 없습니다."},
    USER_ID_NOT_MATCH_IN_PROFILE : {"isSuccess": false, "code":5001, "message": "해당 id를 찾을 수 없습니다."},
    NICKNAME_OVER_LENGTH : {"isSuccess": false, "code":5002, "message": "닉네임의 길이가 20자를 이상입니다."},
    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 
}