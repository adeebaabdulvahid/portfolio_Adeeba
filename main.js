// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) { navbar.classList.add("scrolled"); }
  else { navbar.classList.remove("scrolled"); }
  highlightNav();
});

// ===== MOBILE MENU =====
const navToggle = document.getElementById("nav-toggle");
const navLinksContainer = document.getElementById("nav-links");
navToggle.addEventListener("click", () => {
  navLinksContainer.classList.toggle("open");
});
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => navLinksContainer.classList.remove("open"));
});

// ===== ACTIVE NAV HIGHLIGHT =====
function highlightNav() {
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= 100) current = section.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) link.classList.add("active");
  });
}

// ===== PARTICLES CANVAS =====
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
const PARTICLE_COUNT = 70;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 2 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? "124,92,252" : "0,212,255";
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) { particles.push(new Particle()); }

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124,92,252,${0.12 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== TYPEWRITER =====
const phrases = [
  "Software Developer in Training",
  "Python & Flask Developer",
  "Data Analytics Enthusiast",
  "Power BI Dashboard Builder",
  "NASA Space Apps Award Winner",
  "IEEE Student Leader"
];
const typeEl = document.getElementById("typewriter-text");
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeWriter() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typeEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typeEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }
  let delay = isDeleting ? 50 : 90;
  if (!isDeleting && charIndex === current.length) {
    delay = 2000; isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 300;
  }
  setTimeout(typeWriter, delay);
}
typeWriter();

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(".glass-card, .section-header, .timeline-item, .lang-card");
revealEls.forEach((el, i) => {
  el.classList.add("reveal");
  if (i % 3 === 1) el.classList.add("reveal-delay-1");
  if (i % 3 === 2) el.classList.add("reveal-delay-2");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

revealEls.forEach(el => observer.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillBars = document.querySelectorAll(".skill-bar-fill");
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.dataset.width;
      setTimeout(() => { bar.style.width = width + "%"; }, 200);
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(bar => skillObserver.observe(bar));

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration) {
  let start = 0, step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); return; }
    el.textContent = Math.floor(start);
  }, 16);
}

const statNums = document.querySelectorAll(".stat-number");
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target, 1500);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));

// ===== CONTACT FORM =====
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("form-success");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = document.getElementById("form-submit-btn");
  btn.textContent = "Sending...";
  btn.disabled = true;
  setTimeout(() => {
    successMsg.hidden = false;
    form.reset();
    btn.textContent = "Send Message";
    btn.disabled = false;
    successMsg.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 1200);
});

// ===== VOLUNTEER CARD HOVER TILT =====
document.querySelectorAll(".volunteer-card, .project-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
