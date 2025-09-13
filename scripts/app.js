// Simple interactive features:
// - theme toggle (persisted in localStorage)
// - mobile menu toggle
// - smooth scrolling for nav links
// - project modal (reads data attributes)
// - basic contact form UX (prevent double-submit, show status)

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const yearEl = document.getElementById("year");
  const viewBtns = document.querySelectorAll(".viewBtn");
  const projectModal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const closeModal = document.getElementById("closeModal");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  // fill year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /**
   * savedTheme(theme) & themeToggle
   * - Updates CSS variables to match the selected theme
   * - Saves the choice to localStorage
   * - Changes the toggle button icon
   */
  // theme: check localStorage
  // ===== Theme Toggle =====
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === "dark" ? "🌞" : "🌙";
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const defaultTheme = prefersDark ? "dark" : "light";
    body.classList.add(defaultTheme);
    themeToggle.textContent = defaultTheme === "dark" ? "🌞" : "🌙";
  }

  themeToggle?.addEventListener("click", () => {
    const current = body.classList.contains("dark") ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    body.classList.remove("dark", "light");
    body.classList.add(next);
    localStorage.setItem("theme", next);
    themeToggle.textContent = next === "dark" ? "🌞" : "🌙";
  });

  // mobile menu
  menuBtn?.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // hide mobile menu if open
        navLinks.classList.remove("show");
      }
    });
  });

  // project modal handlers
  viewBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".project-card");
      const title = card.dataset.title || card.querySelector("h3")?.innerText;
      const desc = card.dataset.desc || "No description provided.";
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      projectModal.setAttribute("aria-hidden", "false");
    });
  });

  // modal close
  closeModal?.addEventListener("click", () => {
    projectModal.setAttribute("aria-hidden", "true");
  });

  /* Timeline reveal using IntersectionObserver */
  const timelineItems = document.querySelectorAll(".timeline-item");

  if ("IntersectionObserver" in window && timelineItems.length) {
    const tlObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            // unobserve if you want the animation only once
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    timelineItems.forEach((item) => tlObserver.observe(item));
  } else {
    // fallback: if browser doesn't support IntersectionObserver, show all
    timelineItems.forEach((i) => i.classList.add("in-view"));
  }

  // basic form UX & validation (for user feedback)
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    // disable form while sending
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    formStatus.textContent = "Sending…";

    const action = contactForm.action;
    const formData = new FormData(contactForm);

    fetch(action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          formStatus.textContent = "Message sent — thanks!";
          formStatus.style.color = "green";
          contactForm.reset();
        } else {
          formStatus.textContent =
            "Submission failed. Try emailing me directly.";
          formStatus.style.color = "red";
        }
      })
      .catch((err) => {
        console.error(err);
        formStatus.textContent = "Network error. Try again later.";
        formStatus.style.color = "red";
      })
      .finally(() => {
        submitBtn.disabled = false;
        setTimeout(() => {
          formStatus.textContent = "";
        }, 4000);
      });
  });
});

// References for JavaScript

// MDN — DOM Introduction
// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
// → Learned how to select elements and update content dynamically using querySelector and addEventListener.

// MDN — Element.scrollIntoView()
// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
// → Used for smooth scrolling when clicking navigation links.

// MDN — localStorage
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// → Used to store the user’s theme preference (light/dark) between sessions.

// MDN — Fetch API
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// also this web
// https://stackoverflow.com/questions/48841097/receive-and-process-json-using-fetch-api-in-javascript
// → Used to send form JSON data to an endpoint like Getform.

// MDN — FormData
// https://developer.mozilla.org/en-US/docs/Web/API/FormData
// → Used to easily create form data for submission via Fetch.

// Note: In addition to the mentioned sources,
// I also used code and ideas from my previous projects stored on my device (HTML, CSS, JS).
// These projects were never published before, but they helped me speed up the work
// and reuse some parts I had tried earlier.
