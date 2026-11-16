(() => {
  "use strict";

  // Prevent duplicate widgets if the script is included twice.
  if (document.getElementById("codrax-chat")) return;

  const courses = window.CODRAX_COURSES || [];
  const packageData = window.CODRAX_PACKAGE;

  const individualTotal = courses.reduce(
    (total, course) => total + course.price,
    0
  );

  const packagePrice = packageData?.price ?? 16749;
  const saving = individualTotal - packagePrice;
  const mentorCredits = courses.length * 3;

  const money = amount =>
    "₹" + amount.toLocaleString("en-IN");

  const contact =
    "Call +91 70754 05512 or email codestart9989@gmail.com.";

  function packageReply() {
    if (courses.length !== 7) {
      return "Please contact us for the complete package and current fees. " +
        contact;
    }

    return (
      `The complete seven-course package costs ${money(packagePrice)}.\n\n` +
      `Individual offer fees total ${money(individualTotal)}.\n` +
      `You save ${money(saving)} — approximately 50%.\n\n` +
      `Includes ${mentorCredits} mentor-session credits across seven courses, ` +
      "three live online classes each week, assignments after every class, " +
      "weekend personal TA support, hands-on projects, and monthly mocks.\n\n" +
      "Contact us for the complete curriculum and schedule."
    );
  }

  function reply(question) {
    const q = String(question).toLowerCase().trim();

    if (!q) {
      return "Ask me about courses, fees, projects, or learning support.";
    }

    if (/\bpackage\b|\bbundle\b|all\s+(?:seven\s+|7\s+)?courses|combined|\btotal\b/.test(q)) {
      return packageReply();
    }

    if (/\bprojects?\b|hands[\s-]?on/.test(q)) {
      return (
        "Codrax courses include hands-on projects and practical work. " +
        "Apply what you learn, test your ideas, and explain your approach. " +
        "Contact us for project details for your chosen course."
      );
    }

    if (/duration|months?|weeks?|how long|length|syllabus|curricul|topics/.test(q)) {
      return (
        "Contact us for course length, the detailed curriculum, " +
        "and the complete learning plan. " + contact
      );
    }

    if (/mentor|credits?/.test(q)) {
      return (
        "Each course includes three complimentary mentor-session credits. " +
        "The seven-course package includes 21 credits in total. " +
        "Weekend TA support is separate.\n\n" +
        "Contact us to confirm mentor-session length, booking arrangements, " +
        "and credit validity."
      );
    }

    if (/\bta\b|teaching assistant|doubts?|weekend/.test(q)) {
      return (
        "Personal teaching assistant support is available every weekend " +
        "to help with doubts, assignment difficulties, and understanding " +
        "your mistakes. Contact us for support slots and arrangements."
      );
    }

    if (/\bmock\b|assessment|\btest\b/.test(q)) {
      return (
        "Monthly mock assessments help you check your understanding " +
        "and identify areas to improve during your active programme. " +
        "Contact us for the format and assessment schedule."
      );
    }

    if (/assignment|homework|practi[cs]e/.test(q)) {
      return (
        "You receive an assignment after every class. Use the time between " +
        "your three weekly classes to practise and improve your skills. " +
        "Your weekend TA can help with doubts and assignment difficulties."
      );
    }

    if (/timings?|\btime\b|schedule|days?|batch|online|offline|location/.test(q)) {
      return (
        "All classes are online, three times each week. Assignments follow " +
        "every class, with personal TA support at weekends. " +
        "Contact us for batch timings and teaching language. " + contact
      );
    }

    if (/refund|payment|\bpay\b|instal+ments?/.test(q)) {
      return (
        "Contact the academy for payment arrangements and get the applicable " +
        "refund conditions in writing before paying. " +
        "This website does not collect payments."
      );
    }

    if (/\bai\b|artificial intelligence/.test(q)) {
      return (
        "I am a course FAQ assistant using prepared answers. " +
        "AI integration is not currently listed as an included course. " +
        "Contact the academy for curriculum updates."
      );
    }

    if (/demo|join|enrol|admission|contact|email|\bphone\b|\bcall\b/.test(q)) {
      return (
        "Request a free demo or discuss admission through our enquiry page. " +
        "The form prepares an email that you must send from your email app. " +
        "Demo timing and admission are confirmed directly by the academy.\n\n" +
        contact
      );
    }

    const aliases = [
      [/\bspring(?:\s*boot)?\b|\bspringboot\b/, "springboot"],
      [/\bhtml\b|\bcss\b/, "html-css"],
      [/\bgit\b|\bgithub\b/, "git"],
      [/\bsql\b|database/, "sql"],
      [/\bdsa\b|data structures?|algorithms?/, "dsa"],
      [/\blld\b|low[\s-]?level design|\bdesign\b/, "lld"],
      [/\bjava\b/, "java"]
    ];

    const match = aliases.find(([pattern]) => pattern.test(q));

    if (match) {
      const course = courses.find(item => item.id === match[1]);

      if (!course) {
        return "Contact us for the latest course information. " + contact;
      }

      const regularFee = Number.isFinite(course.regularPrice)
        ? `Regular fee: ${money(course.regularPrice)}.\n`
        : "";

      return (
        `${course.name}\n\n` +
        regularFee +
        `Offer fee: ${money(course.price)}.\n\n` +
        "Includes three weekly live online classes, assignments, " +
        "weekend personal TA support, three mentor-session credits, " +
        "hands-on practical work, and monthly mocks.\n\n" +
        "Request the full curriculum and schedule through our enquiry page."
      );
    }

    if (/prices?|fees?|cost|courses?/.test(q)) {
      if (!courses.length) {
        return "Please contact us for current course fees. " + contact;
      }

      const fees = courses.map(course =>
        `${course.name}: ${money(course.price)}`
      ).join("\n");

      return (
        fees +
        `\n\nIndividual offer total: ${money(individualTotal)}.` +
        `\nComplete package: ${money(packagePrice)}.` +
        `\nPackage saving: ${money(saving)}.`
      );
    }

    if (/^(hi|hello|hey|salaam|assalam)\b/.test(q)) {
      return (
        "Welcome to Codrax Academy! Ask about course fees, " +
        "the complete package, projects, mentors, or weekend TA support."
      );
    }

    return (
      "I can help with Codrax courses, prices, the complete package, " +
      "projects, assignments, TA support, mentors, and monthly mocks.\n\n" +
      "For other questions, " + contact
    );
  }

  window.CodraxFAQ = { reply };

  const toggle = document.createElement("button");
  toggle.className = "codrax-chat-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Open Codrax course assistant");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "codrax-chat");

  toggle.innerHTML = `
    <svg width="28" height="28" viewBox="0 0 24 24"
         fill="none" aria-hidden="true">
      <path
        d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H6l-4 2V11.5a9.5 9.5 0 0 1 19 0Z"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linejoin="round">
      </path>
      <path d="M7 9h10M7 13h7"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round">
      </path>
    </svg>
    <span>Ask Codrax</span>
  `;

  const panel = document.createElement("section");
  panel.id = "codrax-chat";
  panel.className = "codrax-chat";
  panel.hidden = true;
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-labelledby", "chat-title");

  panel.innerHTML = `
    <div class="codrax-chat-header">
      <div>
        <strong id="chat-title">Codrax Assistant</strong>
        <small>Course &amp; admission FAQs</small>
      </div>
      <button type="button" aria-label="Close course assistant">×</button>
    </div>

    <div class="codrax-chat-log"
         role="log"
         aria-live="polite"
         aria-relevant="additions">
    </div>

    <div class="chat-quick">
      <button type="button">Course fees</button>
      <button type="button">Complete package</button>
      <button type="button">TA support</button>
    </div>

    <a class="chat-contact" href="courses.html#package">
      Explore the complete package →
    </a>

    <a class="chat-contact" href="contact.html">
      Speak to the academy →
    </a>

    <form class="codrax-chat-form">
      <label class="sr-only" for="chat-question">
        Ask a course question
      </label>
      <input id="chat-question"
             placeholder="Ask about courses or support…"
             maxlength="500"
             required
             autocomplete="off">
      <button type="submit" aria-label="Send question">→</button>
    </form>

    <p class="chat-disclosure">
      Prepared FAQ answers · Chat is not saved
    </p>
  `;

  document.body.append(toggle, panel);

  const input = panel.querySelector("input");
  const log = panel.querySelector('[role="log"]');

  function add(text, user = false) {
    const message = document.createElement("p");
    message.className = user
      ? "chat-user-message"
      : "chat-bot-message";

    message.textContent = text;
    message.style.whiteSpace = "pre-wrap";
    log.append(message);
    log.scrollTop = log.scrollHeight;
  }

  function closeChat() {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  }

  toggle.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    toggle.setAttribute("aria-expanded", String(!panel.hidden));

    if (!panel.hidden) input.focus();
  });

  panel.querySelector(".codrax-chat-header button")
    .addEventListener("click", closeChat);

  panel.addEventListener("keydown", event => {
    if (event.key === "Escape") closeChat();
  });

  function ask(question) {
    const text = question.trim();
    if (!text) return;

    add(text, true);
    add(reply(text));
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

  add(
    "Welcome to Codrax Academy! Ask me about course fees, " +
    "the complete package, hands-on projects, or learning support."
  );
})();