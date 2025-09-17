
// 배너 슬라이드 자동 슬라이드
let slideIndex = 0;
const slides = document.querySelectorAll('.slider ul li');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    slides[n].style.display = 'block';
    dots[n].classList.add('active');
}

showSlide(slideIndex);

setInterval(() => {
    slideIndex++;
    if (slideIndex > slides.length - 1) {
        slideIndex = 0;
    }
    showSlide(slideIndex);
}, 5000);

// 슬라이드 좌우 버튼 클릭 시 슬라이드 변경
document.querySelector('.slider').addEventListener('click', (e) => {
    if (e.target.classList.contains('left')) {
        slideIndex--;
        if (slideIndex < 0) slideIndex = slides.length - 1;
        showSlide(slideIndex);
    } else if (e.target.classList.contains('right')) {
        slideIndex++;
        if (slideIndex > slides.length - 1) slideIndex = 0;
        showSlide(slideIndex);
    }
});

// 이벤트 슬라이드 도트 버튼 클릭 시 슬라이드 변경
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// 탭 형식 슬라이드
const tabItems = document.querySelectorAll('#tab-slide ul li');
const tabContents = document.querySelectorAll('#tab-slide div');

tabItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        for (let i = 0; i < tabItems.length; i++) {
            tabItems[i].classList.remove('active');
            tabContents[i].style.display = 'none';
        }
        item.classList.add('active');
        tabContents[index].style.display = 'block';
    });
});