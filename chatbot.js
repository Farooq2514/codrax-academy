(() => {
  "use strict";

  if (document.getElementById("codrax-chat")) return;

  const courses = window.CODRAX_COURSES || [];
  const packageData = window.CODRAX_PACKAGE;
  const money = amount => "₹" + Number(amount).toLocaleString("en-IN");
  const contact = "Call +91 70754 05512 or email codestart9989@gmail.com.";

  function getCourse(id) {
    const resolved = window.CODRAX_COURSE_ALIASES?.[id] || id;
    return courses.find(course => course.id === resolved);
  }

  function findCourse(question) {
    const normalized = question.replace(/[^a-z0-9]+/g, " ").trim();
    const aliases = [
      ["java backend", "java"], ["backend", "backend"],
      ["spring boot", "springboot"], ["springboot", "springboot"],
      ["sql", "sql"], ["ai agents", "ai-agent"], ["ai agent", "ai-agent"],
      ["high level design", "hld"], ["hld", "hld"],
      ["low level design", "lld"], ["lld", "lld"],
      ["data structures", "dsa"], ["dsa", "dsa"],
      ["git", "git"], ["html", "html-css"], ["css", "html-css"]
    ];
    const alias = aliases.find(([name]) => (` ${normalized} `).includes(` ${name} `));
    if (alias) return getCourse(alias[1]);

    return courses.find(course => normalized.includes(course.id.replace(/-/g, " ")) ||
      course.name.toLowerCase().split(/[^a-z0-9]+/).some(word => word.length > 3 && normalized.includes(word)));
  }

  function packageReply() {
    return `${packageData.description}\n\n` +
      `Package fee: ${money(packageData.price)}.\n` +
      `The same four course paths cost ${money(packageData.individualOfferTotal)} ` +
      `at their listed launch fees when purchased separately.\n` +
      `Saving: ${money(packageData.savings)}.\n` +
      `Complimentary mentor credits are available with eligible learning paths. Ask the academy to confirm what applies to this package.\n\n` +
      "Git & GitHub is included inside Java Backend Development and counted once. " +
      "Confirm the course sequence and overall duration with the academy. " + contact;
  }

  function courseReply(course) {
    const mentor = course.mentorSessions
      ? "Complimentary mentor credits may be available with this learning path; confirm availability and booking with the academy."
      : "Ask the academy whether complimentary mentor credits are available with this course.";
    const topicHighlights = (course.highlights || []).join(", ");
    const fee = course.regularPrice
      ? `Regular fee ${money(course.regularPrice)} · launch fee ${money(course.price)}`
      : `Launch fee ${money(course.price)}`;
    return `${course.name}\n${fee} per student · ${course.duration}.\n\n` +
      `${course.summary}\n${mentor}\n\nSelected topic highlights:\n${topicHighlights}\n\n` +
      "Classes are live online three times a week, with an assignment after every class and weekend TA support. " +
      "Ask the academy to confirm the batch timetable and final outline. " + contact;
  }

  function reply(question) {
    const q = String(question).toLowerCase().trim();
    if (!q) return "Ask about course topics, durations, fees, AI, TA support, or mentor sessions.";

    if (/package|bundle|combined|all\s+(?:courses|programmes)|complete developer/.test(q)) {
      return packageReply();
    }

    if (/mentor|credit/.test(q)) {
      return "Complimentary mentor credits are available with eligible learning paths. Contact the academy to confirm whether credits apply to your selected course, and to ask about session length, booking and validity. Weekend teaching assistant support is separate.";
    }

    if (/teaching assistant|\bta\b|doubt|weekend/.test(q)) {
      return "Weekend teaching assistant support helps learners with doubts, assignment attempts and understanding errors. Contact the academy for current support hours and whether sessions are individual or group-based. " + contact;
    }

    if (/streak|attendance|dashboard/.test(q)) {
      return "The student dashboard is planned to help learners follow attendance and problem-solving streaks, assignment completion and progress. Contact the academy for current dashboard availability.";
    }

    if (/topic|syllabus|curriculum/.test(q)) {
      const course = findCourse(q);
      return course
        ? courseReply(course)
        : "The website shows selected topic highlights for Java Backend Development, DSA, LLD, Git & GitHub, HTML & CSS, HLD and AI & Agents. Tell me which course you mean, or contact the academy for the final learning plan.";
    }

    if (/class|live|schedule|timing|batch/.test(q)) {
      return "Classes are online three times each week, with an assignment after every class. Batch days, times, teaching language, recording access and total sessions should be confirmed with the academy before enrolment. " + contact;
    }

    if (/mock|assessment|test/.test(q)) {
      return "Monthly mock assessments are part of the learning support plan. Ask the academy about the mock format, topic coverage and feedback process.";
    }

    if (/assignment|practice|practise|hands.?on|project|implementation/.test(q)) {
      return "Assignments follow every class. The focus is to write and run your own code, test your solution and explain your approach. Weekend TA support is available for doubts. " + contact;
    }

    if (/duration|how long|length|months?|weeks?/.test(q)) {
      const course = findCourse(q);
      if (course) return `${course.name}: ${course.duration}. The exact batch dates and meeting schedule will be confirmed before enrolment.`;
      return "Java is 1 month, SQL is 15 days and Spring Boot is 1 month within the combined Java Backend Development course. LLD and HLD are 2 months each; AI & Agents is 21 days. DSA, Git & GitHub and HTML & CSS durations need confirmation. " + contact;
    }

    if (/price|fee|cost|how much|course/.test(q)) {
      const course = findCourse(q);
      if (course) return courseReply(course);
      const fees = courses.map(course => `${course.name}: ${money(course.price)}`).join("\n");
      return `${fees}\n\nComplete Developer Package: ${money(packageData.price)}. ` +
        "The package contains Java Backend Development, DSA, Low-Level Design and HTML & CSS. Git & GitHub is included in the backend batch.";
    }

    if (/artificial|\bai\b|agent|gpt|rag|prompt/.test(q)) {
      const aiCourse = getCourse("ai-agents");
      return `${aiCourse.name} is a separate ${aiCourse.duration} course at ${money(aiCourse.price)}. It covers the LLM landscape, prompt engineering, LLM tools, RAG, agents, n8n, Zapier, OpenClaw, multi-agent systems and AI debugging tools. The Java backend course also includes practice using GPT to assist with coding and checking generated suggestions.`;
    }

    if (/demo|join|enrol|admission|contact|email|phone|call/.test(q)) {
      return "Request a free demo through the enquiry page. The academy will contact you to agree a time and send the joining details. A request is not a confirmed booking until a time is agreed. " + contact;
    }

    if (/refund|payment|pay|installment/.test(q)) {
      return "Before paying, ask for the full payable amount, payment options, cancellation and refund terms in writing. This website does not take payments. " + contact;
    }

    if (/^(hi|hello|hey|assalam|salaam)\b/.test(q)) {
      return "Welcome to Codrax Academy. Ask about Java Backend, DSA, LLD, HLD, AI Agents, course fees, practical work or learning support.";
    }

    return "I can answer prepared FAQs about Codrax courses, topics, durations, fees, AI Agents, assignments, TA support and mentor sessions. For other questions, " + contact;
  }

  window.CodraxFAQ = { reply };

  const toggle = document.createElement("button");
  toggle.className = "codrax-chat-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Open Codrax course assistant");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "codrax-chat");
  toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v3M7 8h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3ZM2 12h2m16 0h2"/><circle cx="12" cy="3" r="1"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M9 17h6"/></svg><span>Ask Codrax</span>';

  const panel = document.createElement("section");
  panel.id = "codrax-chat";
  panel.className = "codrax-chat";
  panel.hidden = true;
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-labelledby", "chat-title");
  panel.innerHTML = `
    <div class="codrax-chat-header">
      <div><strong id="chat-title">Codrax Assistant</strong><small>Course and admissions FAQs</small></div>
      <button type="button" aria-label="Close course assistant">×</button>
    </div>
    <div class="codrax-chat-log" role="log" aria-live="polite" aria-relevant="additions"></div>
    <div class="chat-quick">
      <button type="button">Course fees</button>
      <button type="button">AI Agents course</button>
      <button type="button">Mentor sessions</button>
    </div>
    <a class="chat-contact" href="courses.html#package">Explore the complete package →</a>
    <a class="chat-contact" href="contact.html">Speak to the academy →</a>
    <form class="codrax-chat-form">
      <label class="sr-only" for="chat-question">Ask a course question</label>
      <input id="chat-question" placeholder="Ask about courses or support…" maxlength="500" required autocomplete="off">
      <button type="submit" aria-label="Send question">→</button>
    </form>
    <p class="chat-disclosure">Prepared FAQ answers · Chat is not saved</p>`;

  document.body.append(toggle, panel);
  const input = panel.querySelector("input");
  const log = panel.querySelector('[role="log"]');

  function add(text, user = false) {
    const message = document.createElement("p");
    message.className = user ? "chat-user-message" : "chat-bot-message";
    message.textContent = text;
    message.style.whiteSpace = "pre-wrap";
    log.append(message);
    log.scrollTop = log.scrollHeight;
  }

  function close() {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  }

  toggle.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    toggle.setAttribute("aria-expanded", String(!panel.hidden));
    if (!panel.hidden) input.focus();
  });

  panel.querySelector(".codrax-chat-header button").addEventListener("click", close);
  panel.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
  });

  function ask(text) {
    const question = text.trim();
    if (!question) return;
    add(question, true);
    add(reply(question));
    input.value = "";
    input.focus();
  }

  panel.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    ask(input.value);
  });

  panel.querySelectorAll(".chat-quick button").forEach(button => {
    button.addEventListener("click", () => ask(button.textContent));
  });

  add("Welcome to Codrax Academy. Ask about course fees, topics, HLD, AI Agents or the support included with your course.");
})();
