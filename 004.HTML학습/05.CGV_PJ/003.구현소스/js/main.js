// CGV PJ 추가기능 JS - main.js

// 로딩확인
console.log("나야나 로딩!");

// 영화 유튜브 아이디 정보객체 //////
const 유튜브 = {
    "어쩔수가없다":"ckHwZNuV-wQ",
    "귀멸의 칼날: 무한성편":"zN8K_uE1LYg",
    "얼굴":"dM0quIEmrYA",
    "모노노케 히메":"nV-9eWqKT2k",
    "F1 더 무비":"6a_X77HO4Vk",
    "보스":"OKVsQ686GVw",
};

// 1. 대상 선정
// 1-1. 포스터 링크 이미지 a요소 -> 이벤트 대상
const 링크 = document.querySelectorAll('.poster-menu-box li a');
// 1-2. 영화상영 아이프레임 -> 변경대상
const 아이프레임 = document.querySelector('.screen iframe');

// 2. 이벤트 대상에 클릭이벤트 적용하기 ////
// forEach()메서드 내부함수에 첫번째 전달값으로
// 순회하는 요소나 값 하나하나가 순서대로 전달됨!
링크.forEach((요소)=>{
    요소.onclick = () => {

        // 3. 클릭된 a요소 자식중 h2요소의 글자읽기
        let 영화명 = 요소.querySelector('h2').innerText;
        console.log("클릭된 영화명:", 영화명);

        // 4. 아이프레임 소스 변경하기
        아이프레임.src = `https://www.youtube.com/embed/${유튜브[영화명]}?autoplay=1`;
    };
});


// 원래는 a요소에 직접 이벤트 속성에 코딩해서 테스트했었음!
/* 
    
    onclick="
    // ckHwZNuV-wQ
    document.querySelector('.screen iframe')
    .src = `https://www.youtube.com/embed/ckHwZNuV-wQ?autoplay=1`;
    "
    

    onclick="
    // ckHwZNuV-wQ
    document.querySelector('.screen iframe')
    .src = `https://www.youtube.com/embed/zN8K_uE1LYg?autoplay=1`;
    "
                

*/




// 2. 포스터 메뉴 클릭시 클래스 on넣기 (나머지는 빼기)

// 2-1. 이벤트 대상 === 변경대상 -> 포스터메뉴 a링크
링크.forEach((el,idx,arr)=>{
    // el-각요소, idx-순번, arr-html컬렉션 유사배열

    // 2-2. 이벤트 대상 === 변경대상 -> 포스터메뉴 a링크
    // 이벤트 등록 전문이벤트 addEventListener() 를 사용함!
    el.addEventListener('click', () => {

        // (1) 모든 li의 on클래스 제거하기
        // 부모인 li로 올라가야함 -> parentElement
        arr.forEach(x => 
            x.parentElement.classList.remove('on'));

        // (2) 포스터메뉴 a링크의 부모인 li에 on넣기
        // parentElement: a링크의 부모인 li
        el.parentElement.classList.add('on');
    }); /// addEventListener() ///



    // 만약 onclick 이벤트 속성으로 셋팅하게 되면
    // 이전에 셋팅된 onclick 이벤트 속성값이 지워진다!
    // 왜? 한 요소안에 한 개의 동일 이벤트 속성만 있기 때문!
    // el.onclick = () => {
    //     // 2-3. 포스터메뉴 a링크의 부모인 li에 on넣기
    //     // parentElement: a링크의 부모인 li
    //     el.parentElement.classList.add('on');
    // };

}); /// forEach 메서드 ///


링크.forEach(헐=>console.log(헐)); 
// -> 링크를 돌면서 변수 헐...에 각 요소를 순서대로 전달한다!


// 3. 오시는길 클릭시 구글맵 보이기 ///
// 이벤트 대상 : .goMV 
// 변경 대상 : .gmap
document.querySelector('.goMV').onclick = () => {
    // 클래스 on넣기
    document.querySelector('.gmap').classList.add('on');
}

// 닫기버튼 .cbtn을 클릭시 .gmap에 클래스 on 제거하기
document.querySelector('.cbtn').onclick = () => {
    document.querySelector('.gmap').classList.remove('on');
}