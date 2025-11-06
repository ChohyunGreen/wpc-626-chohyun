// 보그 코리아 공통 JS - common.js
// Header와 Footer를 jQuery load() 메서드로 불러오기

// html요소 로드후 실행할 JS 불러오기
import goToPage from "./linksys.js";

$(document).ready(function() {
  // 헤더 로드
  $("#header-area").load("./inc/header.html", function(response, status, xhr) {
    if (status == "error") {
      console.log("Header 로드 실패: " + xhr.status + " " + xhr.statusText);
    } else { // 성공시 실행구역
      console.log("Header 로드 성공");
      // 헤더로드 후 실행하는 JS 코드
      goToPage();
    }
  });

  // 푸터 로드
  $("#footer-area").load("./inc/footer.html", function(response, status, xhr) {
    if (status == "error") {
      console.log("Footer 로드 실패: " + xhr.status + " " + xhr.statusText);
    } else {
      console.log("Footer 로드 성공");
    }
  });
});
