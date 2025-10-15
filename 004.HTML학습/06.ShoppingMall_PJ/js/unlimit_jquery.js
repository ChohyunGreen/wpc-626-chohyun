// 쇼핑몰 배너 JS -> 제이쿼리버전!
// 01.가로방향 배너 슬라이드 - 무한이동 //

/***************************************************** 
    [ 슬라이드 무한이동 기능정의 ]
    1. 이벤트 종류: click
    2. 이벤트 대상: 이동버튼(.abtn)
    3. 변경 대상: 슬라이드 박스(.slide)
    4. 기능 설계:

        (1) 오른쪽 버튼 클릭시 다음 슬라이드가
            나타나도록 슬라이드 박스의 
            translate X축 이동값을
            -100%로 변경시킨다.
            -> 슬라이드 이동후!!! 
            바깥에 나가있는 첫번째 슬라이드
            li를 잘라서 맨뒤로 보낸다!
            동시에 translate X축 이동값을 0으로 변경한다!

        (2) 왼쪽버튼 클릭시 이전 슬라이드가
            나타나도록 하기위해 우선 맨뒤 li를
            맨앞으로 이동하고 동시에 
            translate X축 이동값을
            -100%로 변경한다.
            그 후 translate X축 이동값을 0으로 애니메이션하여
            슬라이드가 왼쪽에서 들어온다.

        (3) 공통기능: 슬라이드 위치표시 블릿
          - 블릿 대상: .indic li
          - 변경 내용: 슬라이드 순번과 같은 순번의
          li에 클래스 "on"주기(나머진 빼기->초기화!)

*****************************************************/

// 1. 대상선정 //////////////////
// (1) 전체 슬라이드 박스 : .slide-box
const $slideBox = $(".slide-box");
// 전체 박스 하위의 요소로 상대적으로 잡아준다!
// 이유는 다른 슬라이드 박스를 카피하여 만든경우
// 동일한 기능이 될 수 있게 해준다!

// (2) 이벤트대상: .abtn
const $abtn = $slideBox.find(".abtn");

// (3) 변경대상: .slide
const $slide = $slideBox.find(".slide");

// (4) 최초 슬라이드 li 수집하기
const $firstSlide = $slide.find("li");

// 최초슬라이드 li에 data-seq 속성 만들고 순번넣기
// 왜 넣는가? 슬라이드 li순서가 계속 변경되므로
// 블릿 인디케이터의 표시 순서를 잡기 위해 넣어준다!

// [ 제이쿼리 each() 메서드 ]
// 선택요소 개수 만큼 자동으로 반복해준다!
// -> each((순번,요소)=>{})
$firstSlide.each((idx, el) => {
  // 속성셋팅은 attr(속성명,값)
  $(el).attr("data-seq", idx);
}); ////// each 메서드 /////////////

// 슬라이드 개수 변수할당!
// 보통 변경없이 사용하는 변수는 상수라고 하고
// 상수는 보통 대문자로 쓰고 스네이크 케이스 사용함!
const SLIDE_CNT = $firstSlide.length;
console.log("슬라이드개수:", SLIDE_CNT);

// (4) 인디케이터 블릿대상
const $indic = $slideBox.find(".indic li");

// console.log("대상:",$slideBox,$abtn,$slide,$indic);

// 2. 이벤트 설정하기 ////////////////////
// 버튼 클릭시 슬라이드 이동하기

