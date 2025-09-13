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
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalLink = document.getElementById("modalLink");
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
  const savedTheme = localStorage.getItem("theme") || "light";
  body.classList.remove("light", "dark");
  body.classList.add(savedTheme);

  // for the color
  themeToggle?.addEventListener("click", () => {
    const current = body.classList.contains("dark") ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    body.classList.remove("dark", "light");
    body.classList.add(next);
    localStorage.setItem("theme", next);
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
    });
  });

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    // تحديث الأيقونة مع التغيير
    themeToggle.textContent = document.body.classList.contains("dark-theme")
      ? "🌞"
      : "🌙";
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
      modal.setAttribute("aria-hidden", "false");
    });
  });

  // modal link close
  modalLink?.addEventListener("click", (e) => {
    e.preventDefault();
    modal.setAttribute("aria-hidden", "true");
  });

  closeModal?.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "true");
  });

  // close modal on background click
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) modal.setAttribute("aria-hidden", "true");
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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      modal.setAttribute("aria-hidden", "true");
    }
  });

  // basic form UX & validation (for user feedback)
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    // simple front-end checks
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name.length < 2 || message.length < 10 || !email.includes("@")) {
      formStatus.textContent =
        "Please complete the form properly (name ≥2, message ≥10 chars).";
      return;
    }

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
          contactForm.reset();
        } else {
          formStatus.textContent =
            "Submission failed. Try emailing me directly.";
        }
      })
      .catch((err) => {
        console.error(err);
        formStatus.textContent = "Network error. Try again later.";
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
// → Used to send form data to an endpoint like Getform.

// MDN — FormData
// https://developer.mozilla.org/en-US/docs/Web/API/FormData
// → Used to easily create form data for submission via Fetch.
