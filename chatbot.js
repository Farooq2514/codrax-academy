(() => {
  const courses = window.CODRAX_COURSES || [];

  const money = (n) => '₹' + n.toLocaleString('en-IN');

  function reply(question) {
    const q = question.toLowerCase().trim();

    if (/project|hands.on/.test(q)) {
      return 'Codrax courses include hands-on projects so you can apply what you learn, build practical work, and explain your approach. Ask us for project details in your chosen course.';
    }

    if (/package|bundle|all course|combined|total/.test(q)) {
      return 'The complete seven-course package costs ₹27,999. Individual fees total ₹33,993, so you save ₹5,994. It includes three mentor-session credits per course (21 in total), weekend TA support, assignments, and monthly mocks. Call us for the sequence and schedule.';
    }

    if (/duration|months|weeks|how long|length|syllabus|curricul|topics/.test(q)) {
      return 'Please contact us for course length, the detailed curriculum, and the full learning plan. Call +91 70754 05512 or use the enquiry page to request the curriculum.';
    }

    if (/mentor|credit/.test(q)) {
      return 'Each course includes three complimentary mentor-session credits. The complete seven-course package includes 21 credits. Call us to confirm session length, booking arrangements, and credit validity. Weekend TA support is separate.';
    }

    if (/\bta\b|assistant|doubt|weekend/.test(q)) {
      return 'A personal teaching assistant supports you every weekend with doubts, assignment difficulties, and understanding mistakes. Contact us for individual support slots and booking arrangements.';
    }

    if (/mock|assess|test/.test(q)) {
      return 'Your learning includes a monthly mock assessment during the active programme to check understanding and identify areas to improve. Ask us about the format and schedule for your chosen course.';
    }

    if (/assignment|homework|practice/.test(q)) {
      return 'You receive an assignment after every class. Use the days between your three weekly live classes to practise. Your weekend TA helps with doubts and assignment difficulties.';
    }

    if (/time|schedule|days|batch|online|offline|location/.test(q)) {
      return 'All classes are online, three times each week, with assignments after each class and personal TA support at weekends. Call +91 70754 05512 for batch timings, teaching language, and the complete schedule.';
    }

    if (/refund|pay|installment/.test(q)) {
      return 'Please contact the academy for payment arrangements and get the applicable refund terms in writing before paying. This website does not collect payments.';
    }

    if (/\bai\b|artificial/.test(q)) {
      return 'I am a course FAQ assistant using prepared answers, not a generative AI chatbot. AI integration is not currently advertised as an included course. Contact the academy for curriculum updates.';
    }

    if (/demo|join|enrol|admission|contact|email/.test(q)) {
      return 'You can request a free demo or discuss admission on our enquiry page. It prepares an email for you to send to codestart9989@gmail.com. You can also call +91 70754 05512. Demo timing and admission are confirmed directly by the academy.';
    }

    const aliases = [
      ['spring', 'springboot'],
      ['html', 'html-css'],
      ['css', 'html-css'],
      ['git', 'git'],
      ['sql', 'sql'],
      ['dsa', 'dsa'],
      ['algorithm', 'dsa'],
      ['lld', 'lld'],
      ['design', 'lld'],
      ['java', 'java']
    ];

    const match = aliases.find(([word]) => q.includes(word));

    if (match) {
      const c = courses.find((x) => x.id === match[1]);
      return c
        ? c.name + ' costs ' + money(c.price) + '. The course includes three live online classes per week, assignments, weekend personal TA support, three mentor-session credits, and monthly mocks. Ask us for the detailed curriculum and schedule.'
        : 'Please contact us for current course information.';
    }

    if (/price|fee|cost|course/.test(q)) {
      return courses.map((c) => c.name + ': ' + money(c.price)).join('\n') +
        '\nAll seven individually: ₹33,993. Complete package: ₹27,999.';
    }

    if (/^(hi|hello|hey|salaam|assalam)/.test(q)) {
      return 'Hello! Welcome to Codrax Academy. Ask about fees, the complete package, classes, assignments, mentors, or weekend TA support.';
    }

    return 'I can help with Codrax courses, fees, package pricing, weekly classes, assignments, TA support, mentors, and monthly mocks. For other questions, call +91 70754 05512 or use the enquiry page.';
  }

  window.CodraxFAQ = { reply };

  const toggle = document.createElement('button');
  toggle.className = 'codrax-chat-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Open Codrax course assistant');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'codrax-chat');
  toggle.innerHTML =
    '<svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<path d="M20 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2v-10a8.5 8.5 0 0 1 17 0Z" stroke="currentColor" stroke-width="1.8"/>' +
    '<path d="M7 10h8M7 14h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
    '</svg><span>Ask Codrax</span>';

  const panel = document.createElement('section');
  panel.id = 'codrax-chat';
  panel.className = 'codrax-chat';
  panel.hidden = true;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'chat-title');
  panel.innerHTML =
    '<div class="codrax-chat-header">' +
    '<div><strong id="chat-title">Codrax Assistant</strong><small>Course & admission FAQs</small></div>' +
    '<button type="button" aria-label="Close course assistant">×</button>' +
    '</div>' +
    '<div class="codrax-chat-log" role="log" aria-live="polite" aria-relevant="additions"></div>' +
    '<div class="chat-quick">' +
    '<button type="button">Course fees</button>' +
    '<button type="button">Complete package</button>' +
    '<button type="button">TA support</button>' +
    '</div>' +
    '<a class="chat-contact" href="contact.html">Speak to the academy →</a>' +
    '<form class="codrax-chat-form">' +
    '<label class="sr-only" for="chat-question">Ask a course question</label>' +
    '<input id="chat-question" placeholder="Ask about courses or support…" maxlength="500" required autocomplete="off">' +
    '<button type="submit" aria-label="Send question">→</button>' +
    '</form>' +
    '<p class="chat-disclosure">Prepared FAQ answers · Chat is not saved</p>';

  document.body.append(toggle, panel);

  const input = panel.querySelector('input');
  const log = panel.querySelector('[role="log"]');

  function add(text, user = false) {
    const p = document.createElement('p');
    p.className = user ? 'chat-user-message' : 'chat-bot-message';
    p.textContent = text;
    log.append(p);
    log.scrollTop = log.scrollHeight;
  }

  function close() {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }

  toggle.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    toggle.setAttribute('aria-expanded', String(!panel.hidden));
    if (!panel.hidden) input.focus();
  });

  panel.querySelector('.codrax-chat-header button').addEventListener('click', close);

  panel.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  function ask(q) {
    if (!q.trim()) return;
    add(q, true);
    add(reply(q));
    input.value = '';
  }

  panel.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    ask(input.value);
  });

  panel.querySelectorAll('.chat-quick button').forEach((b) => {
    b.addEventListener('click', () => ask(b.textContent));
  });

  add('Welcome to Codrax Academy! Ask me about course fees, the complete package, mentor credits, or weekend TA support.');
})();