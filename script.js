// Set year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const navTog = document.querySelector('.navbar-collapse.show');
      if (navTog) new bootstrap.Collapse(navTog).hide();
    }
  });
});

// Reveal on scroll using IntersectionObserver
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  }
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Project modal logic
const modal = new bootstrap.Modal(document.getElementById('projectModal'));
document.querySelectorAll('.project-card .view-project').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    const title = card.dataset.title;
    const desc = card.dataset.desc;
    const tech = card.dataset.tech;
    const link = card.dataset.link;

    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent = desc;
    document.getElementById('modalTech').textContent = tech;

    const modalLink = document.getElementById('modalLink');
    modalLink.href = link || '#';

    modal.show();
  });
});
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      card.querySelector('.view-project').click();
      e.preventDefault();
    }
  });
});

// Contact form handling (mailto)
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !message) {
    document.getElementById('formNote').textContent = 'Please fill all fields.';
    return;
  }
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(message + '\n\nFrom: ' + name);
  const mailto = `mailto:Onanefe879@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailto;
  document.getElementById('formNote').textContent = 'Opening your email client...';
});


// Navbar active-link on scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(n => n.classList.toggle('active', n.getAttribute('href') === ('#' + entry.target.id)));
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

// Scroll Reveal Animation
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const revealPoint = 120; // Adjust for earlier/later animation

      if (elementTop < windowHeight - revealPoint) {
        reveals[i].classList.add("active");
      }
    }
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Run on load
});

// Project Card Button Links
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      const link = card.getAttribute("data-link");
      if (link && link !== "#") {
        window.open(link, "_blank");
      }
    });
  });
});
