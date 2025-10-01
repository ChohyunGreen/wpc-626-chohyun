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
    최신 동영상 파트에 스와이퍼 적용하기
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
