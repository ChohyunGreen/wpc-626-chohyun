// 미니언즈 좀비 탈출 애니 구현 JS - main.js

/*********************************** 
    [ 요구사항정리 ]
    1. 버튼을 클릭하여 미니언즈가
        순서대로 특정위치로 이동하며
        메시지를 보여준다
    2. 각 위치별 좀비를 등장시킨다
    3. 맨윗층에서 탈출할때 헬기를 사용한다

    [ 변경대상 ]
    1. 주인공 미니언즈
    2. 좀비 미니언즈들
    3. 주사기
    4. 헬기

    [ 이벤트와 이벤트대상  ]
    1. 이벤트 : 클릭이벤트
    2. 이벤트대상 : 버튼들
    3. 기능구분 : 버튼글자(지시사항)

***********************************/

// 0. 주인공들 변수에 할당!
// (1) 미니언즈
const $mi = $(".mi");

// (2) 건물 리스트(li요소-각방)
const $room = $(".building li");

// (3) 버튼틀
const $btns = $(".btns button");

// (4) 메시지 박스
const $msg = $(".msg");

// (5) 좀비, 주사기 요소 변수처리
let mz1 = `<img src="./images/mz1.png" alt="좀비1" class="mz">`;
let mz2 = `<img src="./images/mz2.png" alt="좀비2" class="mz">`;
let zom = `<img src="./images/zom.png" alt="좀비들" class="mz">`;
let inj = `<img src="./images/inj.png" alt="주사기" class="inj">`;

// (6) 메시지 배열 셋팅
// -> 각 방의 순번과 대사배열번호가 일치함!
const msgTxt = [
  // 0번방
  `도와줘요!!!`,
  // 1번방
  `이제 곧 탈출이닷!`,
  // 2번방
  `이제 조금만 더<br>가면 탈출이닷!`,
  // 3번방
  `어서 윗층으로 가자!`,
  // 4번방
  [
    [
      "무",
      "무.",
      "무.서",
      "무.서.",
      "무.서.워",
      "무.서.워.",
      "무.서.워..",
      "무.서.워...",
    ],
    `아~악! 물렸다!<br>어서 치료주사방으로!`,
  ],
  // 5번방
  "",
  // 6번방
  [`여긴없겠지?`, `그래도 무서우니<br>윗층으로 가자!`],
  // 7번방
  [`여긴없겠지?`, `악, 여기도!!!`],
  // 8번방
  `와~! 아늑하다!<br>옆방으로 가보자!`,
  // 9번방
  "악!;;;; 좀비!<br>어서피하자!",
];

// 각 할당변수 확인
// console.log($mi, $room, $btns, $msg);

// 1. 건물 각 방에 번호넣기 + 좀비/주사기 넣기
// 대상 : .building li -> $room변수
// 사용 제이쿼리 메서드
// (1) each((순번, 요소)=>{구현코드})
// -> 요소 개수만큼 순서대로 돌아줌!
// (2) append(요소) : 선택요소 내부에 자식요소 추가(이동)

$room.each((idx, el) => {
  // el은 순수한 태그요소가 들어옴!
  //   console.log("순번:", idx, "/요소:", el);

  // (1) 각 방에 번호넣기
  $(el).text(idx);

  // (2) 좀비/주사기 넣기
  // switch문으로 구분
  switch (idx) {
    case 9: // 9번방 - 좀비1
      $(el).append(mz1);
      break;
    case 7: // 7번방 - 좀비2
      $(el).append(mz2);
      break;
    case 1: // 1번방 - 좀비들
      $(el).append(zom);
      break;
    case 2: // 2번방 - 주사기
      $(el).append(inj);
      break;
  } // switch문 끝 //
}); /////// each 메서드 /////////////

// 좀비는 모두 숨기기!
$(".mz").hide();

// 2. 버튼 셋팅하기 //////////////////////
// 대상 : .btns button -> $btns변수
// 변경사항 : 모든 버튼을 숨기고 첫번째 버튼만 보이게함!
$btns.hide().first().show();

// 예비코드 : 특정순번버튼만 나오게하기
// $btns.hide().eq(3).show();

// 3. 미니언즈 공통 기능함수 ///////////////////
const actMini = (el, seq, fn) => {
  // el : 클릭된 버튼요소
  // seq : 이동할 li방 순번
  // fn : 이동후 실행할 콜백함수

  console.log("이동방순번:", seq);

  // 1. 메시지 숨기기
  $msg.fadeOut(300);

  // 2. 클릭된 버튼 자신 숨기기
  $(el).slideUp(300);

  // 3. 방의 위치 알아내기
  // -> 요소의 위치는 offset().top / offset().left 메서드 사용
  let myRoom = {}; // 위치정보 객체
  let myTarget = $room.eq(seq); // n번방
  myRoom.top = myTarget.offset().top;
  // 방 중앙에 오도록 방크기의 절반만큼 이동하고 자기크기의
  // 절반만큼 빼줌!
  myRoom.left = myTarget.offset().left + myTarget.width() / 2 - $mi.width() / 2;
  console.log("n번방위치:", myRoom);

  // 4. 미니언즈 이동하기
  $mi.animate(
    {
      top: myRoom.top,
      left: myRoom.left,
    },
    800, // 시간
    "easeOutElastic", // 이징
    fn // 이동후 콜백함수
  );
  // animate({CSS설정},시간,이징,함수);
}; ///////////// actMini 함수 ///////////////

// 4. 버튼 클릭하여 기능수행하기 ////////////////
// (4-1) "들어가기" 버튼 클릭시
$btns.first().click(function () {

  // 버튼별 기능구현하기 //////////////
  let fn = ()=>{ // 이동후 콜백함수

    // 5. 메시지 변경후 나타나기 
    // -> 방번호와 같은 순번 메시지
    // -> 도착 1초후 나타나기
    $msg.html(msgTxt[8]).delay(1000).fadeIn(300);

    // 다음버튼 보이기
    $(this).next().fadeIn(300);
  }; // fn 함수 끝 //////////////

  // 3. 미니언즈 공통 기능함수 호출하기
  actMini(this, 8, fn);
})
// 다음버튼
.next()
.click(function () {
  // 버튼별 기능구현하기 //////////////
  let fn = ()=>{ // 이동후 콜백함수

    // 5. 메시지 변경후 나타나기 
    // -> 방번호와 같은 순번 메시지
    // -> 도착 1초후 나타나기
    $msg.html(msgTxt[9]).delay(1000).fadeIn(300);
    
    // 다음버튼 보이기
    $(this).next().fadeIn(300);
  }; // fn 함수 끝 //////////////

  // 3. 미니언즈 공통 기능함수 호출하기
  actMini(this, 9, fn);
})
