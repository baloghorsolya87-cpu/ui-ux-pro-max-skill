/* ═══════════════════════════════════════════
   Luxury UGC Creator — Interactions
═══════════════════════════════════════════ */

// ── Nav scroll state ──────────────────────
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Mobile menu ───────────────────────────
const burger      = document.querySelector('.nav-burger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu(open) {
  const isOpen = open ?? mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open', !isOpen);
  mobileMenu.setAttribute('aria-hidden', String(isOpen));
  burger.setAttribute('aria-expanded', String(!isOpen));
  document.body.style.overflow = isOpen ? '' : 'hidden';

  // Animate burger into X
  const spans = burger.querySelectorAll('span');
  if (!isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(4.5px, 4.5px)';
    spans[1].style.transform = 'rotate(-45deg) translate(4.5px, -4.5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  }
}

burger.addEventListener('click', () => toggleMenu());

mobileLinks.forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
    toggleMenu(false);
    burger.focus();
  }
});

// ── Portfolio filter ──────────────────────
const filterBtns   = document.querySelectorAll('.filter-btn');
const portfolioGrid = document.getElementById('portfolioGrid');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // Update active state + aria
    filterBtns.forEach(b => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-selected', String(b === btn));
    });

    // Filter items
    portfolioGrid.querySelectorAll('.portfolio-item').forEach(item => {
      const categories = item.dataset.category || '';
      const visible = filter === 'all' || categories.includes(filter);
      item.classList.toggle('hidden', !visible);
    });
  });
});

// ── FAQ accordion ─────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const answerId = btn.getAttribute('aria-controls');
    const answer   = document.getElementById(answerId);

    // Close all others
    document.querySelectorAll('.faq-question').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        const otherId = other.getAttribute('aria-controls');
        document.getElementById(otherId)?.setAttribute('hidden', '');
      }
    });

    // Toggle this one
    btn.setAttribute('aria-expanded', String(!expanded));
    if (expanded) {
      answer.setAttribute('hidden', '');
    } else {
      answer.removeAttribute('hidden');
    }
  });
});

// ── Contact form ──────────────────────────
const form        = document.querySelector('.contact-form');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Basic HTML5 validation
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Simulate async submission
    submitBtn.disabled = true;
    const btnSpan = submitBtn.querySelector('span');
    btnSpan.textContent = 'Sending…';

    await new Promise(r => setTimeout(r, 1600));

    form.style.display  = 'none';
    formSuccess.hidden  = false;
  });
}

// ── Scroll reveal ─────────────────────────
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Attach data-reveal to major section children
const revealTargets = [
  '.section-header',
  '.service-card',
  '.portfolio-item',
  '.process-step',
  '.testimonial-card',
  '.about-visual',
  '.about-text',
  '.faq-item',
  '.contact-text',
  '.contact-form',
];

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    if (i > 0 && i <= 4) {
      el.setAttribute('data-reveal-delay', String(i));
    }
    revealObserver.observe(el);
  });
});

// ── Active nav link on scroll ─────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
          if (link.classList.contains('active')) {
            link.style.color = 'var(--color-text)';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));
