// 보그 JS 매거진 상세페이지 JS - magazine_detail.js


// [ get방식으로 넘어온 상품 배열 순번 받기 ] ///
const params = new URLSearchParams(location.search);
console.log("파라미터:",params);
// 파라미터값 받는 방법
// -> .get("파라미터명") 메서드 사용

// (1) 타이틀 
const pname = params.get("name");
// (2) 이미지
const pimg = params.get("image");
// (3) 짧은 설명
const pdesc = params.get("description");
// (4) 정가
const poriprice = params.get("originalPrice");
// (5) 판매가
const psaleprice = params.get("salePrice");
// (6) 할인율
const pdiscount = params.get("discount");
// (7) 회원전용여부
const pmemberonly = params.get("memberOnly");
// (8) 배지
const pbadge = params.get("badge");
console.log("파라미터 pname:",pname);

// 태그 만들기 대상 : 
document.querySelector(".product-section").innerHTML = `
  <!-- 이미지 영역 -->
  <div class="image-area">
    <div class="main-image">
      <img
        src="${pimg}"
        alt="${pname}"
      />
    </div>
    <div class="thumb-list">
      <div class="thumb-item active">
        <img
          src="${pimg}"
          alt="${pname} 썸네일"
        />
      </div>
    </div>
  </div>
  <!-- 정보 영역 -->
  <div class="info-area">
    <div class="title-section">
      <h1 class="product-title">${pname}</h1>
      <button class="share-btn">공유</button>
    </div>
    <div class="info-list">
      <div class="info-row">
        <div class="info-label">짧은설명</div>
        <div class="info-value">
          ${pdesc}
        </div>
      </div>
      <div class="info-row">
        <div class="info-label">정가</div>
        <div class="info-value">
          <del>96,000원</del>
        </div>
      </div>
      <div class="info-row price-row">
        <div class="info-label">판매가</div>
        <div class="info-value">72,000원</div>
      </div>
      <div class="info-row">
        <div class="info-label">구매제한</div>
        <div class="info-value">최소 1개</div>
      </div>
      <div class="info-row">
        <div class="info-label">배송비</div>
        <div class="info-value">
          <span class="delivery-badge">무료</span>
          <span>택배</span>
        </div>
      </div>
      <div class="info-row">
        <div class="info-label">상품코드</div>
        <div class="info-value">1000000297</div>
      </div>
      <div class="info-row">
        <div class="info-label">신간발행일</div>
        <div class="info-value">매월18~20일</div>
      </div>
      <div class="info-row">
        <div class="info-label">상품재고</div>
        <div class="info-value">81개</div>
      </div>
    </div>
    <div class="select-area">
      <div class="info-label" style="margin-bottom: 8px">시작 월</div>
      <select class="select-box">
        <option>2025-11월호 부터</option>
      </select>
    </div>
    <div class="selected-item">
      <div class="item-header">
        <div class="item-name">${pname}</div>
      </div>
      <div class="item-controls">
        <div class="quantity-control">
          <button type="button" onclick="decreaseQty()">-</button>
          <input type="text" id="quantity" value="1" readonly />
          <button type="button" onclick="increaseQty()">+</button>
        </div>
        <div class="item-price"><span id="itemPrice">72,000</span>원</div>
      </div>
    </div>
    <div class="price-summary">
      <div class="summary-row">
        <span>총 상품금액</span>
        <span id="totalPrice">72,000원</span>
      </div>
      <div class="summary-row total">
        <span>총 합계금액</span>
        <span class="amount" id="finalPrice">72,000원</span>
      </div>
    </div>
    <div class="button-group">
      <button class="btn btn-cart">장바구니</button>
      <button class="btn btn-wish">찜하기</button>
    </div>
    <div class="button-group">
      <button class="btn btn-buy">바로 구매</button>
    </div>
  </div>
        
`;

// [  파라미터를 받는 방법 ]
// 1) location.search : ?pid=0 형태의 문자열 받기
// 2) URLSearchParams() 생성자함수에 전달하여 객체 생성
// 3) .get("파라미터명") 메서드로 값 받기 
// console.log('파라미터값:',pid);


// [ Post 방식으로 데이터 받기 ] 
// -> 실제 서버에 배포했을때 작동함!
// document.addEventListener("DOMContentLoaded", ()=>{
//   // 1. FormData 객체 생성
//   const formData = new FormData(document.forms[0]);
//   // 2. .get("키") 메서드로 데이터 받기
//   const productData = formData.get("product");
//   console.log("상품데이터:", productData);
// }); /////////////// 로딩구역 //////////////////


// [ Post 방식으로 데이터 받는 방법 ]
// 1) DOMContentLoaded 이벤트에서 실행
// 2) FormData 객체 생성
//    - new FormData(폼요소)
//    - document.forms[0] : 첫번째 폼요소 선택
// 3) .get("키") 메서드로 값 받기


const basePrice = 72000;

function updatePrice() {
  const qty = parseInt(document.getElementById("quantity").value);
  const total = basePrice * qty;
  const formatted = total.toLocaleString("ko-KR");

  document.getElementById("itemPrice").textContent = formatted;
  document.getElementById("totalPrice").textContent = formatted + "원";
  document.getElementById("finalPrice").textContent = formatted + "원";
}

function increaseQty() {
  const input = document.getElementById("quantity");
  const current = parseInt(input.value);
  if (current < 81) {
    input.value = current + 1;
    updatePrice();
  }
}

function decreaseQty() {
  const input = document.getElementById("quantity");
  const current = parseInt(input.value);
  if (current > 1) {
    input.value = current - 1;
    updatePrice();
  }
}
