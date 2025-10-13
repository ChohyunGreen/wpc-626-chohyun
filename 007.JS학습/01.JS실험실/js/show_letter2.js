// JS실험실 : 03.글자등장2 JS - show_letter2.js

// 나의 함수 가져오기 ////
import myFn from "./my_function.js";

// 1. 요구사항 분석
// - 글자를 박스에 넣고 단어 단위로 날아오면서 등장애니

// 2. 대상선정 - .stage-letters
const stage = myFn.qs(".stage-letters");

console.log("대상:", stage);

// 3. 글자 데이터 변수 할당
const myText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

// 4. 글자 데이터 변환하기
// - 기준: 띄어쓰기 공백
// - 잘라서 배열만드는 메서드는? split(자를문자기준)


// 5. 글자데이터 변환하기
// - span태그로 싸서 대상박스에 넣기
// 대상: stage



// 사용할 수 있는 방법은?
// 1) for of문
// 2) forEach메서드
// 3) map메서드
// -> map((val,idx,obj)=>코드리턴)
// -> 내부전달값이 forEach()와 똑같다!
// -> 배열값을 같은 주소에 새로운 배열로 매칭해줌
// -> 변경된 데이터를 새로운 배열로 만들 수 있음
// -> 원본배열은 보존된다!


// 등장액션 기준값설정(윈도우화면 절반크기)
const CRITERIA = window.innerHeight / 2;
console.log("기준값:", CRITERIA);

// 6. 스크롤 시 글자박스에 클래스 넣기

