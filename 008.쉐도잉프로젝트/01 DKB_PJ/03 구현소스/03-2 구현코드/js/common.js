// 도깨비 PJ 공통 JS - common.js /////////

// 배너 슬라이드 함수 불러오기
import bannerFn from "./main1_jquery.js";
// default로 내보냈으므로 아무이름으로 받아도됨!

// 같은 이름의 변수의 충돌을 막기위해 지역변수화를 해준다!
// 방법은 (()=>{나의코드})() 익명함수를 바로 실행하는 지역코드로 감싸준다!
// 나의코드는 지역화가 되고 익명함수는 바로 실행된다!
// -> (익명함수)() 이렇게 쓰면 익명함수가 바로 실행됨!

/// 지역화 코드 시작 //////////////
(() => {
  // 1. 상단, 하단 공통 모듈 html넣기
  // (1) 대상 : 상단영역 #top-area
  const $topArea = $("#top-area");
  // 하단영역 #bottom-area
  const $bottomArea = $("#bottom-area");
  // 배너영역 .banner-part
  const $bannerPart = $(".banner-part");
  // 드라마 파트메뉴 #spart-menu
  const $spartMenu = $("#spart-menu");

  // (2) 대상에 load() 메서드로 html넣기
  // load(파일경로, 로딩후실행함수)
  // (2-1) 상단부 html넣기
  $topArea.load("./inc/header.html", headerFn);
  // -> 상단부 html파일이 모두 로딩된후 headerFn함수가 실행됨!

  // (2-2) 하단부 html넣기
  $bottomArea.load("./inc/footer.html");

  // (2-3) 배너부 html넣기 : 로딩후 배너함수호출!
  $bannerPart.load("./inc/banner.html", bannerFn);

  // (2-4) 드라마 파트메뉴 html넣기
  $spartMenu.load("./inc/part_menu.html");
})();
/// 지역화 코드 종료 //////////////

