document.querySelectorAll(".grid img").forEach(img => {
    img.addEventListener("click", () => {
      alert("You clicked on: " + img.alt);
    });
  });
  
  // Starfield background
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5 + 0.2
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) star.y = 0;
  });
  requestAnimationFrame(animateStars);
}
animateStars();

const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-desc');


document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('#gallery .grid img'));
    if (!images.length) return; // nothing to do

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = lightbox.querySelector('.close');
    const prevBtn = lightbox.querySelector('.prev');
    const nextBtn = lightbox.querySelector('.next');
  
    let currentIndex = -1;
  
    function openLightbox(index) {
      currentIndex = index;
      const img = images[currentIndex];
    
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightboxTitle.textContent = img.dataset.title || '';
      lightboxDesc.textContent = img.dataset.desc || '';
    
      lightbox.classList.add('show');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    
  
    function closeLightbox() {
      lightbox.classList.remove('show');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      // clear src to release memory if you want
      // lightboxImg.src = '';
    }
  
    function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      const img = images[currentIndex];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightboxTitle.textContent = img.dataset.title || '';
      lightboxDesc.textContent = img.dataset.desc || '';
    }
    
    function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      const img = images[currentIndex];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightboxTitle.textContent = img.dataset.title || '';
      lightboxDesc.textContent = img.dataset.desc || '';
    }
    
    // attach click handlers
    images.forEach((img, idx) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => openLightbox(idx));
    });
  
    // close / navigation handlers
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  
    // click the backdrop to close (but not when clicking the image or controls)
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  
    // keyboard support
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('show')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  });
  