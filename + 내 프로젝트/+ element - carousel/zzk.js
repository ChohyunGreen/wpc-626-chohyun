document.addEventListener('DOMContentLoaded', () => {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const fractionDisplay = document.querySelector('.carousel-fraction');
    const playPauseButton = document.querySelector('.carousel-play-pause');

    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoSlideInterval;
    const autoSlideDelay = 3000; // 3초마다 자동 슬라이드
    let isPlaying = true;

    // Clone first/last slides for infinite loop effect
    // We clone 2-3 slides for a smoother infinite scroll with preview
    const cloneCount = 2; // Number of slides to clone from each end

    for (let i = 0; i < cloneCount; i++) {
        const firstClone = slides[i].cloneNode(true);
        const lastClone = slides[totalSlides - 1 - i].cloneNode(true);
        carouselWrapper.appendChild(firstClone);
        carouselWrapper.prepend(lastClone);
    }

    const allSlides = Array.from(document.querySelectorAll('.carousel-slide'));
    let slideWidth; // Will be calculated dynamically

    // Calculate initial position considering cloned slides
    function getSlideWidth() {
        // We need to calculate the actual width of a single slide taking into account padding and margins
        // For simplicity, we're assuming the slide width is effectively 1/3 of the wrapper width here
        // If your CSS changes, this calculation might need adjustment.
        // A more robust way would be to get the clientWidth of a single slide element.
        return allSlides[0].offsetWidth; // Use offsetWidth for actual rendered width including padding/border
    }

    function updateCarousel() {
        slideWidth = getSlideWidth();
        // Adjust currentIndex based on the cloned slides
        const targetIndex = currentIndex + cloneCount;
        carouselWrapper.style.transform = `translateX(${-targetIndex * slideWidth}px)`;
        updateFraction();
    }

    function goToSlide(index, smooth = true) {
        carouselWrapper.style.transition = smooth ? 'transform 0.5s ease-in-out' : 'none';
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex++;
        goToSlide(currentIndex);

        // Infinite loop logic: If we're on a cloned slide at the end, jump to the real start
        if (currentIndex >= totalSlides) {
            setTimeout(() => {
                goToSlide(0, false); // Jump to the real first slide (index 0) without transition
            }, 500); // Wait for the transition to finish before jumping
        }
    }

    function prevSlide() {
        currentIndex--;
        goToSlide(currentIndex);

        // Infinite loop logic: If we're on a cloned slide at the beginning, jump to the real end
        if (currentIndex < 0) {
            setTimeout(() => {
                goToSlide(totalSlides - 1, false); // Jump to the real last slide without transition
            }, 500); // Wait for the transition to finish before jumping
        }
    }

    function startAutoSlide() {
        if (isPlaying) {
            clearInterval(autoSlideInterval); // Clear existing interval to prevent duplicates
            autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
        }
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function togglePlayPause() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playPauseButton.textContent = '❚❚'; // Pause symbol
            startAutoSlide();
        } else {
            playPauseButton.textContent = '▶'; // Play symbol
            stopAutoSlide();
        }
    }

    function updateFraction() {
        // Modulo operator to handle infinite loop for display
        const displayedIndex = (currentIndex % totalSlides + totalSlides) % totalSlides;
        fractionDisplay.textContent = `${displayedIndex + 1} / ${totalSlides}`;
    }

    // Event Listeners
    prevButton.addEventListener('click', () => {
        stopAutoSlide(); // Stop auto-slide on manual interaction
        prevSlide();
        if (isPlaying) startAutoSlide(); // Restart if it was playing
    });

    nextButton.addEventListener('click', () => {
        stopAutoSlide(); // Stop auto-slide on manual interaction
        nextSlide();
        if (isPlaying) startAutoSlide(); // Restart if it was playing
    });

    playPauseButton.addEventListener('click', togglePlayPause);

    // Initial positioning: Start at the first real slide
    // We need to initially set the transform to show the first real slide,
    // which is at index `cloneCount` in `allSlides`.
    setTimeout(() => {
        goToSlide(0, false); // Initialize to the first real slide (index 0)
        startAutoSlide(); // Start auto-sliding after initial setup
    }, 0);


    // Drag functionality
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    carouselWrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        stopAutoSlide(); // Stop auto-slide when dragging starts
        carouselWrapper.classList.add('dragging');
        startPos = e.clientX;
        prevTranslate = -currentIndex * slideWidth;
        cancelAnimationFrame(animationID);
    });

    carouselWrapper.addEventListener('mouseup', () => {
        isDragging = false;
        carouselWrapper.classList.remove('dragging');
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -50 && currentIndex < totalSlides - 1) { // Moved significantly to the left (next slide)
            nextSlide();
        } else if (movedBy > 50 && currentIndex > 0) { // Moved significantly to the right (previous slide)
            prevSlide();
        } else {
            // Snap back to current slide if not moved enough
            goToSlide(currentIndex);
        }

        if (isPlaying) startAutoSlide(); // Restart auto-slide after drag ends
    });

    carouselWrapper.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            carouselWrapper.classList.remove('dragging');
            // Snap back if dragged out
            goToSlide(currentIndex);
            if (isPlaying) startAutoSlide();
        }
    });

    carouselWrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const currentPosition = e.clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
        carouselWrapper.style.transform = `translateX(${currentTranslate}px)`;
    });

    // Handle touch events for mobile
    carouselWrapper.addEventListener('touchstart', (e) => {
        isDragging = true;
        stopAutoSlide();
        carouselWrapper.classList.add('dragging');
        startPos = e.touches[0].clientX;
        prevTranslate = -currentIndex * slideWidth;
        cancelAnimationFrame(animationID);
    });

    carouselWrapper.addEventListener('touchend', () => {
        isDragging = false;
        carouselWrapper.classList.remove('dragging');
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -50 && currentIndex < totalSlides - 1) {
            nextSlide();
        } else if (movedBy > 50 && currentIndex > 0) {
            prevSlide();
        } else {
            goToSlide(currentIndex);
        }

        if (isPlaying) startAutoSlide();
    });

    carouselWrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentPosition = e.touches[0].clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
        carouselWrapper.style.transform = `translateX(${currentTranslate}px)`;
    });

    // Update carousel on window resize
    window.addEventListener('resize', () => {
        // Recalculate slide width and adjust position
        // This is crucial for responsiveness when slide width changes due to media queries
        slideWidth = getSlideWidth();
        goToSlide(currentIndex, false); // Jump to current slide without transition
    });

    // Initial setup
    updateCarousel();
});