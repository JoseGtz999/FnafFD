const rotateWarning = document.getElementById("rotateWarning");
const menu = document.getElementById("menu");
const office = document.getElementById("office");
const startBtn = document.getElementById("startBtn");
const panorama = document.getElementById("panorama");
let leftDoorOpen = false;
let rightDoorOpen = false;

/* ================= ORIENTATION ================= */

function checkOrientation() {
  if (window.innerHeight > window.innerWidth) {
    rotateWarning.classList.add("active");
  } else {
    rotateWarning.classList.remove("active");
  }
}

checkOrientation();
window.addEventListener("resize", checkOrientation);

/* ================= FULLSCREEN ================= */

startBtn.addEventListener("click", () => {
  if (window.innerHeight > window.innerWidth) return;

  enterFullscreen();

  menu.classList.remove("active");
  office.classList.add("active");
});

function enterFullscreen() {
  const element = document.documentElement;

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

/* ================= MOVIMIENTO LATERAL ================= */

let targetX = 0;
let currentX = 0;
const maxMove = 20; // cuánto se puede mover hacia cada lado (%)

function updateMovement() {
  currentX += (targetX - currentX) * 0.08; // suavidad/inercia
  panorama.style.transform = `translateX(${currentX}%)`;
  requestAnimationFrame(updateMovement);
}

updateMovement();

/* ===== PC (Mouse) ===== */

document.addEventListener("mousemove", (e) => {
  if (!office.classList.contains("active")) return;

  const screenWidth = window.innerWidth;
  const percentage = e.clientX / screenWidth;
  targetX = -(percentage - 0.5) * maxMove;
});

/* ===== MÓVIL (Touch) ===== */

document.addEventListener("touchmove", (e) => {
  if (!office.classList.contains("active")) return;

  const touch = e.touches[0];
  const screenWidth = window.innerWidth;
  const percentage = touch.clientX / screenWidth;
  targetX = -(percentage - 0.5) * maxMove;
});

const backgrounds = {
  closed: "assets/office_closed.jpg",
  leftOpen: "assets/office_left_open.jpg",
  rightOpen: "assets/office_right_open.jpg",
  bothOpen: "assets/office_both_open.jpg"
};

function updateOfficeBackground() {
  if (!leftDoorOpen && !rightDoorOpen) {
    panorama.style.backgroundImage = `url(${backgrounds.closed})`;
  } 
  else if (leftDoorOpen && !rightDoorOpen) {
    panorama.style.backgroundImage = `url(${backgrounds.rightOpen})`;
  } 
  else if (!leftDoorOpen && rightDoorOpen) {
    panorama.style.backgroundImage = `url(${backgrounds.leftOpen})`;
  } 
  else {
    panorama.style.backgroundImage = `url(${backgrounds.bothOpen})`;
  }
}

const leftDoorBtn = document.querySelector(".door-btn.left");
const rightDoorBtn = document.querySelector(".door-btn.right");

leftDoorBtn.addEventListener("click", () => {
  leftDoorOpen = !leftDoorOpen;
  updateOfficeBackground();
});

rightDoorBtn.addEventListener("click", () => {
  rightDoorOpen = !rightDoorOpen;
  updateOfficeBackground();
});

updateOfficeBackground();