/// 2. 상단파트에서 실행할 함수 /////////////
function headerFn() {
  /***************************** 
    JS 로 링크 시스템 만들기
 *****************************/
  // 대상 : 상단영역 a요소
  const $topLink = $("#top-area a");
  $topLink.click(function (e) {
    // e - 이벤트 객체
    // 기본이동 막기
    e.preventDefault();
    // 클릭된 a요소의 글자 읽기
    let aTxt = $(this).text();
    console.log(aTxt);
    // 분기하여 이동
    // 이동은 location.href = '링크주소';
    switch (aTxt) {
      case "로그인":
        location.href = "login.html";
        break;
      case "회원가입":
        location.href = "member.html";
        break;
    } //// switch문 //////////
  }); /////// click 이벤트 //////////////

  ///////////////////////////////////////////////////
  // 1. 큐브로고박스 일정간격으로 클래스 넣었다 빼기 ///
  //////////////////////////////////////////////////

  // -> 로고가 일정 간격으로 회전함!
  // 지금은 1.5초씩 alternate하였으므로 총 3초걸림

  // 1-1. 대상선정 : .cube-logo
  const cubeLogo = document.querySelector(".cube-logo");

  // 1-2. 클래스 셋팅함수 ////////////////
  const setClass = () => {
    // 클래스넣기
    cubeLogo.classList.add("rotate-cube");

    // 3초후 클래스 제거하기
    // setTimeout(함수, 시간);
    setTimeout(() => {
      cubeLogo.classList.remove("rotate-cube");
    }, 3000);
  }; /////////// setClass 함수 //////////

  // 1-3. 일정간격으로 클래스 셋팅함수 호출하기 ///////
  // setInterval(함수, 시간);
  // 일정시간 간격으로 함수가 실행됨!
  setInterval(setClass, 10000);
  /// 10초간격으로 실행됨! //////

  // 1-4. 처음에 회전하도록 클래스 셋팅함수 호출하기
  setClass();

  /************************************************ 
    2. 햄버거 버튼 클릭시 상단영역에 클래스넣기
************************************************/
  // (1) 이벤트 대상 : .btn-ham
  const $btnHam = $(".btn-ham");
  // (2) 변경 대상 : #top-area
  const $topArea = $("#top-area");

  // (3) 이벤트 대상 클릭시
  // 변경대상에 클래스 토글로 on넣기
  $btnHam.on("click", () => {
    $topArea.toggleClass("on");
  }); /// click ///

  /************************************************ 
    3. 상위메뉴 li 클릭시 서브메뉴에 클래스 넣기
    ->  클래스 on 을 넣어서 서브메뉴가 등장함!
************************************************/
  // (1) 이벤트 대상 : .gnb-menu > ul > li
  const $gnbList = $(".gnb-menu > ul > li").has(".sub-menu");
  // has(선택요소) 메서드 -> 자식으로 선택요소가 있는 요소를 선택
  // -> .sub-menu가 있는 li를 선택
  // console.log($gnbList);

  // 하위 메뉴 보이기 숨기기 할때 메뉴박스의 z-index:1 처리위해 대상선정
  const $menuBox = $(".menu-box");

  // (2) 이벤트 함수 구현하기 ////
  $gnbList.click(function () {
    // this 키워드로 클릭된 li 자신을 선택하여
    // 하위의 .sub-menu에 클래스 on을 넣기
    $(this).find(".sub-menu").addClass("on");
    // addClass() 메서드 -> 선택된 요소에 클래스를 넣기

    // 메뉴박스 z-index:1처리
    $menuBox.css("z-index", "1");
  }); /// click ///

  // (3) 리스트 하위의 a요소 클릭시 페이지이동 특성막기!
  $gnbList.find("a").click((e) => e.preventDefault());

  // (4) 이전 이동버튼 클릭시 부모 .sub-menu의 클래스 on 제거하기
  $(".btn-up-menu").click(function (e) {
    // e - 이벤트 전달변수
    // console.log('이전 이동버튼 클릭');
    // 클릭된 버튼의 부모들중 .sub-menu에 클래스 on 제거
    $(this).parents(".sub-menu").removeClass("on");
    // parents(특정부모요소) 메서드 -> 부모요소들 중 특정부모요소를 선택
    // 비교) parent() 메서드 -> 바로 상위 직계부모요소 선택
    // removeClass() 메서드 -> 선택된 요소에 클래스를 제거

    // 주의! 이전 이동버튼은 부모 li의 자식이므로 클릭시
    // 이벤트 버블링이 일어나서 부모 li가 다시 클릭된다!
    // 따라서 on을 제거후 다시 on이 추가되어 아무일도 없는 것처럼 보인다!
    // 여기서 이벤트 버블링 막기가 필요하다!
    e.stopPropagation();

    // 메뉴박스 z-index:0처리
    $menuBox.css("z-index", "0");
  }); /// click ///

  // 코드의 지역화 //////
  // (()=>{})()

  ////////// 스크롤시 상단영역 방향별 보이기/숨기기 //////
  (() => {
    // 변경대상 : 상단영역 .header
    const header = document.querySelector("#top-area");
    const stkMenu = document.querySelector("#spart-menu");
    // 스티키 셋팅값
    let sktValue = 122;

    // 스크롤 방향 알아내는 원리:
    // (1) 아랫방향
    // 이전 스크롤위치값 < 현재 스크롤위치값
    // (2) 윗방향
    // 이전 스크롤위치값 > 현재 스크롤위치값

    // 이전 스크롤 위치값 저장변수
    let prevScroll = 0;

    // 스크롤 이벤트 설정하기
    window.addEventListener("scroll", () => {
      // 스크롤 위치값 구하기
      let curScroll = window.scrollY;
      // console.log('스크롤~~~~!', curScroll);

      // (1) 아랫방향
      // 이전 스크롤위치값 < 현재 스크롤위치값
      if (prevScroll < curScroll) {
        console.log("스크롤 내려간다~~!");
        // 스크롤 내려가면 메뉴 숨기기
        header.classList.add("hide");
        stkMenu.style.top = "0px";
      } /// if ////
      // (2) 윗방향 : 아랫방향이 아니면 윗방향
      // 이전 스크롤위치값 > 현재 스크롤위치값
      else {
        console.log("스크롤 올라간다~~!");
        // 스크롤 올라가면 메뉴 보이기
        header.classList.remove("hide");
        stkMenu.style.top = sktValue + "px";
      } /// else ////

      // 중요!!! 마지막에 이전스크롤위치를 저장!
      prevScroll = curScroll;
    }); /////////// scroll ///////////////
  })(); /// 스크롤시 상단영역 방향별 보이기/숨기기 //////
} ////////////// headerFn ///////////////
