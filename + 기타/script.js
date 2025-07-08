const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const fraction = document.querySelector('.carousel-fraction');
const pauseButton = document.querySelector('.carousel-pause');
const playButton = document.querySelector('.carousel-play');

let currentIndex = 0;
let intervalId;
let isPaused = false;

function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    fraction.textContent = `${(currentIndex % carouselItems.length) + 1} / ${carouselItems.length}`;
}

function nextSlide() {
    currentIndex++;
    updateCarousel();
}

function prevSlide() {
    currentIndex--;
    updateCarousel();
}

function startAutoSlide() {
    intervalId = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(intervalId);
}

startAutoSlide();

nextButton.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    if (!isPaused) {
        startAutoSlide();
    }
});

prevButton.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    if (!isPaused) {
        startAutoSlide();
    }
});

pauseButton.addEventListener('click', () => {
    stopAutoSlide();
    isPaused = true;
});

playButton.addEventListener('click', () => {
    startAutoSlide();
    isPaused = false;
});

let startX, startY, distX, distY;

carouselTrack.addEventListener('mousedown', (e) => {
    startX = e.pageX;
    startY = e.pageY;
    stopAutoSlide();
});

carouselTrack.addEventListener('mouseup', (e) => {
    distX = e.pageX - startX;
    distY = e.pageY - startY;

    if (Math.abs(distX) > 50 && Math.abs(distY) < 100) {
        if (distX > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    }
    if (!isPaused) {
        startAutoSlide();
    }
});

carouselTrack.addEventListener('mouseleave', () => {
    if (!isPaused) {
        startAutoSlide();
    }
});