// 오른쪽 버튼 클릭시
// 원리: translate X축 이동값을 -100%로 변경
$abtn.click(function () {
  // 광클금지함수 호출 셋팅하기
  if (blockClick()) return;

  // 버튼구분하기 : 오른쪽버튼(.ab2)이면 true
  let isR = $(this).is(".ab2");
  console.log("오른쪽?", isR);

  // animate({CSS변경},시간,이징,함수)

  // 1. 오른쪽 버튼일때
  if (isR) {
    $slide.animate(
      { translate: "-100%" }, // CSS변경
      TIME_GAP, // 시간
      () => {
        // 애니후 실행함수 시작
        $slide // 주인공은? 슬라이드!
          // (1) 맨앞요소 맨뒤로 이동
          .append($slide.find("li").first())
          // (2) 이때 translate값 초기화
          .css({ translate: "0%" });
      } /// 애니후 실행함수 끝 ///
    ); /// animate //////
  } //// if //////

  // 2. 왼쪽 버튼일때 //////
  else {
    $slide // 주인공은? 슬라이드!
      // (1) 슬라이드가 먼저 맨뒤li를 맨앞으로 이동
      .prepend($slide.find("li").last())
      // (2) 이때 translate값 초기화
      .css({ translate: "-100%" })
      // (3) 오른쪽 방향으로 슬라이드 이동애니
      .animate({ translate: "0%" }, TIME_GAP);
    // -> 주의! 0일 경우에도 단위를 반드시 써야
    // 애니메이션이 잘 적용된다!
  } //// else //////

  // 3. 슬라이드 위치표시 블릿
  // (1) 블릿 대상: .indic li
  // 해당 블릿은 오른쪽 버튼일때 순번 1, 왼쪽버튼일때 순번 0 슬라이드의 data-seq값을 읽어오면 된다!
  let currIdx = $slide
    .find("li")
    .eq(isR ? 1 : 0)
    .attr("data-seq");
  console.log("읽은순번:", currIdx);

  // (2) 블릿 li클래스 on넣기(나머지는 빼기)
  $indic.eq(currIdx).addClass("on").siblings().removeClass("on");
}); ////// click 메서드 //////////

/******************************** 
////////// 광클금지함수 //////////
********************************/
// [1] 광클금지상태변수 ///////////
let stopClick = false;
// 값이 true일때 클릭허용/ false면 불허용

// [2] 광클금지해제시간 상수셋팅 //////
const TIME_GAP = 400;

// [3] 광클금지함수 //////////////////
function blockClick() {
  // 1. 광클이면 true 를 리턴함!
  if (stopClick) return true;

  // 2. 클릭가능상태이면 전역변수 셋팅
  stopClick = true;
  setTimeout(() => {
    stopClick = false;
  }, TIME_GAP);

  // 3. 상태값 리턴 (클릭가능상태 false)
  return false;
} ////// blockClick 함수 ///////

/*************************************** 
/////////// 자동넘김 셋팅하기 ///////////
***************************************/
// [1] 인터발, 타임아웃 저장용 변수
let autoI, autoT;
// -> 이변수는 clear시 사용함!

// [2] 인터발, 타임아웃 시간 상수셋팅
const IV_TIME = 2000;
const TO_TIME = 5000;

// 자동호출함수 최초호출 ////
slideAuto();

// [3] 자동호출함수 ////////////////
function slideAuto() {
  // 지우기위해 전역변수 autoI에 할당함
  autoI = setInterval(() => {
    // 1. 오른쪽버튼 클릭시 작동과 동일!
    $slide.animate(
      { translate: "-100%" }, // CSS변경
      TIME_GAP, // 시간
      () => {
        // 애니후 실행함수 시작
        $slide // 주인공은? 슬라이드!
          // (1) 맨앞요소 맨뒤로 이동
          .append($slide.find("li").first())
          // (2) 이때 translate값 초기화
          .css({ translate: "0%" });
      } /// 애니후 실행함수 끝 ///
    ); /// animate //////

    // 2. 슬라이드 위치표시 블릿
    // (1) 블릿 대상: .indic li
    // 해당 블릿은 오른쪽 버튼일때 순번 1 슬라이드의 data-seq값을 읽어오면 된다!
    let currIdx = $slide.find("li").eq(1).attr("data-seq");
    // console.log("읽은순번:", currIdx);

    // (2) 블릿 li클래스 on넣기(나머지는 빼기)
    $indic.eq(currIdx).addClass("on").siblings().removeClass("on");
  }, IV_TIME);
} ////// slideAuto 함수 //////

// 이동버튼 클릭시 지우기함수 호출하기 ////
$(".abtn").click(clearAuto);

// [4] 지우기 함수 /////////////////
function clearAuto() {
  // 1. 인터발 지우기
  clearInterval(autoI);

  // 2. 타임아웃 지우기 : 실행쓰나미 방지!!!
  clearTimeout(autoT);

  // 3. 타임아웃 셋팅하기(일정시간후 다시 자동호출)
  autoT = setTimeout(slideAuto, TO_TIME);
} ////// clearAuto 함수 //////
