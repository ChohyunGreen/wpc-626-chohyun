// 옷소매 갤러리 JS - main.js

// import mFn from "./my_function.js";

/*********************************************************** 
    1. 기능정의: 
        버튼 클릭시 갤러리박스를 잘라서 앞/뒤로 이동함

    1-1. 오른쪽버튼 클릭시 - 맨앞div 맨뒤로 이동
        JS -> 갤러리부모박스.appendChild(맨앞자식div)
        제이쿼리 -> 갤러리부모박스.append(맨앞자식div)

    1-2. 왼쪽버튼 클릭시 - 맨뒤div 맨앞으로 이동
        JS -> 갤러리부모박스.insertBefore(맨뒤자식div,맨앞자식div)
        제이쿼리 -> 갤러리부모박스.prepend(맨뒤자식div)

 ***********************************************************/

// 변경대상 변수할당 : .gbx>div
const $target = $('.gbx');

// 광클금지상태변수
let stopClick = false;
// 값이 true일때 클릭허용/ false면 불허용

// 광클금지해제시간 상수셋팅
const TIME_GAP = 400;

// 1. 오른쪽 버튼 클릭시
$('.rb').click(()=>{
    // 광클금지함수호출후 리턴셋팅!
    if(blockClick()) return;

    $target.append($target.find('div').first());
});

// 2. 왼쪽 버튼 클릭시
$('.lb').click(()=>{
    // 광클금지함수호출후 리턴셋팅!
    if(blockClick()) return;
    
    $target.prepend($target.find('div').last());
});

//////// 광클금지함수 ///////
function blockClick(){
    // 1. 광클이면 true 를 리턴함!
    if(stopClick) return true;

    // 2. 클릭가능상태이면 전역변수 셋팅
    stopClick = true;
    setTimeout(() => {
        stopClick = false;
    }, TIME_GAP);

    // 3. 상태값 리턴 (클릭가능상태 false)
    return false;
} ////// blockClick 함수 ///////










// // ****************************** /////
// // 자바스크립로 버튼 이동구현하기 ///////
// // ****************************** /////
// // 변경대상 : .gbx
// const gbx = document.querySelector('.gbx');

// // 1. 오른쪽 이동버튼 클릭시
// // -> appendChild(맨앞자식div) 
// // -> 맨앞div를 맨뒤로 이동!
// document.querySelector('.rb').onclick = 
// ()=>{
//     console.log('오른쪽이야~!!!');

//     gbx.appendChild(gbx.firstElementChild);
//     // firstElementChild: .gbx>div:nth-child(1)
//     // 자식요소중 첫번째 요소를 선택함!
//     // 이것을 맨뒤로 이동시킴!

// }; ///// click /////////////////////

// // 2. 왼쪽 이동버튼 클릭시
// // -> insertBefore(맨뒤자식div,맨앞자식div) 
// // -> 맨뒤div를 맨앞으로 이동!
// document.querySelector('.lb').onclick = 
// ()=>{
//     console.log('왼쪽이야~!!!');

//     gbx.insertBefore(
//         gbx.lastElementChild, 
//         gbx.firstElementChild);
//     // lastElementChild: .gbx>div:nth-child(5)
//     // 자식요소중 마지막번째 요소를 선택함!
//     // 이것을 맨앞으로 이동시킴!
// }; ///// click /////////////////////
