@charset "utf-8";
/* 도깨비 PJ 메인 페이지 CSS - main.css */

/* 외부 CSS 불러오기 */
@import url(./common.css);
@import url(./reset.css);
@import url(./core.css);
/* 12그리드 CSS */
@import url(./grid_12_flex.css);

/* 공사중 표시 */
/* body * {
    outline: 2px dashed #ccc;
} */

/***************** 메인 CSS *****************/


/***************** 2-2. 캐릭터영역 *****************/
.cat-part {
  position: relative;
  /* 형제 배너박스보다 밑에 깔리므로
  포지션을 줘서 나중에 오는 박스가 위로 오게함! */

  /* 비율적용을 위해 높이값을 없앤다! */
  height: auto;
  aspect-ratio: 1320/190;
  /* 상단마진 */
  margin-top: 10px;
}
/* 캐릭터박스 */
.cat-box {
  /* 플렉스박스 */
  display: flex;
  /* 사이간격 */
  gap: 1%;
}
/* 직계자식요소 div 4개 */
.cat-box > div {
  /* 플렉스자식 등분할설정 */
  flex: 1;
}
/* 캐릭터 이미지박스 */
.cat-box figure {
  /* 트랜지션 */
  transition: 0.4s ease-out;
}
/* 캐릭터 각 박스 오버시 캐릭터박스
마진탑 올리기 */
.cat-box > div:hover figure {
  /* 브라우저 화면크기를 중앙속박스 크기로 맞추고
  최대크기 px,vw를 조정한다! 이때 마이너스니까
  min이 아니고 max로 조정함! */
  margin-top: max(-200px, -15vw);
}
/* 캐릭터 이미지만 선택 */
.cat-box figure > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* 캐릭터 이름 이미지박스 */
.cat-box figcaption {
  text-align: center;
  margin-top: -17%;
}
/* 이름이미지 공통 */
.cat-box figcaption img {
  width: 35%;
}
/* 첫번째 이름이미지 처음에 안보임 */
.cat-box figcaption img:first-child {
  display: none;
}
/* 캐릭터 개별박스에 오버시 이름변경
-> 첫번째 보이고 두번째 숨기기 */
.cat-box > div:hover figcaption img:first-child {
  display: inline;
}
.cat-box > div:hover figcaption img:last-child {
  display: none;
}

/* 캐릭터 설명박스 */
.cat-box aside {
  height: 0;
  overflow: auto;
  /* 배경 */
  background: url(../images/eachBG.jpg) no-repeat bottom/cover;
  /* 트랜지션 */
  transition: 0.4s ease-out;
  /* 둥근모서리 설정 */
  border-radius: 10px 5px 5px 10px;
  margin-top: 10px;
}
/* 각 캐릭터박스에 오버시 설명박스 보이기 */
.cat-box > div:hover aside {
  /* 중앙박스 최대크기에서 px과 vw크기를 맞추고
  최소크기 출력을 테스트하면 잘된다! */
  height: min(200px, 15vw);
}
/* 캐릭터 타이틀 */
.cat-box aside h3 {
  font-family: "Gugi";
  /* 글자 최대크기를 min으로 설정 */
  font-size: min(2.4rem, 1.8vw);
  font-weight: normal;
  padding: 1.5rem 1rem 0.5rem;
  /* 자간 letter-spacing */
  letter-spacing: -1px;
}
/* 캐릭터 설명 */
.cat-box aside p {
  font-family: "Single Day";
  /* 글자 최대크기를 min으로 설정 */
  font-size: min(1.8rem, 1.3vw);
  padding: 1.5rem;
  line-height: 1.6;
  /* 양쪽정렬 justify */
  text-align: justify;
}

/***************** 2-3. 드라마소개영역 *****************/
.main .intro-part .partbox {
  height: 455px;
  padding: 10px;
}
/* 서브타이틀 */
.intro-part .stit {
  padding-bottom: 0;
}

