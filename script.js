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
const muteButton = document.getElementById('muteButton');

let slideIndex = 0;
let isMuted = false;

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
  fadeIn(backgroundMusic, 3000); // Fade in background music
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

// Fade In & Out for Audio
function fadeIn(audio, duration = 3000) {
  audio.volume = 0;
  audio.play();
  let step = 0.1;
  let interval = setInterval(() => {
    if (audio.volume < 0.7) {
      audio.volume = Math.min(audio.volume + step, 0.7);
    } else {
      clearInterval(interval);
    }
  }, duration / (0.7 / step));
}

function fadeOut(audio, duration = 3000) {
  let step = 0.1;
  let interval = setInterval(() => {
    if (audio.volume > 0) {
      audio.volume = Math.max(audio.volume - step, 0);
    } else {
      clearInterval(interval);
      audio.pause();
    }
  }, duration / (0.7 / step));
}

// Mute/Unmute Button Logic
muteButton.addEventListener('click', () => {
  if (isMuted) {
    backgroundMusic.muted = false;
    muteButton.textContent = "🔊";
  } else {
    backgroundMusic.muted = true;
    muteButton.textContent = "🔇";
  }
  isMuted = !isMuted;
});

// Optional: Fade out background music when user navigates away
window.addEventListener('beforeunload', () => fadeOut(backgroundMusic, 2000));
