(() => {
  "use strict";

  const courses = {
    java: {
      name: "Java — Programming Foundations",
      eyebrow: "YOUR PROGRAMMING JOURNEY STARTS HERE",
      regular: 9999,
      offer: 5999,
      introduction:
        "Go from your first line of code to programs you can build, understand, and explain.",
      outcomeHeading: "Start thinking like a programmer.",
      outcomes: [
        "Write Java programs with confidence.",
        "Break a problem into clear, manageable steps.",
        "Organise your code so it is easier to understand and improve.",
        "Find mistakes and explain how your solution works.",
        "Apply your learning through practical assignments and projects."
      ],
      prerequisite:
        "No prior coding experience required. You need a laptop or desktop, an internet connection, and time to practise."
    },

    sql: {
      name: "SQL & Database Fundamentals",
      eyebrow: "MAKE DATA WORK FOR YOU",
      regular: 6999,
      offer: 3499,
      introduction:
        "Learn to turn stored information into useful answers and build confidence working with application data.",
      outcomeHeading: "Find answers in your data.",
      outcomes: [
        "Write queries that answer practical questions.",
        "Understand how information connects across a database.",
        "Organise data clearly for an application.",
        "Check your results and explain your approach.",
        "Apply your skills to a practical database project."
      ],
      prerequisite:
        "Basic computer skills are enough to begin. No previous SQL experience is required."
    },

    springboot: {
      name: "Spring Boot & REST API Development",
      eyebrow: "TURN YOUR JAVA SKILLS INTO APPLICATIONS",
      regular: 12499,
      offer: 5499,
      introduction:
        "Move beyond standalone programs and build backend applications that connect data, features, and users.",
      outcomeHeading: "Build a backend you can explain.",
      outcomes: [
        "Build application features through backend APIs.",
        "Connect your application to a database.",
        "Handle requests and errors with clear application behaviour.",
        "Test, secure, and deploy your backend project.",
        "Explain your project decisions and demonstrate working features."
      ],
      prerequisite:
        "You should be comfortable with Java, object-oriented programming, and basic SQL."
    },

    "html-css": {
      name: "HTML & CSS",
      eyebrow: "BRING YOUR IDEAS TO THE BROWSER",
      regular: 4999,
      offer: 2999,
      introduction:
        "Create a website of your own and learn to make it clear, attractive, and usable across different screens.",
      outcomeHeading: "Build something people can visit.",
      outcomes: [
        "Create clear, well-structured web pages.",
        "Give your pages a consistent visual style.",
        "Build layouts that adapt to phones and laptops.",
        "Improve readability, spacing, and ease of navigation.",
        "Publish a complete website you have built yourself."
      ],
      prerequisite:
        "Basic computer skills are enough. No previous web development experience is required."
    },

    git: {
      name: "Git & GitHub",
      eyebrow: "BUILD CONFIDENCE WORKING WITH CODE",
      regular: 3999,
      offer: 1999,
      introduction:
        "Keep your projects organised, collaborate with others, and share work that shows your progress.",
      outcomeHeading: "Make your work easier to manage.",
      outcomes: [
        "Track project changes and return to earlier versions.",
        "Work on changes separately and combine them carefully.",
        "Share your projects through GitHub.",
        "Review and discuss changes with collaborators.",
        "Build a project history that shows how your work develops."
      ],
      prerequisite:
        "Basic familiarity with files, folders, and a code editor will help you get started."
    },

    dsa: {
      name: "Data Structures & Algorithms",
      eyebrow: "BUILD A STRONGER PROBLEM-SOLVING APPROACH",
      regular: 11999,
      offer: 7999,
      introduction:
        "Learn to approach challenging problems with a plan, develop efficient solutions, and explain your reasoning clearly.",
      outcomeHeading: "Understand the problem. Own the solution.",
      outcomes: [
        "Break difficult problems into smaller steps.",
        "Choose an approach that fits the problem.",
        "Evaluate the time and memory your solution needs.",
        "Explain your reasoning and compare alternative solutions.",
        "Practise solving problems under timed conditions."
      ],
      prerequisite:
        "You should be comfortable writing basic Java programs and using methods, loops, arrays, and strings."
    },

    lld: {
      name: "Low-Level Design",
      eyebrow: "DESIGN SOFTWARE WITH PURPOSE",
      regular: 8999,
      offer: 5499,
      introduction:
        "Turn requirements into clear software designs and learn to explain how the pieces work together.",
      outcomeHeading: "Build clarity into your design.",
      outcomes: [
        "Translate requirements into clear responsibilities.",
        "Organise code so it is easier to maintain and extend.",
        "Explain design decisions through clear diagrams.",
        "Approach design discussions and interview questions step by step.",
        "Develop practical designs for systems such as booking or parking applications."
      ],
      prerequisite:
        "You should be comfortable with Java, object-oriented programming, and basic application development."
    }
  };

  const filename = location.pathname.split("/").pop();
  const match = filename.match(/^course-(.+)\.html$/);
  const id = match ? match[1] : "";
  const course = courses[id];
  const root = document.getElementById("course-root");

  if (!root) return;

  if (!course) {
    root.innerHTML = `
      <section class="wrap page-intro">
        <h1>Find your next course.</h1>
        <p>Please open a course from our course catalogue.</p>
        <a class="button" href="courses.html">Explore courses →</a>
      </section>
    `;
    return;
  }

  const money = amount =>
    "₹" + amount.toLocaleString("en-IN");

  document.title = course.name + " | Codrax Academy";

  const description = document.querySelector(
    'meta[name="description"]'
  );

  if (description) {
    description.content =
      course.introduction +
      " Live online learning with assignments, projects, TA support, and mentor guidance.";
  }

  const enquiry = intent =>
    `contact.html?course=${encodeURIComponent(id)}&intent=${intent}`;

  root.innerHTML = `
    <section class="wrap course-heading">
      <a class="breadcrumb" href="courses.html">← All courses</a>
      <span class="eyebrow">${course.eyebrow}</span>
      <h1>${course.name}</h1>
      <p>${course.introduction}</p>
    </section>

    <section class="wrap course-layout">
      <div>
        <section class="curriculum-panel">
          <span class="eyebrow">WHAT YOU WORK TOWARDS</span>
          <h2>${course.outcomeHeading}</h2>

          <p>
            Build your skills through guided learning, independent
            practice, and support when you need it.
          </p>

          <ul class="learning-outcomes">
            ${course.outcomes
              .map(outcome => `<li>${outcome}</li>`)
              .join("")}
          </ul>

          <p class="curriculum-note-text">
            These are learning outcomes, not a detailed syllabus.
            Contact us for the complete curriculum and learning plan.
          </p>

          <a class="button" href="${enquiry("curriculum")}">
            Request the full curriculum →
          </a>
        </section>

        <section class="course-support">
          <span class="eyebrow">THE CODRAX LEARNING EXPERIENCE</span>
          <h2 class="support-heading">
            Support beyond the live class.
          </h2>

          <ul>
            <li>
              <strong>3 live online classes every week</strong>
              <span>
                A structured learning routine that leaves time
                between classes for independent practice.
              </span>
            </li>

            <li>
              <strong>An assignment after every class</strong>
              <span>
                Apply what you learn and develop a consistent
                weekly practice habit.
              </span>
            </li>

            <li>
              <strong>Personal TA support every weekend</strong>
              <span>
                Get help with doubts, assignment difficulties,
                and understanding your mistakes.
              </span>
            </li>

            <li>
              <strong>3 complimentary mentor-session credits</strong>
              <span>
                Additional guidance alongside regular teaching
                and weekend TA support.
              </span>
            </li>

            <li>
              <strong>Hands-on projects and practical work</strong>
              <span>
                Put your learning into work you can demonstrate
                and explain.
              </span>
            </li>

            <li>
              <strong>A monthly mock assessment</strong>
              <span>
                Check your understanding and identify where to
                focus your next round of practice. Contact us
                for the assessment schedule.
              </span>
            </li>
          </ul>
        </section>

        <section class="prerequisite">
          <h3>Before you join</h3>
          <p>${course.prerequisite}</p>
        </section>
      </div>

      <aside class="enrol-card">
        <span class="eyebrow">YOUR COURSE INVESTMENT</span>

        <p class="course-regular-fee">
          Regular fee <del>${money(course.regular)}</del>
        </p>

        <div class="price">${money(course.offer)}</div>
        <p class="course-offer-label">Offer fee per student</p>

        <span class="course-saving">
          Save ${money(course.regular - course.offer)}
        </span>

        <dl>
          <div>
            <dt>Classes</dt>
            <dd>3 per week</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>100% online</dd>
          </div>
          <div>
            <dt>TA support</dt>
            <dd>Every weekend</dd>
          </div>
          <div>
            <dt>Mentor credits</dt>
            <dd>3 included</dd>
          </div>
          <div>
            <dt>Next batch</dt>
            <dd>Contact us</dd>
          </div>
        </dl>

        <a class="button" href="${enquiry("demo")}">
          Request a free demo →
        </a>

        <a class="text-link" href="${enquiry("enquiry")}">
          Ask about this course →
        </a>

        <p class="small-text">
          Call us for the course length, batch timings, teaching
          language, TA arrangements, mentor-session length and
          credit validity. Confirm payment and refund terms
          before enrolling.
        </p>

        <div class="bundle-nudge">
          <span class="eyebrow">THE COMPLETE LEARNING PACKAGE</span>
          <h3>Planning the full journey?</h3>

          <p>
            All seven courses in one package.
          </p>

          <p class="bundle-comparison">
            Individual offer total <del>₹33,493</del>
          </p>

          <strong class="bundle-price">₹16,749</strong>

          <p class="bundle-saving">
            Save ₹16,744 · Approximately 50%
          </p>

          <a class="text-link"
             href="contact.html?course=package&intent=enquiry">
            Ask about the complete package →
          </a>
        </div>
      </aside>
    </section>

    <section class="wrap end-cta">
      <div>
        <span class="eyebrow">CHOOSE YOUR NEXT STEP</span>
        <h2>Build skills you can put to work.</h2>
        <p>
          Talk to us about your experience, your goals,
          and the right starting point.
        </p>
      </div>

      <a class="button light" href="${enquiry("demo")}">
        Request a free demo →
      </a>
    </section>
  `;
})();