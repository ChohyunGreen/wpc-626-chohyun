// 보그 JS : 로그인 유효성검사 및 기능JS - valid_login.js

/**
 * 게스트 장바구니 데이터를 로그인 사용자 계정으로 이관하는 함수
 * @param {string} userId - 로그인한 사용자 ID
 */
function handleGuestCartMerge(userId) {
  const cartInfo = localStorage.getItem("cart-info");
  
  if (!cartInfo) {
    console.log("장바구니 데이터가 없습니다.");
    return;
  }

  try {
    let allCartItems = JSON.parse(cartInfo);
    
    // guest 사용자의 장바구니 아이템 찾기
    const guestItems = allCartItems.filter(item => item.userId === "guest");
    
    if (guestItems.length === 0) {
      console.log("게스트 장바구니 데이터가 없습니다.");
      return;
    }

    // 사용자에게 이관 여부 확인
    const confirmMerge = confirm(
      `게스트로 담아놓은 ${guestItems.length}개의 상품이 있습니다.\n` +
      "현재 계정의 장바구니로 이관하시겠습니까?"
    );

    if (!confirmMerge) {
      console.log("사용자가 장바구니 이관을 거부했습니다.");
      return;
    }

    // 현재 로그인 사용자의 기존 장바구니 아이템
    const userItems = allCartItems.filter(item => item.userId === userId);
    
    // 이관 작업: 같은 pcode가 있으면 수량 합치기, 없으면 추가
    guestItems.forEach(guestItem => {
      const existingItemIndex = userItems.findIndex(
        userItem => userItem.pcode === guestItem.pcode
      );

      if (existingItemIndex !== -1) {
        // 같은 상품이 이미 있는 경우: 수량 합치기
        const existingItem = userItems[existingItemIndex];
        existingItem.quantity += guestItem.quantity;
        existingItem.totalPrice = existingItem.salePrice * existingItem.quantity;
        
        console.log(`상품 ${guestItem.pcode} 수량 합치기: ${existingItem.quantity}개`);
      } else {
        // 새로운 상품인 경우: 사용자 ID 변경하여 추가
        const newItem = { ...guestItem, userId: userId };
        userItems.push(newItem);
        
        console.log(`새 상품 ${guestItem.pcode} 추가`);
      }
    });

    // guest 아이템 제거 및 병합된 사용자 아이템으로 업데이트
    const otherUsersItems = allCartItems.filter(
      item => item.userId !== "guest" && item.userId !== userId
    );
    
    const updatedCartItems = [...otherUsersItems, ...userItems];
    
    // 로컬스토리지 업데이트
    localStorage.setItem("cart-info", JSON.stringify(updatedCartItems));
    
    console.log("게스트 장바구니 이관 완료:", {
      guestItemsCount: guestItems.length,
      mergedItemsCount: userItems.length
    });
    
    alert(`게스트 장바구니 ${guestItems.length}개 상품이 성공적으로 이관되었습니다.`);

  } catch (error) {
    console.error("장바구니 이관 중 오류 발생:", error);
    alert("장바구니 이관 중 오류가 발생했습니다.");
  }
}

export default function validLogin() {
  console.log("로그인검사~!");
  /**************************************** 
        로그인 페이지 유효성 검사
  ****************************************/
  // 검사대상 : #mid, #mpw
  const mid = $("#mid");
  const mpw = $("#mpw");

  // 유효성 검사 기준 : 전송시 아이디,비번 모두 있어야함!

  // 이벤트 대상: #sbtn
  // 이벤트 종류: click
  $("#sbtn").click(function (e) {
    // 기본이동 서브밋 막기!
    e.preventDefault();

    // 공백데이터 처리 함수
    const groSpace = (x) => x.replace(/\s/g, "");

    // 유효성 검사 : 아이디,비번 빈값일 경우 ///////
    if (groSpace(mid.val()) == "" || groSpace(mpw.val()) == "") {
      alert("아이디,비밀번호를 모두 입력해야합니다!");
      // 초기화! + 아이디에 포커스
      mid.val("").focus();
      mpw.val("");
    } ////////// if : 불통과시 ////////
    else {
      // 1. 로컬스 배열 정보 담을 변수
      let temp = [];

      // 2. 회원정보 로컬스 읽어오기
      if (localStorage.getItem("mem-data"))
        temp = JSON.parse(localStorage.getItem("mem-data"));

      console.log(temp);

      // 3. 입력된 아이디 존재 여부
      // 변수 = 배열.find(조건리턴)
      // -> 결과가 undefined면 아이다가 없다는 말임!
      let result = temp.find((v) => {
        // 조건 : 배열의 아이디값 == 입력된 아이디값
        if (v.userid == mid.val()) return true;
      }); ///// find ////

      console.log("결과:", result);

      // 4. 로컬스 조회후 결과는 아래과 같이 나누어짐
      // (1) 아이디가 없음 //////////////////////
      // -> '존재하지 않는 아이디입니다'
      if (!result) {
        // !result는 result변수가 false처리시 들어옴!
        alert("존재하지 않는 아이디입니다");
      } /// if ///

      // (2) 아이디가 있는 경우 //////////////////
      else {
        // (2-1) 아이디가 있으나 비밀번호 틀림
        // -> '비밀번호가 일치하지 않습니다'
        if (result.password != mpw.val()) {
          alert("비밀번호가 일치하지 않습니다");
        } /// if ///

        // (2-2) 로그인 성공 : 첫페이지로 이동(로그인표시)
        // -> '로그인에 성공하였습니다!'
        else {
          alert("로그인에 성공하였습니다!");
          // 로그인 성공시 처리내용 :
          // 1. 세션스에 로그인정보 기록하기
          sessionStorage.setItem("loginfo", JSON.stringify(result));
          
          // 2. 게스트 장바구니 데이터 이관 처리
          handleGuestCartMerge(result.userid);
          
          // 3. 첫페이지로 이동하기
          location.href = "index.html";
        } /// else : 로그인 성공시 ///
      } ///// else : 아이디가 있는 경우 ////
    } /////// else : 아이디,비번 모두입력시 ////////
  }); ////////////// click /////////////////
} /////////// validLogin 함수 ///////////////
