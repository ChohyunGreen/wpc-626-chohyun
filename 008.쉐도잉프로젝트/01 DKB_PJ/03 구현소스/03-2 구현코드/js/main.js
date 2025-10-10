// 도깨비 PJ 메인 페이지 JS - main.js /////////

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
    2. 최신 동영상 파트에 스와이퍼 적용하기
************************************************/
const videoSwiper = new Swiper(".clip-box", {
  // 자동플레이설정
  autoplay: {
    delay: 3000, // 지연시간
    disableOnInteraction: false,
    // 건드리면 멈췄다가 다시 재개함!(false)
  },

  // 화면크기별 스와이퍼 슬라이드 개수
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: "5vw",
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: "10vw",
    },
    // when window width is >= 1000px
    1000: {
      slidesPerView: 4,
      spaceBetween: "20vw",
    },
  }, ///// breakpoints //////
});

// 버튼 요소 선택 ///
// -> 선택시 주의: .ab1,.ab2는 배너에도 있음!
const btnPrev = document.querySelector("#video-part .ab1");
const btnNext = document.querySelector("#video-part .ab2");
// console.log(btnPrev, btnNext);

// 이전버튼은 처음 로딩시 숨기기
btnPrev.style.display = "none";

// 다음버튼 클릭시 Swiper API를 이용한 코딩하기!!!
btnNext.addEventListener("click", () => {
  // console.log("다음버튼 클릭");
  videoSwiper.slideNext();
});

// 이전버튼 클릭시 Swiper API를 이용한 코딩하기!!!
btnPrev.addEventListener("click", () => {
  videoSwiper.slidePrev();
});

// 스와이퍼 슬라이드가 변경될때 발생 이벤트는? slideChange
videoSwiper.on("slideChange", () => {
  //   console.log("맨처음인가?", videoSwiper.isBeginning);
  //   console.log("맨끝인가?", videoSwiper.isEnd);

  // 맨처음인가? 맨끝인가?에 따른 분기 //////
  // 1. 맨처음엔 => 이전버튼 비활성화
  if (videoSwiper.isBeginning) {
    btnPrev.style.display = "none";
  } /// if ////

  // 2. 맨끝인가? => 다음버튼 비활성화
  else if (videoSwiper.isEnd) {
    btnNext.style.display = "none";
  } /// else if ////

  // 3. 그밖의 경우는 => 이전버튼, 다음버튼 활성화
  else {
    btnNext.style.display = "block";
    btnPrev.style.display = "block";
  } /// else ////
}); ///// slideChange //////



/************************************************ 
    3. 햄버거 버튼 클릭시 상단영역에 클래스넣기
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
    4. 상위메뉴 li 클릭시 서브메뉴에 클래스 넣기
    ->  클래스 on 을 넣어서 서브메뉴가 등장함!
************************************************/
// (1) 이벤트 대상 : .gnb-menu > ul > li
const $gnbList = $(".gnb-menu > ul > li").has('.sub-menu');
// has(선택요소) 메서드 -> 자식으로 선택요소가 있는 요소를 선택
// -> .sub-menu가 있는 li를 선택
// console.log($gnbList);

// 하위 메뉴 보이기 숨기기 할때 메뉴박스의 z-index:1 처리위해 대상선정
const $menuBox = $(".menu-box");

// (2) 이벤트 함수 구현하기 ////
$gnbList.click(function(){
  // this 키워드로 클릭된 li 자신을 선택하여
  // 하위의 .sub-menu에 클래스 on을 넣기
  $(this).find(".sub-menu").addClass("on");
  // addClass() 메서드 -> 선택된 요소에 클래스를 넣기

  // 메뉴박스 z-index:1처리
  $menuBox.css("z-index", "1");

}); /// click ///

// (3) 리스트 하위의 a요소 클릭시 페이지이동 특성막기!
$gnbList.find('a').click(e=>e.preventDefault());

// (4) 이전 이동버튼 클릭시 부모 .sub-menu의 클래스 on 제거하기
$('.btn-up-menu').click(function(e){ // e - 이벤트 전달변수
  // console.log('이전 이동버튼 클릭');
  // 클릭된 버튼의 부모들중 .sub-menu에 클래스 on 제거
  $(this).parents('.sub-menu').removeClass('on');
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


