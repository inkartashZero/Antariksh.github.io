const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const yearElement = document.getElementById("year");


// Update footer year
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// Sticky header border
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


// Mobile menu
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}


// Close mobile menu after clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});


// Smooth reveal on scroll
const revealElements = document.querySelectorAll(
  ".research-item, .timeline-item, .publication, .project-card"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1
  }
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
  observer.observe(element);
});


// Placeholder project links
const projectLinks = document.querySelectorAll(".project-link");

projectLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("href") === "#") {
      event.preventDefault();

      const message = link.dataset.placeholder;
      if (message) {
        alert(message);
      }
    }
  });
});
