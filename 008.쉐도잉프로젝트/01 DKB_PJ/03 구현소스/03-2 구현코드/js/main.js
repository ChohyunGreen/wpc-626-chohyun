// 도깨비 PJ 메인 페이지 JS - main.js /////////

// 도깨비 데이터 불러오기 ////
import { previewData, catData, liveData, posterData, clipData } from "../data/dkb_data.js";
console.log(clipData);

// 스크롤액션 불러오기 /////
import scrollAction from "./scroll_action.js";

// 스크롤액션 함수 호출하기
scrollAction();

/************************************************ 
    1. 미리보기 데이터 바인딩 하기
************************************************/
// 데이터를 요소에 넣어서 화면에 출력하는 것을
// 데이터 바인딩 이라고 한다!
// (1) 바인딩 대상 : .preview-box ul.cont-box
const previewArea = 
document.querySelector('.preview-area ul.cont-box');
console.log(previewArea);
// (2) 바인딩 데이터 : previewData
// -> 요구사항 : 기존 배열데이터를 내림차순 정리하여
// 8개의 데이터만 다시 변수에 할당한다!
// 순서 : 기존 배열 데이터의 객체 속성중 idx 순서로 정렬!
// sort() 메서드 사용!
// sort((a, b) => a.idx - b.idx);

// 원본데이터 내림차순 정렬
previewData.sort((a, b) => b.idx - a.idx);
// sort((앞,뒤)=>앞.idx-뒤.idx) -> 오름차순
// sort((앞,뒤)=>뒤.idx-앞.idx) -> 내림차순

// 새로운 배열에 앞쪽 8개의 데이터 수집하기
let newPreviewData = [];
for(let i=0; i<8; i++){
  newPreviewData.push(previewData[i]);
  // push(값) -> 배열에 값추가
}
console.log('새로운 미리보기 배열',newPreviewData);

/* (3) 반복 구조
<li>
    <h3>제목</h3>
    <p>내용</p>
  </li>
*/
// (4) 데이터 바인딩하기 : map().join('')사용!
// 배열.map((배열값,순번)=>리턴값) -> 새로운배열 생성!
// -> 새로운 배열값 만들기는 맵조잉~!!!(map().join(''))
// -> 여기서는 내림차순 상위 8개 데이터만 돌아준다!
// -> newPreviewData 사용!
previewArea.innerHTML = 
newPreviewData.map(v=>`
  <li>
    <h3>${v.title}</h3>
    <p>${v.story}</p>
  </li>
  `).join('');

/************************************************ 
    2. 캐릭터 소개 영역 데이터 바인딩하기
************************************************/
// 바인딩 대상 : .cat-box
const catBox = 
document.querySelector('.cat-box');
console.log(catBox);

// 데이터 바인딩 태그구조
/* 
<!-- 공유박스 -->
<div>
  <!-- 이미지박스 -->
  <figure>
    <img src="./images/dc1.png" alt="공유" />
    <figcaption>
      <img src="./images/d01.png" alt="도깨비진한글자" />
      <img src="./images/d011.png" alt="도깨비흐린글자" />
    </figcaption>
  </figure>
  <!-- 글박스 -->
  <aside class="scbar">
    <!-- 타이틀 -->
    <h3>도깨비(김신), 939세</h3>
    <!-- 내용 -->
    <p></p>
  </aside>
</div>  
*/

// 데이터 바인딩하기 -> 맵죠잉~~!
catBox.innerHTML = 
catData.map(v=>`
  <!-- ${v.actorName}박스 -->
<div>
  <!-- 이미지박스 -->
  <figure>
    <img src="./images/dc${v.idx}.png" alt="${v.actorName}" />
    <figcaption>
      <img src="./images/d0${v.idx}.png" alt="${v.actorName}진한글자" />
      <img src="./images/d0${v.idx+v.idx}.png" alt="도깨비흐린글자" />
    </figcaption>
  </figure>
  <!-- 글박스 -->
  <aside class="scbar">
    <!-- 타이틀 -->
    <h3>${v.catTitle}</h3>
    <!-- 내용 -->
    <p>${v.catContent.replace(/\n/g,'<br />')}</p>
  </aside>
</div>  
  `).join('');

  // [ 기존 캐릭터 소개글에서 엔터부분에 br태그 넣기 ]
  // 문자열중 특정문자를 변경해주는 메서드는? replace()
  // 문자열.replace(바꿀문자열,바뀔문자열)
  // -> 이렇게 하면 문자 하나만 변경되므로
  // 정규식을 사용해서 선택해야 모두 변경된다!
  // 정규식은 문자열의 패턴을 찾아주는 문법!
  // -> .replace(/선택문자열/g,'바뀔문자열')
  // -> 정규식은 슬래쉬 사이에 씀
  // -> 정규식 슬래쉬 뒤에 g문자는 global(전체)라는 의미
  // -> 그러면 모두 찾아서 변경함
  // -> \n은 엔터기호를 찾아냄
  // .replace(/\n/g,'<br/>')

