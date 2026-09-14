const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const setActiveLink = () => {
  const offset = window.scrollY + 140;
  let activeId = sections[0]?.id;

  sections.forEach((section) => {
    if (offset >= section.offsetTop) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle('is-active', isActive);
  });
};

window.addEventListener('scroll', setActiveLink);
setActiveLink();

const counters = [...document.querySelectorAll('[data-target]')];
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = Number(entry.target.dataset.target || '0');
      let value = 0;
      const step = Math.max(1, Math.ceil(target / 30));

      const timer = window.setInterval(() => {
        value += step;
        if (value >= target) {
          entry.target.textContent = String(target);
          window.clearInterval(timer);
          return;
        }
        entry.target.textContent = String(value);
      }, 25);

      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.45 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const chips = [...document.querySelectorAll('.chip')];
const projectCards = [...document.querySelectorAll('.project')];

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const filter = chip.dataset.filter;

    chips.forEach((item) => item.classList.remove('is-active'));
    chip.classList.add('is-active');

    projectCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !show);
    });
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