/* 영역 서브제목 아이콘 가상요소 지우기 */
.intro-part .stit::before {
  display: none;
}

/* 하위제목+아이콘 박스 */
.intro-desc {
  display: flex;
  flex-wrap: wrap;
  font-size: 2.5rem;
}
.intro-desc h3 {
  margin-right: 10px;
}
.intro-desc ul {
  display: flex;
  gap: 0 15px;
}
/* 설명박스 */
.intro-txt {
  padding: 20px;
  font-size: 2.2rem;
  line-height: 2;
  color: #555;
}
/* 인트로버튼 */
.intro-btn {
  padding: 20px 50px;
  border-radius: 10px;
  font-size: 1.8rem;
  background-color: transparent;
  border: 1px solid #000;
  font-weight: bold;
}

/* 인트로 동영상 박스 */
.intro-mv-img {
  position: relative;
  /* 부모자격 */
  aspect-ratio: 2/1.1;
}
/* 가상요소로 플레이버튼 만들기
-> .off를 준 경우에만 가상요소 버튼보임
따라서 비디오태그 넣을 경우 .off 지울것! */
.intro-mv-img.off::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  background: url(../images/icon_play.png) no-repeat;
  cursor: pointer;
}

/* 하위 이미지/동영상 */
.intro-mv-img img,
.intro-mv-img video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}
/* 동영상 설명박스 */
.intro-mv-box figcaption {
  font-size: 2rem;
  padding-top: 10px;
}

/***************** 2-4. 미리보기영역 *****************/
.preview-area {
  min-height: 660px;
}

/* 영역 서브제목 아이콘 가상요소로 앞에 넣기 */
.preview-area .stit::before {
  background-image: url(../images/icons/icon1.png);
}

/* 미리보기 컨텐츠 리스트 ul */
.preview-area ul.cont-box {
  gap: 2vh 1.5%;
}
/* 미리보기 컨텐츠 리스트 li */
.preview-area li {
  width: calc((100% - 1.5% * 3) / 4);
  /* 가로크기는 4등분(단, 갭3개의 값을 뺀다!) */

  aspect-ratio: 320/270;
  box-shadow: 0 0 10px #ccc;
  /* 보더박스 */
  box-sizing: border-box;
  padding: 24px 20px;

  /* 커서 손가락 */
  cursor: pointer;

  /* 투명도 0.6 */
  opacity: 0.6;
}
/* li오버시 투명도 복원 */
.preview-area li:hover {
  opacity: 1;
}

/* 미리보기 타이틀 */
.preview-area li h3 {
  font-size: 2rem;
  margin-bottom: 14px;
}
/* 미리보기 내용 */
.preview-area li p {
  font-size: 1.5rem;
  line-height: 1.9;
  color: #555;
  height: 77%;

  /* 여러줄 말줄임처리 */
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 여러줄 처리 줄수 */
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}
/***************** 2-5. 현장포토영역 *****************/
.real-part {
  /* height: 906px; */
}
/* 영역 서브제목 아이콘 가상요소로 앞에 넣기 */
.real-part .stit::before {
  background-image: url(../images/icons/icon2.png);
}
/* 현장포토 그리드박스 */
.live-box ul {
  display: grid;
  /* 4개 컬럼 동일비율 셋팅 */
  grid-template-columns: repeat(4, 1fr);
  /* 사이간격 */
  gap: min(20px, 1.2vw);
}
/* 현장포토 리스트 */
.live-box li {
  cursor: pointer;
}
/* 이미지 */
.live-box img {
  border-radius: 6px;
  width: 100%;
}
/* 이미지 타이틀 */
.live-box figcaption {
  font-size: 2rem;
  padding-top: 1.4rem;
}
/***************** 2-6. 대표포스터영역 *****************/
.poster-part {
  /* height: 654px; */
}
/* 영역 서브제목 아이콘 가상요소로 앞에 넣기 */
.poster-part .stit::before {
  background-image: url(../images/icons/icon3.png);
}
/* 대표이미지 그리드박스 */
.poster-box ul {
  display: grid;
  /* 4개 컬럼 동일비율 셋팅 */
  grid-template-columns: repeat(4, 1fr);
  /* 사이간격 */
  gap: min(20px, 1.2vw);
}
/* 대표이미지 리스트 */
.poster-box li {
  cursor: pointer;
}
/* 대표이미지 리스트 grid-row셋팅하기
-> 2줄로 세팅하려면 줄번호가 3번이 끝번호임! */
/* 1번 */
.poster-box li:nth-child(1) {
  grid-row: 1/2;
}
/* 2번째부터 4번째까지 선택 */
.poster-box li:nth-child(1) ~ li:nth-child(-n + 4) {
  grid-row: 1/3;
}
/* 다음줄 첫번째 li가 윗줄로 올라옴! */
.poster-box li:nth-child(5) {
  /* grid-row: 2/3; */
}

