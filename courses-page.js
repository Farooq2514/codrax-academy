(() => {
  "use strict";

  const money = amount => "₹" + Number(amount).toLocaleString("en-IN");

  function card(course, featured = false) {
    const highlight = course.highlights || course.modules?.[0]?.topics?.slice(0, 4) || [];
    const mentor = course.mentorSessions
      ? `<span><strong>Mentoring</strong>Complimentary credits available</span>`
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
    const courses = window.CODRAX_COURSES || [];
    const bundle = window.CODRAX_PACKAGE;

    // Course cards do not depend on package data being available.
    if (!main || !others || courses.length === 0) return;

    const javaCourse = courses.find(course => course.id === "java");
    if (javaCourse) main.innerHTML = card(javaCourse, true);

    others.innerHTML = courses
      .filter(course => course.id !== "java")
      .map(course => card(course))
      .join("");

    const packageSection = document.getElementById("package");
    if (!packageSection || !bundle) return;

    const description = packageSection.querySelector("[data-package-description]");
    const price = packageSection.querySelector("[data-package-price]");
    const saving = packageSection.querySelector("[data-package-saving]");
    const compare = packageSection.querySelector("[data-package-compare]");

    if (description) description.textContent = bundle.description;
    if (price) price.textContent = money(bundle.price);
    if (saving) saving.textContent = `Save ${money(bundle.savings)} · complimentary mentor credits available`;
    if (compare) {
      compare.textContent = `${money(bundle.individualOfferTotal)} when the same four courses are purchased separately at their listed offer fees.`;
    }
  }

  document.addEventListener("DOMContentLoaded", renderCatalog, { once: true });
})();
