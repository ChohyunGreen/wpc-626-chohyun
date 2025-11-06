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
// $btns.hide().eq(4).show();

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
$btns
  .first()
  .click(function () {
    // 버튼별 기능구현하기 //////////////
    let fn = () => {
      // 이동후 콜백함수

      // [1] 메시지 변경후 나타나기
      // -> 방번호와 같은 순번 메시지
      // -> 도착 1초후 나타나기
      $msg
        .html(msgTxt[8])
        .delay(1000)
        .fadeIn(300, () => {
          // 콜백함수
          // [2] 다음버튼 보이기
          $(this).next().fadeIn(300);
        });
    }; // fn 함수 끝 //////////////

    // 3. 미니언즈 공통 기능함수 호출하기
    actMini(this, 8, fn);
  }) /////////// click //////////////

  // (4-2) "옆방으로!" 버튼 클릭시
  .next()
  .click(function () {
    // 버튼별 기능구현하기 //////////////
    let fn = () => {
      // 이동후 콜백함수

      // [1] 좀비나타나기 : 현재방의 좀비선택
      $room
        .eq(9)
        .find(".mz") // 좀비선택
        .delay(1000) // 1초후
        .fadeIn(300, () => {
          // 좀비등장후 콜백
          // [2] 메시지 나타나기
          $msg.html(msgTxt[9]).css({ left: "-100%" }).fadeIn(300);

          // [3] 다음버튼 보이기
          $(this).next().fadeIn(300);
        }); /////// fadeIn ////////////
    }; // fn 함수 끝 //////////////

    // 3. 미니언즈 공통 기능함수 호출하기
    actMini(this, 9, fn);
  }) /////////// click ////////////////

  // (4-3) "윗층으로 도망가!" 버튼 클릭시
  .next()
  .click(function () {
    // 버튼별 기능구현하기 //////////////
    let fn = () => {
      // 이동후 콜백함수
      // [1] 첫번째 메시지 나타나기
      $msg
        .html(msgTxt[7][0])
        .delay(500) // 0.5초후
        .fadeIn(300) // 나타나기
        .delay(2000) // 2초후
        .fadeIn(300, () => {
          // 다시 나타나기
          // [2] 좀비 나타나기 : 7번방의 좀비
          $room
            .eq(7)
            .find(".mz") // 좀비선택
            .delay(1000) // 1초후
            .fadeIn(
              300,
              // function() { // 일반익명함수 this는 좀비!
              () => {
                // 일반익명함수 this는 좀비!
                console.log("this의미:", this);
                // 좀비등장후 콜백
                // [3] 다음 메시지 나타나기
                $msg.html(msgTxt[7][1]);
                // [4] 다음버튼 보이기
                $(this).next().fadeIn(300);
              }
            ); /////// fadeIn ////////////
        }); ///////// fadeIn ////////////
    }; // fn 함수 끝 //////////////

    // 3. 미니언즈 공통 기능함수 호출하기
    actMini(this, 7, fn);
  }) /////////// click ////////////////

  // (4-4) "다시옆방으로!" 버튼 클릭시
  .next()
  .click(function () {
    // 버튼별 기능구현하기 //////////////
    let fn = () => {
      // 이동후 콜백함수
      // [1] 첫번째 메시지 보이기
      $msg
        .html(msgTxt[6][0])
        .delay(500) // 0.5초후
        .fadeIn(300) // 나타나기
        .delay(2000) // 2초후
        .fadeIn(300, () => {
          // [2] 두번째 메시지 보이기
          $msg.html(msgTxt[6][1]);
          // [3] 다음버튼 보이기
          $(this).next().fadeIn(300);
        });
    }; // fn 함수 끝 //////////////

    // 3. 미니언즈 공통 기능함수 호출하기
    actMini(this, 6, fn);
  }) /////////// click ////////////////

  // (4-5) "무서우니 윗층으로!" 버튼 클릭시
  .next()
  .click(function () {
    // 버튼별 기능구현하기 //////////////
    let fn = () => {
      // 이동후 콜백함수
      // [1] 여러 메시지를 순차적으로 보이게하기
      $msg
        .html(msgTxt[4][0][0]) // "무",
        .fadeIn(200)
        .delay(500)
        .fadeIn(200, () => $msg.html(msgTxt[4][0][1])) // "무.",
        .delay(500)
        .fadeIn(200, () => $msg.html(msgTxt[4][0][2])) // "무.서",
        .delay(500)
        .fadeIn(200, () => $msg.html(msgTxt[4][0][3])) // "무.서.",
        .delay(500)
        .fadeIn(200, () => $msg.html(msgTxt[4][0][4])) // "무.서.워",
        .delay(500)
        .fadeIn(200, () => $msg.html(msgTxt[4][0][5])) // "무.서.워.",
        .delay(500)
        .fadeIn(200, () => $msg.html(msgTxt[4][0][6])) // "무.서.워..",
        .delay(500)
        .fadeIn(200, () => $msg.html(msgTxt[4][0][7])) // "무.서.워...",
        .delay(3000)
        .fadeIn(200, () => $msg.html(msgTxt[4][1]));
      // `아~악! 물렸다!<br>어서 치료주사방으로!`

      // [2] 7번방의 좀비 윗층으로 뛰어오른후 달겨들기
      $room
        .eq(7)
        .find(".mz")
        .delay(4000) // 4초후
        .animate({ top: "-100%" }, 500, "easeOutBounce")
        .delay(500) // 0.5초후
        .animate({ right: "123%" }, 1500, "easeOutElastic");

      // [3] 미니언즈 주인공 이미지 좀비로 변경하기 + 회색처리
      // 7초후 적용하기
      setTimeout(() => {
        // 좀비로 변경
        $mi
          .find("img")
          .attr("src", "images/mz1.png")
          .css("filter", "grayscale(100%)");
        // [4] 다음버튼 보이기
        $(this).next().fadeIn(300);
      }, 7000);
    }; // fn 함수 끝 //////////////

    // 3. 미니언즈 공통 기능함수 호출하기
    actMini(this, 4, fn);
  }) /////////// click ////////////////

  // (4-6) "치료주사방으로!" 버튼 클릭시
  .next()
  .click(function () {
    // 버튼별 기능구현하기 //////////////
    let fn = () => {
      // [1] 주사기 회전하기 : 미니언즈보다 위로 조정
      $(".inj")
        .css({ zIndex: 9999 })
        .animate(
          {
            rotate: "-150deg",
          },
          400,
          () => {
            // 애니후 함수
            // [2] 미니언즈 이미지 변경하기(눈하나짜리 후유증...)
            $mi
              .find("img")
              .attr("src", "images/m2.png")
              // 그레이스케일 원상복구
              .css("filter", "grayscale(0%)");

            // [3] 주사기 없애기
            $(".inj").hide();

            // [5] 대사날리기
            $msg.html(msgTxt[2]).fadeIn(300);

            // [6] 다음버튼 보이기
            $(this).next().fadeIn(300);
          }
        );
    }; // fn 함수 끝 //////////////

    // 3. 미니언즈 공통 기능함수 호출하기
    actMini(this, 2, fn);
  }) /////////// click ////////////////

  // (4-7) "3번방으로!" 버튼 클릭시
  .next()
  .click(function () {
    // 버튼별 기능구현하기 //////////////
    let fn = () => {
      // [1] 대사날리기
      $msg.html(msgTxt[3]).fadeIn(300);

      // [2] 다음버튼 보이기
      $(this).next().fadeIn(300);
    }; // fn 함수 끝 //////////////

    // 3. 미니언즈 공통 기능함수 호출하기
    actMini(this, 3, fn);
  }) /////////// click ////////////////

  // (4-8) "1번방으로!" 버튼 클릭시
  .next()
  .click(function () {
    // 버튼별 기능구현하기 //////////////
    let fn = () => {
      // [1] 대사날리기
      $msg.html(msgTxt[1]).fadeIn(300);

      // [2] 다음버튼 보이기
      $(this).next().fadeIn(300);
    }; // fn 함수 끝 //////////////

    // 3. 미니언즈 공통 기능함수 호출하기
    actMini(this, 1, fn);
  }) /////////// click ////////////////

  // (4-9) "헬기를 호출!" 버튼 클릭시
  .next()
  .click(function () {
    // 버튼별 기능구현하기 //////////////
    let fn = () => {
      // 마지막 최종 쑈쑈쑈!
      // [1] 대사날리기
      $msg.html(msgTxt[0]).fadeIn(300);

      // [2] 1번방의 단체좀비들 달겨들기!
      $room
        .eq(1)
        .find(".mz")
        .fadeIn(300)
        .animate({ right: "100%" }, 3000, "easeInCirc");

      // [3] 헬기 등장 : .heli
      $(".heli")
        .css({ rotate: "25deg" })
        .animate(
          {
            left: "24%",
            rotate: "0deg",
          },
          3000,
          "easeOutBack",
          function () {
            // 애니후 콜백함수
            // 여기서 this는 .heli이다!
            // [4] 헬기 이미지 미니언즈 탄것으로 바꾸기
            $(this).attr("src", "images/heli2.png");

            // [5] 헬기에 탔으니까 미니언즈 숨기기
            $mi.hide();
          }
        ) //// animate ////

        // [6] 지연후 헬기 계속이동
        .delay(500) // 0.5초 후
        .animate(
          {
            left: "70%",
            rotate: "15deg",
          },
          4000,
          "easeInOutCirc",
          function () {
            // 애니후 콜백함수

            // [7] 조종사가 좀비된 이미지로 변경
            $(this).attr("src", "images/heli3.png");
          }
        ) ////// animate //////

        // [8] 지연후 헬기 천천히 화면바깥으로 나감!
        .delay(300) // 0.3초 후
        .animate(
          {
            left: "110%",
          },
          10000,
          "linear",
          () => {
            // [9] 최종애니 콜백함수
            // -> 간판떨어져, 건물무너져~~ 등

            // [9-1] 간판떨어지기
            let tit = $(".tit");
            // 1단계: 클래스 'on'주기
            tit.addClass("on");
            // 2단계: 클래스 'on2'주기
            setTimeout(() => {
              tit.addClass("on2");
            }, 3000);

            // [9-2] 건물 무너지기 : 6초후
            setTimeout(() => {
              $room.parent().addClass("on");
              // parent()는 li의 부모인 ul로 올라감
            }, 6000);

            // [9-3] 추가구현 : 20초후 작동시작
            setTimeout(() => {
              // 1) 건물무너지고 9번방 좀비가 올라옴
              // - 건물이 돌아가 있으므로 세워놓고 올라옴
              $room
                .parent() // li의 부모 ul건물 박스
                .attr("style", "transform:rotate(0deg) !important");
              // 9번방 좀비
              $room
                .eq(9)
                .find(".mz")
                // 2)지표로 올라오기
                .animate(
                  {
                    bottom: "594%",
                  },
                  3000
                )
                // 3)기다리기
                .delay(3000)
                // 4)오른쪽으로 사라짐(5초간)
                .animate(
                  {
                    right: "-240%",
                  },
                  5000,
                  () => {
                    // 진짜끝!!!
                    // 5) 엔딩글자 나옴
                    $("body").append('<h1 class="ending">THE END</h1>');

                    $(".ending")
                      .css({
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        margin: "0",
                        padding: "0",
                        color: "white",
                        fontSize: "20vh",
                        textShadow: "0 0 5px #000",
                        fontFamily: "vladimir script",
                      })
                      .hide() // 숨기기
                      .fadeIn(1000) // 페이드로 보이기
                      .animate({ color: "red" }, 1000);
                    // 마지막 글자색 빨간색으로 마무리!!!
                  }
                ); /// animate ///
            }, 20000);
          }
        ); //////// animate //////
    }; // fn 함수 끝 //////////////

    // 3. 미니언즈 공통 기능함수 호출하기
    actMini(this, 0, fn);
  }); /////////// click ////////////////
