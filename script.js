//Typing Animation

const texts = ["Welcome", "Made by Me", "Link Start", "Sword Art Online"];
const speed = 150; // Typing speed in milliseconds
const pause = 1000; // Pause before switching to the next text
let textIndex = 0;
let charIndex = 0;

function typeText() {
    if (charIndex < texts[textIndex].length) {
        document.getElementById("typed-text").textContent += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, speed);
    } else {
        setTimeout(() => {
            eraseText();
        }, pause);
    }
}

function eraseText() {
    if (charIndex > 0) {
        document.getElementById("typed-text").textContent = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, speed);
    } else {
        textIndex = (textIndex + 1) % texts.length; // Move to the next text
        setTimeout(typeText, speed);
    }
}

// Start the typing effect
typeText();

//character card
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.chara-main', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true, // Enable looping
    });

    const charaListItems = document.querySelectorAll('.chara-list__item');

    // Handle thumbnail click
    charaListItems.forEach(item => {
        item.addEventListener('click', function () {
            const index = this.getAttribute('data-id');
            
            // Slide to the corresponding slide in Swiper
            swiper.slideToLoop(index);

            // Update active class on thumbnail
            document.querySelector('.js-current').classList.remove('js-current');
            this.classList.add('js-current');

            // Check if Kirito is selected and apply glow if necessary
            if (index === "0") {
                this.classList.add('glow');
            } else {
                document.querySelector('.glow')?.classList.remove('glow');
            }
        });
    });

    // Update thumbnail highlighting when Swiper changes slide
    swiper.on('slideChange', function () {
        const activeIndex = swiper.realIndex;

        // Remove 'js-current' class from previous and add to the new active thumbnail
        document.querySelector('.js-current').classList.remove('js-current');
        charaListItems[activeIndex].classList.add('js-current');

        // Add glow to Kirito's thumbnail (assuming Kirito is at index 0)
        if (activeIndex === 0) {
            charaListItems[activeIndex].classList.add('glow');
        } else {
            document.querySelector('.glow')?.classList.remove('glow');
        }
    });
});

//Movies
const movieLinks = document.querySelectorAll('.movie-list__link');
const modal = document.querySelector('.modal');
const iframe = document.getElementById('yt');
const closeBtn = document.querySelector('.modal-close');

movieLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const videoId = link.getAttribute('data-url'); // Get the video ID
        iframe.src = `https://www.youtube.com/embed/${videoId}`; // Set the iframe src
        modal.style.display = 'block'; // Show the modal
    });
});

closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'none'; // Hide the modal
    iframe.src = ''; // Clear the iframe src to stop the video
});