// 보그 JS 매거진 상세페이지 JS - magazine_detail.js

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