/* 이미지 */
.poster-box img {
  border-radius: 6px;
  width: 100%;
}
/* 이미지 타이틀 */
.poster-box figcaption {
  font-size: 2rem;
  padding-top: 1.4rem;
}
/***************** 2-7. 최신동영상영역 *****************/
.video-part .cont-box {
  position: relative;
  /* 부모자격 - 이동버튼의 부모 */
}
/* 스와이퍼 적용 랩퍼박스 */
.clip-box ul {
  /*-> 스와이퍼에서 처리하므로
  flex설정 불필요!
  트랜지션주면 방해됨! 불필요!!!

  position: relative;
  left: 0; 
  display: flex;
  transition: left 0.3s ease-out; */

  /* 선택 및 드래그 금지 */
  user-select: none;
  -webkit-user-drag: none;
}

/* 스와이퍼 리스트 .swiper-slide */
.clip-box li {
  /*->플렉스 설정 불필요!!! 
  flex-basis: 25%;
  flex-shrink: 0; */
  /* 플렉스 gap 속성대신 패딩으로 처리!
    이유는? 드래그시 영역아웃현상때문! */
  /* padding: 0 1.1%;
  box-sizing: border-box; */
}

/* 동영상 이미지박스 */
.clip-mv-box {
  position: relative;
  /* 부모자격 */
}
/* 동영상 이미지박스 이미지 */
.clip-mv-box img {
  width: 100%;
  border-radius: 6px;
  user-select: none;
  -webkit-user-drag: none;
}
/* 동영상 이미지박스 가상요소로 플레이버튼 */
.clip-mv-box::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 62px;
  height: 62px;
  background: url(../images/icon_play.png) no-repeat 0/100%;
  cursor: pointer;
}

.clip-box h4 {
  font-size: 18px;
  font-weight: normal;

  /* 2줄 말줄임 셋팅 */
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  user-select: none;
  -webkit-user-drag: none;
}

.clip-box h3 {
  font-size: 1.5rem;
  font-weight: normal;
  color: #555;
  user-select: none;
  -webkit-user-drag: none;
}

.clip-box {
  overflow: hidden;
}

/* 양쪽버튼만들기 */
.btn-box button {
  position: absolute;
  z-index: 999;
  top: 43%;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  line-height: 65px;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  border: none;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
}
/* 왼쪽버튼 */
.btn-box button:first-child {
  left: 0;
}
/* 오른쪽버튼 */
.btn-box button:last-child {
  right: 0;
}
/* 클래스를 추가하여 한쪽버튼만 안보이게 처리 */
/* 왼쪽버튼만 보이기 */
.btn-box.left button:first-child {
  display: inline-block;
}
.btn-box.left button:last-child {
  display: none;
}
/* 오른쪽버튼만 보이기 */
.btn-box.right button:last-child {
  display: inline-block;
}
.btn-box.right button:first-child {
  display: none;
}

