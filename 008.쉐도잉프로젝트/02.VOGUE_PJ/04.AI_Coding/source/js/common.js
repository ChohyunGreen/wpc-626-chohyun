// 보그 코리아 공통 JS - common.js
// Header와 Footer를 jQuery load() 메서드로 불러오기

// html요소 로드후 실행할 JS 불러오기
import goToPage from "./linksys.js";

// 헤더 스크롤 반응형 기능 함수
function scrollHeaderToggle() {
    const $header = $('header');
    let lastScrollTop = 0; // 이전 스크롤 위치 저장

    // 스크롤 이벤트 핸들러
    $(window).on('scroll', function() {
        const currentScrollTop = $(this).scrollTop();
        const headerHeight = $header.outerHeight(); // 헤더의 전체 높이

        // 스크롤 다운 (아래로)
        if (currentScrollTop > lastScrollTop && currentScrollTop > headerHeight) {
            // 현재 스크롤 위치가 헤더 높이보다 클 때 (헤더가 화면을 벗어나기 시작할 때) 숨김
            $header.addClass('hidden');
        } 
        // 스크롤 업 (위로)
        else if (currentScrollTop < lastScrollTop) {
            // 스크롤 방향이 위쪽일 때 표시
            $header.removeClass('hidden');
        }
        
        // 스크롤 위치 업데이트
        lastScrollTop = currentScrollTop;
    });
}


$(document).ready(function() {
  // 헤더 로드
  $("#header-area").load("./inc/header.html", function(response, status, xhr) {
    if (status == "error") {
      console.log("Header 로드 실패: " + xhr.status + " " + xhr.statusText);
    } else { // 성공시 실행구역
      console.log("Header 로드 성공");
      // 헤더로드 후 실행하는 JS 코드
      goToPage();
      
      // 스크롤 헤더 토글 기능 실행 추가
      scrollHeaderToggle(); 
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