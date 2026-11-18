(() => {
  "use strict";

  const form = document.getElementById("enquiryForm");
  if (!form) return;

  const status = document.getElementById("formMessage");
  const fallback = document.getElementById("emailFallback");
  const courseSelect = document.getElementById("course");
  const academyEmail = "codestart9989@gmail.com";

  for (const course of window.CODRAX_OFFERINGS || window.CODRAX_COURSES || []) {
    const option = document.createElement("option");
    option.value = course.id;
    option.textContent = course.name;
    courseSelect.append(option);
  }

  const requestedCourse = new URLSearchParams(location.search).get("course");
  const resolvedCourse = window.CODRAX_COURSE_ALIASES?.[requestedCourse] || requestedCourse;
  if ([...courseSelect.options].some(option => option.value === resolvedCourse)) {
    courseSelect.value = resolvedCourse;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const selectedCourse = courseSelect.options[courseSelect.selectedIndex]?.textContent || "Help me choose";
    const subject = "Codrax Academy demo enquiry";
    const body = [
      "Hello Codrax Academy,",
      "",
      "I would like to request a free demo.",
      "",
      `Name: ${String(data.get("studentName")).trim()}`,
      `Phone: ${String(data.get("phone")).trim()}`,
      `Email: ${String(data.get("email")).trim()}`,
      `Course interest: ${selectedCourse}`
    ].join("\n");

    const mailto = `mailto:${academyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    fallback.href = mailto;
    fallback.hidden = false;
    status.className = "form-status";
    status.textContent = "Your email draft is ready. Review the details and press Send in your email app.";

    window.location.href = mailto;
  });
})();
