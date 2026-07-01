const projects = [
  {
    title: "The 2026 Notebook",
    category: "Live FIFA World Cup Prediction Platform",
    tags: ["web", "supabase"],
    stack: ["React", "Vite", "Supabase", "PostgreSQL"],
    image: "assets/images/project-2026-notebook.png",
    summary: "A World Cup 2026 PWA with official result tracking, what-if simulations, standings, brackets, prediction scoring, leaderboard, and community reveals.",
    highlights: [
      "Built a Supabase Cron and Edge Function pipeline that polls official data every minute.",
      "Validated all 104 fixtures, cached official results, and audited result corrections.",
      "Protected prediction access and scoring flows with Postgres RLS and server-side logic."
    ]
  },
  {
    title: "Hisaab",
    category: "Offline Group Expense Splitter",
    tags: ["mobile", "offline"],
    stack: ["Flutter", "Dart", "Hive", "Provider"],
    image: "assets/images/project-hisaab.png",
    summary: "An offline-first trip expense app with trip/member CRUD, selected-person splits, balances, and simplified settlement payments.",
    highlights: [
      "Implemented local Hive persistence with generated model adapters.",
      "Designed Material 3 theming, dark mode, and practical mobile CRUD flows.",
      "Added swipe-based edit/delete interactions and settlement simplification."
    ]
  },
  {
    title: "Moto Tracker",
    category: "Motorcycle Maintenance Companion",
    tags: ["mobile", "offline"],
    stack: ["Flutter", "Dart", "Isar", "Riverpod"],
    image: "assets/images/project-moto-tracker.png",
    summary: "A CG125 maintenance tracker for odometer readings, fuel logs, mileage, running costs, maintenance history, and service reminders.",
    highlights: [
      "Used Isar for local database persistence and Riverpod for dashboard updates.",
      "Built fuel, mileage, and cost calculations with chart-ready summaries.",
      "Added maintenance history, image attachment support, and notification foundations."
    ]
  },
  {
    title: "Personal Utility App",
    category: "Authenticated Productivity Toolkit",
    tags: ["mobile", "supabase"],
    stack: ["Flutter", "Supabase", "Provider"],
    image: "assets/images/project-utility-app.png",
    summary: "A multi-module authenticated toolkit with QR business cards, scanning, conversion tools, audio recording, uploads, and admin analytics.",
    highlights: [
      "Built Supabase authentication, password-reset deep links, and user/admin routing.",
      "Implemented QR business card CRUD, QR generation/scanning, and scan history.",
      "Added audio recording upload/playback and role-aware admin analytics."
    ]
  },
  {
    title: "CineMood",
    category: "Mood-Based Movie Recommendation App",
    tags: ["web"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "TMDB API"],
    image: "assets/images/project-cinemood.png",
    summary: "A responsive movie discovery app using mood filters, runtime/year/intensity preferences, search, details, trailers, ratings, and watch providers.",
    highlights: [
      "Added local watchlist, disliked/watched states, history, settings, and region preferences.",
      "Created shareable recommendation flows and theme switching.",
      "Connected search and detail views to API-driven movie data."
    ]
  }
];

const typedPhrases = [
  "deployment-ready web platforms.",
  "offline-first Flutter apps.",
  "secure Supabase products.",
  "clean interfaces with real logic."
];

