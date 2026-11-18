(() => {
  "use strict";

  const money = value => "₹" + Number(value).toLocaleString("en-IN");

  function renderCoursePage() {
    const root = document.getElementById("course-root");
    if (!root) return;

    const filename = location.pathname.split("/").pop();
    const match = filename.match(/^course-(.+)\.html$/);
    const requestedId = match ? match[1] : "";
    const alias = window.CODRAX_COURSE_ALIASES?.[requestedId];
    const id = alias || requestedId;
    const course = window.CODRAX_COURSES?.find(item => item.id === id);

    if (!course) {
      root.innerHTML = `
        <section class="wrap page-intro">
          <h1>Course page coming soon</h1>
          <p>Explore the course catalogue for available courses and fees.</p>
          <a class="button" href="courses.html">Explore courses</a>
        </section>`;
      return;
    }

    document.title = course.name + " | Codrax Academy";
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = `${course.summary} ${course.duration}.`;

    const topicHighlights = (course.highlights || [])
      .map(topic => `<li>${topic}</li>`)
      .join("");

    const mentorDetail = course.mentorSessions > 0
      ? `<div><dt>Mentoring</dt><dd>Complimentary credits available</dd></div>`
      : "";

    const aliasMessage = alias
      ? `<p class="course-alias-note">${requestedId === "sql" ? "SQL" : "Spring Boot"} is taught as part of Java Backend Development. <a href="course-java.html">View the combined course →</a></p>`
      : "";

    const packageOffer = !["hld", "ai-agents"].includes(course.id)
      ? `<div class="bundle-nudge">
          <span class="eyebrow">COMPLETE DEVELOPER PACKAGE</span>
          <h3>Combine four course paths.</h3>
          <p>${window.CODRAX_PACKAGE.description}</p>
          <strong class="bundle-price">${money(window.CODRAX_PACKAGE.price)}</strong>
          <p>Save ${money(window.CODRAX_PACKAGE.savings)} against the four listed offer fees.</p>
          <a class="text-link" href="courses.html#package">Explore the package →</a>
        </div>`
      : "";

    root.innerHTML = `
      <section class="wrap course-heading cx-course-heading">
        <a class="breadcrumb" href="courses.html">← All courses</a>
        <span class="eyebrow">${course.eyebrow}</span>
        <h1>${course.name}</h1>
        <p>${course.summary}</p>
        ${aliasMessage}
        <div class="cx-course-facts">
          <span><strong>Duration</strong>${course.duration}</span>
          <span><strong>Format</strong>Live online · 3 classes/week</span>
          <span><strong>Assignments</strong>After every class</span>
          <span><strong>Support</strong>Weekend TA support</span>
        </div>
        ${course.durationDetail ? `<p class="cx-duration-detail">${course.durationDetail}</p>` : ""}
      </section>

      <section class="wrap cx-course-layout">
        <div>
          <section class="cx-course-outcomes">
            <span class="eyebrow">WHAT YOU CAN WORK TOWARDS</span>
            <h2>Build skills you can demonstrate.</h2>
            <ul class="learning-outcomes">
              ${course.outcomes.map(outcome => `<li>${outcome}</li>`).join("")}
            </ul>
            <p class="cx-prerequisite"><strong>Best suited for:</strong> ${course.level}.</p>
          </section>

          <section class="cx-syllabus">
            <span class="eyebrow">SELECTED TOPICS</span>
            <h2>What you’ll work on.</h2>
            <p>These are topic highlights, not the complete syllabus. Confirm the final teaching plan before enrolment.</p>
            <ul class="cx-topic-highlights">${topicHighlights}</ul>
          </section>

          <section class="cx-course-practice">
            <h2>Learn it by building.</h2>
            <p>Use each class to understand a concept and implement it yourself in the assignment. Weekend teaching assistant support helps you work through doubts and errors.</p>
            <p>Monthly mock assessments and the student dashboard’s attendance and problem-solving streaks are designed to encourage regular practice.</p>
          </section>
        </div>

        <aside class="enrol-card cx-enrol-card">
          <span class="eyebrow">COURSE FEES</span>
          ${course.regularPrice ? `<p class="course-regular-fee">Regular fee <del>${money(course.regularPrice)}</del></p>` : ""}
          <div class="price">${money(course.price)}</div>
          <p class="course-offer-label">Launch fee per student</p>
          <dl>
            <div><dt>Duration</dt><dd>${course.duration}</dd></div>
            <div><dt>Classes</dt><dd>3 per week</dd></div>
            <div><dt>Delivery</dt><dd>Online</dd></div>
            <div><dt>TA support</dt><dd>Weekend</dd></div>
            ${mentorDetail}
          </dl>
          <a class="button" href="contact.html?course=${encodeURIComponent(course.id)}&amp;intent=demo">Request a free demo →</a>
          <p class="small-text">Batch dates, class timings, session length and teaching language will be confirmed before enrolment.</p>
          ${packageOffer}
        </aside>
      </section>`;
  }

  document.addEventListener("DOMContentLoaded", renderCoursePage, { once: true });
})();