/************************************************ 
    3. 현장포토 영역 데이터 바인딩하기
************************************************/
// (1) 바인딩 대상 : .live-box
const liveBox = 
document.querySelector('.live-box');
console.log(liveBox);

// (2) 바인딩 데이터 : liveData
// (3) 바인딩 태그구조
/* 
<ul>
  <li data-idx="1">
    <figure>
      <img
        src="./images/live_photo/live_photo7.jpg"
        alt="다 드립니다 ♡"
      />
      <figcaption>다 드립니다 ♡</figcaption>
    </figure>
  </li>
</ul>
*/

// (4) 바인딩하기 -> 맵죠잉~~!
liveBox.innerHTML = 
'<ul>'+
liveData.map(v=>`
  <li data-idx="${v.idx}">
    <figure>
      <img
        src="./images/live_photo/${v.imgName[0]}.jpg"
        alt="${v.title}"
      />
      <figcaption>${v.title}</figcaption>
    </figure>
  </li>
  `).join('')
+'</ul>';

/************************************************ 
    4. 대표포스터 영역 데이터 바인딩하기
************************************************/
// (1) 바인딩 대상 : .poster-box
const posterBox = 
document.querySelector('.poster-box');
console.log(posterBox);

// (2) 바인딩 데이터 : posterData
// (3) 바인딩 태그구조
/* 
<ul>
  <li data-idx="1">
    <figure>
      <img
        src="./images/poster_img/poster5.jpg"
        alt="도깨비 5인 단체 포스터"
      />
      <figcaption>도깨비 5인 단체 포스터</figcaption>
    </figure>
  </li>
</ul>
*/

// (4) 바인딩하기 -> 맵죠잉~~!
posterBox.innerHTML = 
'<ul>'+
posterData.map(v=>`
  <li data-idx="${v.idx}">
    <figure>
      <img
        src="./images/poster_img/${v.imgName}.jpg"
        alt="${v.title}"
      />
      <figcaption>${v.title}</figcaption>
    </figure>
  </li>
  `).join('')
+'</ul>';

/************************************************ 
    5. 대표포스터 영역 데이터 바인딩하기
************************************************/
// (1) 바인딩 대상 : .clip-box
const clipBox = 
document.querySelector('.clip-box');
console.log(clipBox);

// (2) 바인딩 데이터 : clipData
// (3) 바인딩 태그구조
/* 
<!-- 스와이퍼 랩퍼박스 : .swiper-wrapper -->
<ul class="slide swiper-wrapper" data-db="clipData">
    <!-- 스와이퍼 리스트 : .swiper-slide -->
    <li class="swiper-slide" data-idx="1" data-seq="0">
      <div class="clip-mv-box">
        <img
          src="./images/clip_img/1.jpg"
          alt="김고은. 능력있으神 공유에게 뜬금포 사랑고백 ′사랑해요′"
        />
      </div>
      <h4>
        김고은. 능력있으神 공유에게 뜬금포 사랑고백 ′사랑해요′
      </h4>
      <h3>도깨비1화</h3>
    </li>
</ul>
*/

// (4) 바인딩하기 -> 맵죠잉~~!
clipBox.innerHTML = 
'<ul class="slide swiper-wrapper">'+
clipData.map(v=>`
  <li class="swiper-slide" data-idx="${v.idx}">
    <div class="clip-mv-box">
      <img
        src="./images/clip_img/${v.idx}.jpg"
        alt="${v.subtit}"
      />
    </div>
    <h4>${v.subtit}</h4>
    <h3>${v.title}</h3>
  </li>
  `).join('')
+'</ul>';

/************************************************ 
    6. 최신 동영상 파트에 스와이퍼 적용하기
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
