// js1.기본사용법 외부 js파일 

// 이 파일이 불러와졌는지 확인하기
console.log('나,외부js야');

// 돌아랏 함수 ///////
function 돌아랏(순번){ // 순번 - 순서번호받는 전달변수

    // 1. 함수호출확인  ///////
    console.log('돌아랏.함수닷');


    // 2. 변경대상선정 : 클릭된 .원이야 요소
    var 도는놈 = 
    document.getElementsByClassName('원이야').item(순번)

    console.log('대상은?',도는놈);

    // 3. 클래스 넣기
    // js의 클래스 제어객체 : classList 
    // 하위 메서드 중 클래스 넣기기능 : add(클래스명)
    도는놈.classList.add('돌아');


} ////////// 돌아랏 함수 ///////////