const projectGrid = document.getElementById("projectGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const typedText = document.getElementById("typedText");
const projectDialog = document.getElementById("projectDialog");
const dialogClose = document.getElementById("dialogClose");
const badgeToast = document.getElementById("badgeToast");

function renderProjects(filter = "all") {
  const visibleProjects = filter === "all"
    ? projects
    : projects.filter((project) => project.tags.includes(filter));

  projectGrid.innerHTML = visibleProjects.map((project, index) => `
    <article class="project-card" data-tags="${project.tags.join(",")}">
      <div class="project-media">
        <img src="${project.image}" alt="Visual preview for ${project.title}" loading="eager">
      </div>
      <div class="project-content">
        <div class="project-meta">
          ${project.stack.slice(0, 4).map((item) => `<span>${item}</span>`).join("")}
        </div>
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
        <button type="button" data-project="${project.title}">Open build note</button>
      </div>
    </article>
  `).join("");
}

function openProject(title) {
  const project = projects.find((item) => item.title === title);
  if (!project) return;

  document.getElementById("dialogImage").src = project.image;
  document.getElementById("dialogImage").alt = `Detailed visual preview for ${project.title}`;
  document.getElementById("dialogMeta").textContent = `${project.category} / ${project.stack.join(" + ")}`;
  document.getElementById("dialogTitle").textContent = project.title;
  document.getElementById("dialogDescription").textContent = project.summary;
  document.getElementById("dialogHighlights").innerHTML = project.highlights
    .map((item) => `<li>${item}</li>`)
    .join("");

  if (typeof projectDialog.showModal === "function") {
    projectDialog.showModal();
  }
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
  themeLabel.textContent = theme === "dark" ? "Studio" : "Focus";
}

function startTypewriter() {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const phrase = typedPhrases[phraseIndex];
    typedText.textContent = phrase.slice(0, charIndex);

    if (!deleting && charIndex < phrase.length) {
      charIndex += 1;
      setTimeout(tick, 54);
      return;
    }

    if (!deleting && charIndex === phrase.length) {
      deleting = true;
      setTimeout(tick, 1250);
      return;
    }

    if (deleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(tick, 26);
      return;
    }

    deleting = false;
    phraseIndex = (phraseIndex + 1) % typedPhrases.length;
    setTimeout(tick, 220);
  }

  tick();
}

function showBadge() {
  badgeToast.classList.add("show");
  setTimeout(() => badgeToast.classList.remove("show"), 2600);
}

renderProjects();
startTypewriter();
setTheme(localStorage.getItem("portfolio-theme") || "light");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(next);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

projectGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-project]");
  if (!button) return;
  openProject(button.dataset.project);
});

dialogClose.addEventListener("click", () => projectDialog.close());

projectDialog.addEventListener("click", (event) => {
  const dialogBox = projectDialog.getBoundingClientRect();
  const clickedOutside = event.clientX < dialogBox.left ||
    event.clientX > dialogBox.right ||
    event.clientY < dialogBox.top ||
    event.clientY > dialogBox.bottom;

  if (clickedOutside) {
    projectDialog.close();
  }
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".section-observe").forEach((section) => sectionObserver.observe(section));

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const row = entry.target;
    row.style.setProperty("--target-width", `${row.dataset.percent}%`);
    row.classList.add("visible");
    skillObserver.unobserve(row);
  });
}, { threshold: 0.5 });

document.querySelectorAll(".skill-row").forEach((row) => skillObserver.observe(row));

const navSections = ["about", "skills", "projects", "contact"].map((id) => document.getElementById(id));
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
    if (link && entry.isIntersecting) {
      document.querySelectorAll(".nav-links a").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    }
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

navSections.forEach((section) => navObserver.observe(section));

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.getElementById("formMessage");
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const body = form.message.value.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  message.className = "form-message";

  if (!name || !validEmail || !body) {
    message.textContent = "Please enter your name, a valid email, and a message.";
    message.classList.add("error");
    return;
  }

  message.textContent = "Message validated. Please send it directly to muzzammilminhas5@gmail.com.";
  message.classList.add("success");
  form.reset();
});

document.getElementById("easterTrigger").addEventListener("click", showBadge);

const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let konamiIndex = 0;

window.addEventListener("keydown", (event) => {
  if (event.key === konami[konamiIndex]) {
    konamiIndex += 1;
    if (konamiIndex === konami.length) {
      showBadge();
      konamiIndex = 0;
    }
    return;
  }
  konamiIndex = 0;
});
