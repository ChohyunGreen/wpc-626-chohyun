// JS9-1.제이슨 파일 외부 JS

// 완전한 제이슨 파일을 불러온다!
import realJson from "./JS9-1.진짜제이슨.json" with { type: "json" };
// -> 제이슨 파일 불러오는 형식:
// import 변수명 from 경로 with {type:'json'}
// import 변수명 from 경로 assert {type:'json'}
// -> 지금은 assert를 지원하지 않는다!
// 그런데... 프리티어는 assert를 공식문법으로 인식해서
// with를 쓰면 프리티어 에러가 남;;;;
// 그래도 with를 쓰자! 왜? 에러가 나면 안되니까!

console.log("진짜제이슨:", realJson);

// 불러온 제이슨 파일을 파싱하여 재할당한다!
let myJson = JSON.parse(JSON.stringify(realJson));
console.log(myJson);
// shopping -> 메뉴 찍기
console.log(myJson.shopping.타이틀);

// 화면에 출력하기
// -> 객체이므로 Object.keys()로 배열화하며
// forEach()로 반복처리하면서 화면에 출력하기

// 출력할 요소 : .exp-box
const expBox = document.querySelector(".exp-box");

expBox.innerHTML = "<hr/><h1>진짜 제이슨파일로 부터 출력!</h1>";

Object.keys(myJson).forEach((v) => {
  expBox.innerHTML += `<h2>${v} : ${myJson[v].타이틀}</h2>`;
}); ///// forEach ///
