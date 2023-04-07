module.exports= function(app){
  const map = require("./mapController");

  //메인 화면
  //app.get("/main", map.getMap);
  //원하는 type으로 시설 띄우기
  app.get("/main", map.getMapbyType);

}