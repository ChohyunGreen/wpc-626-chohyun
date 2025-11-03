document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.hero-swiper', {
    // 기본 설정
    slidesPerView: 1,
    loop: true,

    // 자동 재생
    autoplay: {
      delay: 3000, // 3초마다 전환
      disableOnInteraction: false,
    },

    // 네비게이션(화살표)
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // 페이지네이션(도트)
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // 키보드로 제어 가능
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // 접근성(스크린리더 등)
    a11y: {
      enabled: true,
    },

    // 전환 효과(원하면 변경)
    effect: 'slide',
    speed: 600,
  });
});