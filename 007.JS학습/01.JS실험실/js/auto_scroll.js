// 자동 스크롤 JS - auto_scroll.js /////////

// 1. 사용할 이벤트 : wheel
// -> scroll 이벤트는 스크롤바기 움직일때 발생
// -> wheel 이벤트는 마우스 휠이 움직일때 발생

// 2. 이벤트 대상 : window

// 3. body에 overflow:hidden 셋팅
document.body.style.overflow = 'hidden';

// 4. html에 scroll-behavior:smooth 셋팅
document.documentElement.style.scrollBehavior = 'smooth';

// 5. 새로고침시 스크롤위치 맨위로 이동하기
setTimeout(()=>{window.scrollTo(0,0);},400);

// 6. 전역 페이지번호
let pgNo = 0;

// 7. 이동단위 -> 윈도우 높이값
let winH = window.innerHeight;

// 8. 전체 .page인 페이지개수 구하기
const page = document.querySelectorAll('.page');
const pageCnt = page.length;

// 8. 휠 이벤트를 window에 적용하여 기본 휠작동 막기
// -> 그래야 우리가 원하는 자동 스크롤 기능을 구현할 수 있다
window.addEventListener('wheel',(e)=>{ // e - 이벤트 전달변수
    // (1) 기본 기능 막기
    e.preventDefault();
    // -> window / document / body 에서 기본기능막기를 할때
    // passive 모드값을 false로 설정해야 에러가 발생하지 않음
    
    // (2) 휠 방향 알아내기
    // 이벤트객체.wheelDelta
    let dir = e.wheelDelta;
    // 아래쪽은 음수, 윗쪽은 양수
    
    console.log('휠~~~~!',dir);

    // (3) 방향에 따른 페이지번호 증감
    if(dir < 0){ //  아랫방향 음수
        pgNo++; // 페이지번호 증가
        if(pgNo > 3) pgNo = 3; // 한계값 고정
    }else if(dir > 0){ // 윗방향 양수
        pgNo--; // 페이지번호 감소
        if(pgNo < 0) pgNo = 0; // 한계값 고정
    }



},{passive:false}); //////////// wheel 이벤트 //////////////
// addEventListener(이벤트명,함수,{passive:false});