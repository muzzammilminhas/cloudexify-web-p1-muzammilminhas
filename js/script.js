const projects = [
  {
    title: "The 2026 Notebook",
    category: "Live FIFA World Cup Prediction Platform",
    tags: ["web", "supabase"],
    stack: ["React", "Vite", "Supabase", "PostgreSQL"],
    image: "assets/images/project-2026-notebook.png",
    repoUrl: "https://github.com/muzzammilminhas/the-2026-notebook",
    liveUrl: "https://muzzammilminhas.github.io/the-2026-notebook/",
    summary: "A live World Cup 2026 results, prediction, and what-if notebook with official tables, personal scenarios, scoring, leaderboard, and account-backed predictions.",
    highlights: [
      "README-backed feature set includes Actual, What If, Standings, Knockout, Leaderboard, Match Centre, Community Picks, Accounts, and Admin status.",
      "Built a Supabase Cron and Edge Function sync pipeline for official result updates.",
      "Protected prediction deadlines and scoring flows through server-side Supabase/Postgres logic."
    ]
  },
  {
    title: "Hisaab",
    category: "Offline Group Expense Splitter",
    tags: ["mobile", "offline"],
    stack: ["Flutter", "Dart", "Hive", "Provider"],
    image: "assets/images/project-hisaab.png",
    repoUrl: "https://github.com/muzzammilminhas/hisaab",
    summary: "An offline-first Flutter app for trip expenses, members, selected-person splits, balances, and simplified settlement payments.",
    highlights: [
      "README-backed features include trip/member CRUD, expense CRUD, per-person shares, member summaries, and simplified settlements.",
      "Implemented local Hive persistence with generated model adapters.",
      "Designed Material 3 light/dark UI with swipe actions for editing and deletion."
    ]
  },
  {
    title: "Moto Tracker",
    category: "Motorcycle Maintenance Companion",
    tags: ["mobile", "offline"],
    stack: ["Flutter", "Dart", "Isar", "Riverpod"],
    image: "assets/images/project-moto-tracker.png",
    repoUrl: "https://github.com/muzzammilminhas/moto-tracker",
    summary: "A dark mechanical CG125 companion app for odometer readings, fuel logs, running costs, mileage, maintenance history, and reminders.",
    highlights: [
      "README-backed features include dashboard stats, fuel logging, maintenance logging, next-service tracking, and alert foundations.",
      "Used Isar for local database persistence and Riverpod for reactive dashboard updates.",
      "Built mileage, cost, range, monthly expense, and service interval calculations."
    ]
  },
  {
    title: "Personal Utility App",
    category: "Authenticated Productivity Toolkit",
    tags: ["mobile", "supabase"],
    stack: ["Flutter", "Supabase", "Provider"],
    image: "assets/images/project-utility-app.png",
    repoUrl: "https://github.com/muzzammilminhas/personal_utility_app",
    summary: "A Supabase-authenticated productivity toolkit with QR business cards, scanning history, unit conversion, audio notes, and admin analytics.",
    highlights: [
      "README-backed features include Supabase Auth, user/admin routing, admin table access, and password reset deep links.",
      "Implemented QR card CRUD, QR generation/scanning, scan history, and unit conversion.",
      "Added private Supabase Storage audio upload/playback and admin activity dashboards."
    ]
  },
  {
    title: "CineMood",
    category: "Mood-Based Movie Recommendation App",
    tags: ["web"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "TMDB API"],
    image: "assets/images/project-cinemood.png",
    repoUrl: "https://github.com/muzzammilminhas/cinemood",
    summary: "A retro VHS-themed movie recommendation web app using mood filters, TMDB discovery, details, trailers, ratings, and watch providers.",
    highlights: [
      "README-backed features include mood-based recommendations, search, movie details, posters, trailers, and regional watch providers.",
      "Added local watchlist, disliked/watched states, watched history, and persisted preferences.",
      "Built responsive navigation, theme settings, sharing, and local data clearing flows."
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
        <div class="project-actions">
          <button type="button" data-project="${project.title}">Open build note</button>
          <a href="${project.repoUrl}" target="_blank" rel="noreferrer">GitHub</a>
          ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noreferrer">Live</a>` : ""}
        </div>
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
    .join("") + `<li><a href="${project.repoUrl}" target="_blank" rel="noreferrer">Read the source README on GitHub</a></li>`;

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
