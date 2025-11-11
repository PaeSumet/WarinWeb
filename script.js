document.addEventListener("DOMContentLoaded", () => {
    console.log("หน้าเว็บโหลดเสร็จแล้ว!");
    document.getElementById("imageModal").style.display = "none";
});

const scrollContent = document.getElementById("scrollContent");
let pos = 0;
const speed = 0.5;

// คำนวณความสูงครึ่งหนึ่ง (เพราะเราซ้ำรูป 2 ชุด)
const boxHeight = 300;
const boxCount = 4; // จำนวนรูปภาพชุดเดียว
const loopHeight = boxHeight * boxCount;

function autoScroll() {
  pos -= speed;
  if (pos <= -loopHeight) {
    pos = 0; // กลับไปเริ่มที่ตำแหน่งบนสุด
  }
  scrollContent.style.top = pos + "px";
  requestAnimationFrame(autoScroll);
}

autoScroll();

//สถิติ//
let counted = false;

function animateCounter(element, target) {
  let count = 0;
  const speed = target / 50;

  const update = () => {
    if (count < target) {
      count += speed;
      element.innerText = Math.ceil(count).toLocaleString();
      requestAnimationFrame(update);
    } else {
      element.innerText = target.toLocaleString();
    }
  };
  update();
}

function handleScroll() {
  const section = document.querySelector('.section6');
  const top = section.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (!counted && top < windowHeight - 100) {
    document.querySelectorAll('.number').forEach(el => {
      animateCounter(el, +el.getAttribute('data-target'));
    });
    counted = true;
  }
}

window.addEventListener('scroll', handleScroll);

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  if (menu.style.left === "0px") {
    menu.style.left = "-250px";
  } else {
    menu.style.left = "0px";
  }
}

    // Function to initialize slider
document.querySelectorAll('.slider').forEach(initSlider);

function initSlider(slider) {
  const track = slider.querySelector('.track');
  const slides = slider.querySelectorAll('.slide');
  const slideWidth = slider.offsetWidth;
  let currentIndex = 1;
  let isDragging = false;
  let isTransitioning = false;
  let startX = 0;
  let deltaX = 0;
  let dragged = false;

  function setPosition(transition = true) {
    track.style.transition = transition ? 'transform 0.5s ease-in-out' : 'none';
    track.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
  }

  setPosition(false);

  track.addEventListener('transitionend', () => {
    isTransitioning = false;
    if (currentIndex >= slides.length - 1) {
      currentIndex = 1;
      setPosition(false);
    }
    if (currentIndex <= 0) {
      currentIndex = slides.length - 2;
      setPosition(false);
    }
  });

  function startDrag(x) {
    if (isTransitioning) return;
    isDragging = true;
    dragged = false;
    startX = x;
    track.style.transition = 'none';
  }

  function moveDrag(x) {
    if (!isDragging) return;
    deltaX = x - startX;
    if (Math.abs(deltaX) > 5) dragged = true;
    track.style.transform = `translateX(${(-slideWidth * currentIndex + deltaX)}px)`;
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    if (deltaX < -100) currentIndex++;
    else if (deltaX > 100) currentIndex--;
    setPosition(true);
  }

  // เมาส์
  slider.addEventListener('mousedown', e => startDrag(e.clientX));
  document.addEventListener('mousemove', e => moveDrag(e.clientX));
  document.addEventListener('mouseup', endDrag);

  // ทัช
  slider.addEventListener('touchstart', e => startDrag(e.touches[0].clientX));
  slider.addEventListener('touchmove', e => moveDrag(e.touches[0].clientX));
  slider.addEventListener('touchend', endDrag);

  // ปิด drag รูปและลิงก์
  slider.querySelectorAll('img, a').forEach(el => {
    el.draggable = false;
  });

  // ป้องกันลิงก์เปิดตอนลาก
  slider.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
      if (dragged) e.preventDefault();
    });
  });

  // สไลด์อัตโนมัติ
  setInterval(() => {
    if (!isDragging && !isTransitioning) {
      currentIndex++;
      isTransitioning = true;
      setPosition(true);
    }
  }, 3000);
}

//click for full image
function toggleImage(button) {
  const imageSection = button.parentElement.querySelector(".image-container");
  const isOpen = imageSection.style.maxHeight && imageSection.style.maxHeight !== "0px";

  if (isOpen) {
    imageSection.style.maxHeight = imageSection.scrollHeight + "px";
    imageSection.style.opacity = "0";
    setTimeout(() => {
      imageSection.style.maxHeight = "0";
      imageSection.style.padding = "0 10px";
    }, 10);
  } else {
    imageSection.style.maxHeight = imageSection.scrollHeight + "px";
    imageSection.style.opacity = "1";
    imageSection.style.padding = "10px";
  }
}

function showFullscreen(imgElement) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");

  modalImage.src = imgElement.src;
  modal.style.display = "flex";
}

function hideFullscreen() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
}

//scorll Right Left
const scrollBox = document.getElementById('menuScroll');

  function scrollLeft() {
    scrollBox.scrollBy({ left: -200, behavior: 'smooth' });
  }

  function scrollRight() {
    scrollBox.scrollBy({ left: 200, behavior: 'smooth' });
  }

  //Web Visit
  var counterContainer = document.querySelector(".website-counter");
var resetButton = document.querySelector("#reset");
var visitCount = localStorage.getItem("page_view");

// Check if page_view entry is present
if (visitCount) {
  visitCount = Number(visitCount) + 1;
  localStorage.setItem("page_view", visitCount);
} else {
  visitCount = 1;
  localStorage.setItem("page_view", 1);
}
counterContainer.innerHTML = visitCount;

// Adding onClick event listener
resetButton.addEventListener("click", () => {
  visitCount = 1;
  localStorage.setItem("page_view", 1);
  counterContainer.innerHTML = visitCount;
});

//DropDown SideBar
function openNav() {
  document.getElementById("mySidepanel").style.width = "300px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}