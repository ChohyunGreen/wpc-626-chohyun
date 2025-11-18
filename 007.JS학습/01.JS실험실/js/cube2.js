// 회전제어 JS - cube2.js //////////////

/************************************* 
    [구현내용]
    - 마우스휠 이벤트에 따라 기본기능은
    막고 큐브를 회전하는 속성인 transform의
    rotateY(각도)의 값변경을 이용한
    큐브 회전을 적용함!
    - 대상: window
    - 사용이벤트 : wheel
    - 단위각도 : 360도 / 9개 = 40도
    - CSS 이징적용 : ease-out

*************************************/

// DOM 함수 객체 //////////////
import domFn from "./my_function.js";

// 데이터 제이슨 /////
import mvData from './data_moving.json' with {type:"json"};

console.log(mvData);

// 0. 변수셋팅
// 단위각도
const DEG = 40;
// 광휠상태변수(0-허용,1-금지)
let stsWheel = 0;
// 휠제어시간
const TIME_WHEEL = 120;
// 휠단위수(휠할때 증감하는수)
let numWheel = 0;
// 캐릭터 고유번호수
let catNum = 0;
// 캐릭터 한계수(9개니까 8)
const LIMIT_CNT = 8;
let autoT;
const infoBox = domFn.qs(".cat-info");

// 1. 대상선정 : .cube
const cube = domFn.qs(".cube");

/// 2. 이벤트 설정하기 : passive 옵션 끄기 ///
window.addEventListener("wheel", rotateMem, { passive: false });
// -> window, document, body는 passive기본값이 true임!

// 3. 함수만들기 ///////
function rotateMem(e) {
  // e - 이벤트전달변수

  // 광휠막기 //////////////////
  if (stsWheel) return; // 0이아니면 돌아가!
  stsWheel = 1; // 막기상태로 변경
  setTimeout(() => {
    stsWheel = 0; // 다시 허용상태로 변경
  }, TIME_WHEEL);

  // 0. 기본기능막기
  e.preventDefault();

  // 1. 휠 방향 알아내기
  let delta = e.wheelDelta;
  console.log("휠델타:", delta);

  // 2. 방향에 따른 분기 : 휠단위수 //////
  if (delta < 0) {
    // 휠단위수 감소
    numWheel--;
    // 캐릭터고유번호 증가
    catNum++;
    if (catNum > LIMIT_CNT) catNum = 0;
  } /// if /////
  else {
    // 휠단위수 증가
    numWheel++;
    // 캐릭터고유번호 감소
    catNum--;
    if (catNum < 0) catNum = LIMIT_CNT;
  } /// else /////

  console.log("휠단위수:", numWheel);
  console.log("캐릭터고유번호:", catNum);

  // 3. 큐브 회전하기 ///
  cube.style.transform = `rotateY(${numWheel * DEG}deg)`;

  // 4. 캐릭터 정보보이기 박스 초기화 ///
  infoBox.innerHTML = "";
  infoBox.classList.remove("on");
  clearTimeout(autoT);

  // 5. 캐릭터 정보 보이기 함수 호출 ///
  setTimeout(showInfo, 1000);
} //////////// rotateMem 함수 ///////////

// 캐릭터 정보 보이기 함수 /////
function showInfo() {
  infoBox.innerHTML = `
        <h2>${mvData[catNum].name}</h2>
        <p>${mvData[catNum].desc}</p>
    `;
  infoBox.classList.add("on");
} //////// showInfo 함수 ///////
