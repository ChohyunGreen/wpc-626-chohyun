// 자동차 360도 회전뷰 JS - car.js //////
/**************************************** 
    [ 박스에 드래그하여 이미지 변경하기 ]
    ___________________________________

    원리 : 마우스 포인터 위치 중 x축값만
    이용하여 처음찍은 위치와 드래그하여
    마지막에 찍은 위치를 비교하여 방향을
    결정한 후 이전/다음 이미지로 순서대로
    넘겨서 자동차를 보여준다!
****************************************/
// 0. 이미지 셋팅하기
// 0-1.이미지박스 대상:  .cbx
const $cbx = $(".cbx");
console.log("대상:", $cbx);

// 0-2. 이미지 셋업 : ./360view/country1.jpg 형식
// 이미지개수 : 총 50개
const IMG_CNT = 50; // 한계수를 상수로 관리!

// 제이쿼리 append()함수로 셋팅
for (let i = 1; i <= IMG_CNT; i++) {
  $cbx.append(`<img src="./360view/country${i}.jpg" alt="이미지${i}" />`);
} /////// for //////////

// 0-3. 모든 이미지 숨기고 첫번째 이미지만 보이기
// 자동차박스.찾아('img').숨겨().첫번째().보여()
$cbx.find("img").hide().first().show();

// 0-4. 선택의 효율적인 메모리 관리를 위해
// 이미지를 미리 선택하여 변수에 담는다!
const $imgs = $cbx.find("img");

/// 1. 변수 셋팅하기 ///////////////
// (1) 드래그 상태변수 :
// false - 드래그아님, true - 드래그중
let isDrag = false;

// (2) 클릭시 위치값 변수 : 드래그 시작점
let startX = 0;

// (3) 마우스무드 이벤트 발생금지 상태변수
// true - 금지상태, false - 허용상태
let stopDrag = true;

// 2. 드래그 이벤트 함수 설정하기 /////////////////

// (1) 드래그중 (마우스무브) 이벤트함수 /////
// - 이벤트 종류 : mousemove + touchmove
$cbx.on("mousemove touchmove", (e) => {
  // 드래그 중 일때만 작동 ////
  if (isDrag) {
    // [1] x축 위치값
    let posX = e.pageX || e.changedTouches[0].pageX;

    // [2] 방향 알아내기
    // 왼쪽방향 : 처음클릭위치 > 현재위치
    // 오른쪽방향 : 현재위치 > 처음클릭위치

    let dir = startX > posX ? "left" : "right";
    // console.log("방향:", dir);

    // [3] 이미지 변경 함수 호출
    changeImg(dir);
  } /// if ///
}); ///////// mousemove touchmove //////////

// (2) 드래그 상태 시작 이벤트함수 //////
// - 이벤트 종류 : mousedown + touchstart
$cbx.on("mousedown touchstart", (e) => {
  // [1] 드래그 상태변수를 true로 변경
  isDrag = true;

  // [2] 클릭시 위치값 셋팅
  startX = e.pageX || e.changedTouches[0].pageX;
}); ///////// mousedown touchstart //////////

// (3) 드래그 상태 종료 이벤트함수 //////
// - 이벤트 종류 : mouseup + touchend
$cbx.on("mouseup touchend", (e) => {
  // [1] 드래그 상태변수를 false로 변경
  isDrag = false;
}); ///////// mouseup touchend //////////

// (4) 이미지변경 함수 ////////////////////
// 이미지 순번 전역변수
let seqNum = 0;
function changeImg(dir) {
  // dir - 방향
  // left - 왼쪽방향, right - 오른쪽방향
  console.log("함수에서 방향:", dir);

  // [1] 현재 이미지숨기기
  $cbx.find("img").eq(seqNum).hide();

  // [2] 이미지 순번 증감
  if (dir == "left") seqNum++;
  else if (dir == "right") seqNum--;

  // [3] 한계수 체크 : 배열끝번호는 개수-1
  if (seqNum > IMG_CNT-1) seqNum = 0;
  if (seqNum < 0) seqNum = IMG_CNT-1;

  // [4] 다음 이미지 보이기
  $cbx.find("img").eq(seqNum).show();



} //////// changeImg //////////
