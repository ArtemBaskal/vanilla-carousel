const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const firstSlide = track.querySelector(".first-slide");
const lastSlide = track.querySelector(".last-slide");
const prevButton = document.querySelector(".carousel__button--left");
const nextButton = document.querySelector(".carousel__button--right");
const dotsNav = document.querySelector(".carousel__nav");
const firstDot = dotsNav.querySelector(".first-dot");
const lastDot = dotsNav.querySelector(".last-dot");
let intevalID,
  interval = 5000,
  timeout = 10000;

const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidesPosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

slides.forEach(setSlidesPosition);

const transformToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const moveToSlide = (moveTo, isTimer) => e => {
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  let toSlide, toDot;

  switch (moveTo) {
    case "prev": {
      toSlide = currentSlide.previousElementSibling || lastSlide;
      toDot = currentDot.previousElementSibling || lastDot;
      break;
    }
    case "next": {
      toSlide = currentSlide.nextElementSibling || firstSlide;
      toDot = currentDot.nextElementSibling || firstDot;
      break;
    }
    case "target": {
      toDot = e.target.closest("button");
      if (!toDot) return;
      toSlide = slides[dots.findIndex(dot => dot === toDot)];
      break;
    }
  }

  if (!isTimer) {
    clearInterval(intevalID);
    setTimeout(() => {
      clearInterval(intevalID);
      intevalID = setInterval(moveToSlide("next", true), interval);
    }, timeout);
  }

  transformToSlide(track, currentSlide, toSlide);
  updateDots(currentDot, toDot);
};

prevButton.addEventListener("click", moveToSlide("prev"));
nextButton.addEventListener("click", moveToSlide("next"));
dotsNav.addEventListener("click", e => moveToSlide("target")(e));

intevalID = setInterval(moveToSlide("next", true), interval);
