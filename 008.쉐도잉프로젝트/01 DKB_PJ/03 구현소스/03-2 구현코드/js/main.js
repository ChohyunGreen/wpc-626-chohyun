// 도깨비 PJ 메인 페이지 JS - main.js /////////

///////////////////////////////////////////////////
// 1. 큐브로고박스 일정간격으로 클래스 넣었다 빼기 ///
//////////////////////////////////////////////////

// -> 로고가 일정 간격으로 회전함!
// 지금은 1.5초씩 alternate하였으므로 총 3초걸림

// 1-1. 대상선정 : .cube-logo
const cubeLogo = document.querySelector('.cube-logo');

// 1-2. 클래스 셋팅함수 ////////////////
const setClass = () => {
    // 클래스넣기
    cubeLogo.classList.add('rotate-cube');

    // 3초후 클래스 제거하기
    // setTimeout(함수, 시간);
    setTimeout(() => {
        cubeLogo.classList.remove('rotate-cube');        
    }, 3000);
}; /////////// setClass 함수 //////////

// 1-3. 일정간격으로 클래스 셋팅함수 호출하기 ///////
// setInterval(함수, 시간);
// 일정시간 간격으로 함수가 실행됨!
setInterval(setClass, 10000); 
/// 10초간격으로 실행됨! //////

// 1-4. 처음에 회전하도록 클래스 셋팅함수 호출하기
setClass();
