const passwordModal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput');
const passwordSubmit = document.getElementById('passwordSubmit');
const errorMsg = document.getElementById('errorMsg');
const content = document.getElementById('content');
const startBtn = document.getElementById('startBtn');
const balloons = document.getElementById('balloons');
const countdown = document.querySelector('.countdown');
const message = document.querySelector('.message');
const gallery = document.querySelector('.gallery');
const timer = document.getElementById('timer');
const birthdaySound = document.getElementById('birthdaySound');
const backgroundMusic = document.getElementById('backgroundMusic');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let slideIndex = 0;

// Password Check
passwordSubmit.addEventListener('click', () => {
  if (passwordInput.value === '1998/05/25') {
    passwordModal.style.display = 'none';
    content.classList.remove('hidden');
  } else {
    errorMsg.textContent = "Access denied. Please contact the page owner.";
  }
});

// Start Button Logic
startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  countdown.classList.remove('hidden');
  let count = 0;
  const age = new Date().getFullYear() - 1998;
  const interval = setInterval(() => {
    count++;
    timer.textContent = count;
    if (count === age) {
      clearInterval(interval);
      showBirthday();
    }
  }, 500);
});

function showBirthday() {
  confetti(); // Show confetti
  birthdaySound.play();
  backgroundMusic.play();
  balloons.classList.remove('hidden');
  message.classList.remove('hidden');
  gallery.classList.remove('hidden');
  showSlide(slideIndex);
}

// Slideshow Logic
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = (i === index) ? 'block' : 'none';
  });
}

prevBtn.addEventListener('click', () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
});

nextBtn.addEventListener('click', () => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
});
