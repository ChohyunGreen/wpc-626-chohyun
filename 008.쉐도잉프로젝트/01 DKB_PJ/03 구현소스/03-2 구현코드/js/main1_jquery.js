// 가로방향 배너 슬라이드
// 제이쿼리 버전 - main1_jquery.js

// 1. 대상
// 1-1. 이벤트 대상 : 이동버튼 2개 - .ab1, .ab2
// 1-2. 변경 대상 : 슬라이드 박스 - .banner-slide
const $slide = $('.banner-slide');
// 보통 제이쿼리 선택할당은 변수명 앞에 $로 시작

// 2. 구현하기
// 2-1. 오른쪽 이동버튼 클릭시 기능구현

// 슬라이드 순번 전역변수
let seq = 0;

// 오른쪽 버튼은 재사용되므로 변수에 담자!
const $rbtn = $('.ab2');

// 클릭이벤트 설정하기 ///
$rbtn.click(()=>{
    // 슬라이드 순번 전역변수 1증가
    seq++;
    // 2가 한계이므로 처리
    if(seq>2) seq=0;    
    
    // 슬라이드의 translate값을 변경함!
    $slide.css({
        translate: (-100*seq)+'%',
        transition: '.5s'
    }); /// css ///
}); /// click ///

// 클릭이벤트 설정하기 ///
$('.ab1').click(()=>{
    // 슬라이드 순번 전역변수 1감소
    seq--;
    // 0이 한계이므로 처리
    if(seq<0) seq=2;    
    
    // 슬라이드의 translate값을 변경함!
    $slide.css({
        translate: (-100*seq)+'%',
        transition: '.5s'
    }); /// css ///
}); /// click ///

// 일정 간격으로 오른쪽 버튼 클릭설정하기 ///
setInterval(()=>{
    // 오른쪽 버튼 클릭 강제발생
    $rbtn.click();
}, 3000); // 3초간격