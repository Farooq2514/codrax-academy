(() => {
  "use strict";

  const money = amount => "₹" + Number(amount).toLocaleString("en-IN");
  const courseById = id => window.CODRAX_COURSES.find(course => course.id === id);

  function card(course, featured = false) {
    const highlight = course.highlights || course.modules[0]?.topics.slice(0, 4) || [];
    const mentor = course.mentorSessions
      ? `<span><strong>Mentoring</strong>${course.mentorSessions} session${course.mentorSessions === 1 ? "" : "s"}</span>`
      : "";
    return `
      <article class="catalog-card ${featured ? "catalog-card-featured" : ""}">
        <span class="eyebrow">${featured ? "MAIN BATCH" : course.eyebrow}</span>
        <h3>${course.name}</h3>
        <p>${course.summary}</p>
        <div class="catalog-facts">
          <span><strong>Duration</strong>${course.duration}</span>
          <span><strong>Support</strong>Weekend TA · 3 live classes/week</span>
          ${mentor}
        </div>
        ${course.durationDetail ? `<p class="catalog-duration-detail">${course.durationDetail}</p>` : ""}
        <ul class="catalog-highlights">${highlight.map(topic => `<li>${topic}</li>`).join("")}</ul>
        <div class="individual-price">
          ${course.regularPrice ? `<span class="regular">Regular fee <del>${money(course.regularPrice)}</del></span>` : ""}
          <strong>${money(course.price)}</strong>
          <small>Launch fee per student</small>
        </div>
        <a class="text-link" href="${course.href}">Explore topics &amp; outcomes →</a>
      </article>`;
  }

  function renderCatalog() {
    const main = document.getElementById("main-course-card");
    const others = document.getElementById("course-catalog") || document.getElementById("home-course-grid");
    const bundle = window.CODRAX_PACKAGE;
    if (!main || !others || !bundle) return;

    main.innerHTML = card(courseById("java"), true);

    const excluded = ["java"];
    others.innerHTML = window.CODRAX_COURSES
      .filter(course => !excluded.includes(course.id))
      .map(course => card(course))
      .join("");

    const packageSection = document.getElementById("package");
    if (packageSection) {
      packageSection.querySelector("[data-package-description]").textContent = bundle.description;
      packageSection.querySelector("[data-package-price]").textContent = money(bundle.price);
      packageSection.querySelector("[data-package-saving]").textContent =
        `Save ${money(bundle.savings)} · 3 mentor sessions total`;
      packageSection.querySelector("[data-package-compare]").textContent =
        `${money(bundle.individualOfferTotal)} when the same four courses are purchased separately at their listed offer fees.`;
    }
  }

  document.addEventListener("DOMContentLoaded", renderCatalog, { once: true });
})();
