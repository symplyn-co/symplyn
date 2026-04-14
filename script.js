/* ================================================
   SYMPLYN — script.js  · Light Futuristic Edition
================================================ */

// ===== LOADER =====
;(function () {
  document.body.style.overflow = 'hidden';
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('hidden');
      document.body.style.overflow = '';
      // Trigger hero reveals after load
      setTimeout(triggerHeroReveal, 200);
    }, 2300);
  });
})();

// ===== HERO REVEAL =====
function triggerHeroReveal() {
  const heroEls = document.querySelectorAll('.hero .reveal');
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 120);
  });
}

// ===== CUSTOM CURSOR (desktop only) =====
;(function () {
  if (window.matchMedia('(hover: none)').matches) return;
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  ;(function loop() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  const hoverTargets = 'a, button, .service-card, .why-card, .portfolio-card, .channel-item, .process-step, .tag';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });

  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();

// ===== NAVBAR SCROLL STATE =====
;(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();


// ===== MOBILE MENU =====
;(function () {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  const nav  = document.getElementById('navbar'); // ✅ ADD THIS

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });

  document.querySelectorAll('.mob-link').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });

  document.addEventListener('click', e => {
    if (nav && !nav.contains(e.target)) { // ✅ SAFE CHECK
      btn.classList.remove('open');
      menu.classList.remove('open');
    }
  });
})();

// ===== SMOOTH SCROLL with navbar offset =====
;(function () {
  const navH = () => parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - navH() + 90;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ===== ACTIVE NAV LINK on scroll =====
;(function () {
  const sections  = [...document.querySelectorAll('section[id]')];
  const navLinks  = document.querySelectorAll('.nav-links a');
  const navH      = () => parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;

  const update = () => {
    const scrollY = window.scrollY + navH() + 40;
    let current = '';

    for (const s of sections) {
      if (scrollY >= s.offsetTop) current = s.id;
    }

    navLinks.forEach(a => {
      const matches = a.getAttribute('href') === '#' + current;
      a.classList.toggle('active', matches);
    });
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ===== SCROLL REVEAL =====
;(function () {
  const els = document.querySelectorAll('.reveal:not(.hero .reveal)');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
})();

// ===== CARD TILT (desktop) =====
;(function () {
  if (window.matchMedia('(hover: none)').matches) return;
  const tiltCards = document.querySelectorAll('.portfolio-card.featured, .service-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const x  = e.clientX - r.left;
      const y  = e.clientY - r.top;
      const cx = r.width / 2;
      const cy = r.height / 2;
      const rx = ((y - cy) / cy) * -3;
      const ry = ((x - cx) / cx) * 3;
      card.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      card.style.transition = 'transform 0.08s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.38s cubic-bezier(0.22,1,0.36,1)';
    });
  });
})();

// ===== ANIMATED COUNTER on hero stats =====
;(function () {
  // Pure CSS-driven, no JS needed — left as stub
})();

// ===== CONTACT FORM =====
;(function () {
  const form      = document.getElementById('contactForm');
  const formMsg   = document.getElementById('formMsg');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    formMsg.textContent = '';
    formMsg.className = 'form-msg';

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      formMsg.textContent = 'Please fill in all fields.';
      formMsg.className = 'form-msg error';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formMsg.textContent = 'Please enter a valid email address.';
      formMsg.className = 'form-msg error';
      return;
    }

    const btnText = submitBtn.querySelector('.btn-text');
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    await new Promise(r => setTimeout(r, 1400));

    window.location.href =
      `mailto:parvmer32@gmail.com?...`;

    // formMsg.textContent = '✓ Opening your email client...';
    formMsg.className = 'form-msg success';

    form.reset();
    btnText.textContent = 'Send Message';
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
  });
})();

// ===== PARALLAX: subtle background orb movement =====
;(function () {
  if (window.matchMedia('(hover: none)').matches) return;
  const orbs = document.querySelectorAll('.hero-orb');
  if (!orbs.length) return;

  document.addEventListener('mousemove', e => {
    const px = (e.clientX / window.innerWidth  - 0.5) * 22;
    const py = (e.clientY / window.innerHeight - 0.5) * 18;
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 0.4;
      orb.style.transform = `translate(${px * factor}px, ${py * factor}px)`;
    });
  });
})();

// ===== PAGE TRANSITION =====
(function () {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });
})();

// ===== EMAILJS INIT =====
(function () {
  emailjs.init("V7bGvnNGX0krGo7ql");
})();

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");

if (contactForm && submitBtn) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.querySelector(".btn-text").innerText = "Sending...";

    emailjs.sendForm("service_74fw2mo", "template_5ojfi5r", this)
      .then(() => {

       Swal.fire({
  title: "Message Sent.",
  text: "I’ll get back to you soon.",
  icon: "success",
  confirmButtonText: "Got it",

  background: "#FAF9F6",
  color: "#1A1A1A",

  confirmButtonColor: "#6C63FF",

  backdrop: "rgba(0,0,0,0.5)",

  customClass: {
    popup: "symplyn-popup",
    confirmButton: "symplyn-btn"
  }
});

        contactForm.reset();
        submitBtn.querySelector(".btn-text").innerText = "Send Message";
        submitBtn.disabled = false;
      })
      .catch((err) => {
        console.error(err);

        Swal.fire({
          title: "Failed",
          text: "Try again.",
          icon: "error",
          confirmButtonColor: "#6C63FF"
        });

        submitBtn.querySelector(".btn-text").innerText = "Send Message";
        submitBtn.disabled = false;
      });
  });
}