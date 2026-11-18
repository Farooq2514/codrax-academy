(() => {
  "use strict";

  const form = document.getElementById("enquiryForm");
  if (!form) return;

  const status = document.getElementById("formMessage");
  const submitButton = form.querySelector('button[type="submit"]');
  const method = document.getElementById("method");
  const contact = document.getElementById("contact");
  const contactLabel = document.querySelector('label[for="contact"]');
  const courseSelect = document.getElementById("course");

  for (const course of window.CODRAX_OFFERINGS || window.CODRAX_COURSES || []) {
    const option = document.createElement("option");
    option.value = course.id;
    option.textContent = `${course.name} — ₹${Number(course.price).toLocaleString("en-IN")}`;
    courseSelect.append(option);
  }

  const requestedCourse = new URLSearchParams(location.search).get("course");
  const resolvedCourse = window.CODRAX_COURSE_ALIASES?.[requestedCourse] || requestedCourse;
  if ([...courseSelect.options].some(option => option.value === resolvedCourse)) {
    courseSelect.value = resolvedCourse;
  }

  method.addEventListener("change", () => {
    const useEmail = method.value === "email";
    contact.type = useEmail ? "email" : "tel";
    contact.autocomplete = useEmail ? "email" : "tel";
    contactLabel.textContent = useEmail ? "Email address" : "Phone number";
    contact.value = "";
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();
    status.className = "form-status";

    const endpoint = window.CODRAX_ENQUIRY_ENDPOINT ||
      (location.port === "8088" ? "/api/enquiries" : "");

    if (!endpoint) {
      status.textContent = "Online enquiries are not connected here. Please email codestart9989@gmail.com or call +91 70754 05512. Your request has not been sent.";
      return;
    }

    submitButton.disabled = true;
    status.textContent = "Sending your request…";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        signal: AbortSignal.timeout(15000)
      });
      const result = await response.json();
      if (!response.ok || !result.id) throw new Error("Request was not confirmed");

      status.textContent = `Your request was received (reference ${result.id}). The academy will contact you to discuss your goals and confirm demo availability. Your demo is not booked until a time is agreed.`;
      form.reset();
      method.dispatchEvent(new Event("change"));
      courseSelect.value = "unsure";
    } catch {
      status.textContent = "We could not confirm receipt. Please contact the academy before retrying if you may already have sent this request.";
    } finally {
      submitButton.disabled = false;
    }
  });
})();
