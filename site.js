const menu = document.querySelector('.menu-button');

menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  document.querySelector('#navigation').classList.toggle('open', open);
});

document.querySelectorAll('#navigation a').forEach((a) => {
  a.addEventListener('click', () => {
    menu.setAttribute('aria-expanded', 'false');
    document.querySelector('#navigation').classList.remove('open');
  });
});

document.querySelectorAll('[data-answer]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-answer]').forEach((b) => {
      b.classList.remove('selected');
      b.setAttribute('aria-pressed', 'false');
    });

    button.classList.add('selected');
    button.setAttribute('aria-pressed', 'true');

    const correct = button.dataset.answer === 'right';
    document.querySelector('#answer-feedback').textContent = correct
      ? 'Correct! Java prints 1, 2, and 3 on separate lines. After i becomes 4, i <= 3 is false, so the loop stops.'
      : 'Try again. The loop starts at 1 and includes 3. It stops before printing 4. Which option matches?';
  });
});

const form = document.querySelector('#enquiryForm');

if (form) {
  const params = new URLSearchParams(location.search);

  for (const key of ['course', 'intent']) {
    const el = form.elements.namedItem(key);
    const value = params.get(key);
    if (value && [...el.options].some((o) => o.value === value)) {
      el.value = value;
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const value = (name) => form.elements.namedItem(name).value.trim();
    const course = form.elements.namedItem('course').selectedOptions[0].text;
    const intent = form.elements.namedItem('intent').selectedOptions[0].text;

    const body = [
      'Request: ' + intent,
      'Name: ' + value('studentName'),
      'Email: ' + value('email'),
      'Phone: ' + value('phone'),
      'Stage: ' + value('year'),
      'Course: ' + course,
      'Message: ' + value('message')
    ].join('\n');

    const url = 'mailto:codestart9989@gmail.com'
      + '?subject=' + encodeURIComponent(intent + ' — ' + course)
      + '&body=' + encodeURIComponent(body);

    const fallback = document.querySelector('#emailFallback');
    fallback.href = url;
    fallback.hidden = false;

    document.querySelector('#formMessage').textContent =
      'Your enquiry is ready. Click Open prepared email below, then send it from your email app. Nothing has been submitted or saved here.';
  });
}