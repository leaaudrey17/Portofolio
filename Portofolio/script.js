// === MOBILE MENU TOGGLE ===
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

// Tutup mobile menu saat link diklik
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

// Tutup mobile menu saat klik di luar
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileMenu.classList.remove("active");
  }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Efek scroll header
let lastScroll = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  header.style.boxShadow =
    currentScroll > 100 ? "0 2px 8px rgba(0, 0, 0, 0.1)" : "none";
  lastScroll = currentScroll;
});

// Fade-in animation
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

document.querySelectorAll(".project-card, .organization-card, .skill-item").forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});


// === EMAILJS INTEGRATION ===

// ⚠️ Pastikan kamu sudah menambahkan CDN EmailJS di file HTML kamu:
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>

// Inisialisasi EmailJS (WAJIB)
emailjs.init({
  publicKey: "k3sBlnOqh_AjwvCWC", // ganti dengan public key milikmu
});

// Tangani pengiriman form
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault(); // 🚫 Mencegah reload halaman

  const submitBtn = contactForm.querySelector(".btn-submit");
  const originalText = submitBtn.textContent;

  // Tampilkan loading state
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  // Kirim via EmailJS
  emailjs.sendForm("service_ojjqe3r", "template_opivj4h", this)
    .then(() => {
      alert("✅ Message sent successfully!");
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    })
    .catch((error) => {
      console.error("❌ Failed to send email:", error);
      alert("❌ Failed to send message. Please try again.");
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
});
