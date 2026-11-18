/*
 * Codrax Academy catalogue data.
 * Prices are in INR. Durations and topics are the course plans supplied by
 * the academy. Confirm batch timetables and unpublished course durations
 * before accepting enrolment.
 */
(() => {
  "use strict";

  const courses = [
    {
      id: "java",
      name: "Java Backend Development",
      eyebrow: "JAVA + DATABASES + BACKEND DEVELOPMENT",
      price: 16749,
      regularPrice: 25000,
      duration: "About 2.5 months",
      durationDetail: "Java: 1 month · SQL: 15 days · Spring Boot: 1 month",
      mentorSessions: 1,
      href: "course-java.html",
      level: "Beginners welcome",
      highlights: ["Java, OOP and collections", "Problem solving and core programming", "DBMS, SQL joins and transactions", "Spring Boot, REST APIs and JPA", "Redis and AWS deployment", "Git, GitHub and GPT-assisted coding"],
      summary: "Learn Java, SQL and Spring Boot as one guided course. Git & GitHub is included in the backend batch.",
      outcomes: [
        "Write and explain Java programs using OOP and core language features.",
        "Query relational databases and build data-backed features.",
        "Build REST APIs with Spring Boot, test them, and deploy a backend project.",
        "Use Git and GitHub to track and share your project work.",
        "Use GPT as a coding assistant, then review, test and explain its suggestions."
      ],
      modules: [
        {
          name: "Java foundations and advanced programming",
          topics: [
            "Introduction to OOP", "Classes, objects and core Java", "Generics",
            "Collections", "Streams and lambdas", "Threads and executors",
            "Synchronization and semaphores", "Problem solving and Java practice"
          ]
        },
        {
          name: "Databases and SQL · 15 days",
          topics: [
            "DBMS and relational model", "Keys", "CRUD", "Joins",
            "Aggregate queries", "Subqueries and views", "Indexing",
            "Transactions", "Schema design"
          ]
        },
        {
          name: "Spring Boot backend project · 1 month",
          topics: [
            "Backend foundations and Git", "OOP in a backend project", "Spring Boot, dependency injection, IoC and MVC",
            "REST, APIs and HTTP", "Third-party API calls and exception handling",
            "Spring requests and ResponseEntity", "ORMs, models and cardinalities",
            "Spring Data JPA, JDBC, Hibernate and repository pattern",
            "Inheritance, IDs and JPA queries", "Fetch types, N+1 problem and projections",
            "Pagination, searching and sorting", "Redis API optimisation",
            "AWS: EC2 and RDS", "Deployment: EBS, VPC and Route 53",
            "Payment flow: callbacks, webhooks and Stripe integration"
          ]
        },
        {
          name: "Version control · included",
          topics: [
            "Git basics", "Repositories and commits", "Branches and merging",
            "GitHub collaboration", "Using Git throughout the backend project"
          ]
        },
        {
          name: "AI-assisted development",
          topics: [
            "Use GPT to clarify concepts and explore approaches",
            "Review generated code for correctness and security",
            "Test AI suggestions and explain the final implementation"
          ]
        }
      ]
    },
    {
      id: "dsa",
      name: "Data Structures & Algorithms",
      eyebrow: "PROBLEM SOLVING · DSA 1–4",
      price: 7999,
      regularPrice: 11999,
      duration: "Confirm before enrolment",
      mentorSessions: 0,
      href: "course-dsa.html",
      level: "Basic programming recommended",
      highlights: ["Time complexity and problem analysis", "Prefix sums, subarrays and matrices", "Hashing, recursion and sorting", "Trees, heaps and graphs", "Backtracking and dynamic programming"],
      summary: "Practise turning problems into efficient solutions and explain how your code works.",
      outcomes: [
        "Break a problem into steps before coding.",
        "Choose data structures and algorithms for a given problem.",
        "Reason about time complexity and compare solutions.",
        "Practise problem solving consistently and discuss your approach."
      ],
      modules: [
        { name: "DSA 1 · Problem solving and arrays", topics: ["Introduction to problem solving", "Time complexity", "Carry forward", "Prefix sum", "Subarrays", "Prefix and subarrays", "2D matrices", "Bit manipulation", "Subsets and subsequences"] },
        { name: "DSA 2 · Core techniques", topics: ["Hashing", "Recursion", "Sorting", "Searching"] },
        { name: "DSA 3 · Linear structures and trees", topics: ["Two pointers", "Strings", "Pattern matching", "Linked lists", "Stacks", "Queues", "Deque", "Trees"] },
        { name: "DSA 4 · Advanced problem solving", topics: ["Tries", "Heaps", "Greedy algorithms", "Backtracking", "Dynamic programming · DP 1–5", "Graphs"] }
      ]
    },
    {
      id: "lld",
      name: "Low-Level Design",
      eyebrow: "OBJECT DESIGN · UML · INTERVIEW PRACTICE",
      price: 5499,
      regularPrice: 8999,
      duration: "2 months",
      mentorSessions: 0,
      href: "course-lld.html",
      level: "Java and OOP experience recommended",
      highlights: ["SOLID principles", "Eight object-oriented design patterns", "UML diagrams", "LLD interview approach", "TicTacToe, Parking Lot and Splitwise"],
      summary: "Turn requirements into class models and explain design decisions through practical exercises.",
      outcomes: [
        "Apply SOLID principles to design decisions.",
        "Choose and explain common design patterns.",
        "Represent software structure with UML diagrams.",
        "Approach object-oriented design interview problems step by step."
      ],
      modules: [
        { name: "Design foundations", topics: ["SOLID", "UML diagrams", "LLD interview approach"] },
        { name: "Design patterns", topics: ["Singleton", "Builder", "Factory", "Adapter", "Strategy", "Prototype", "Observer", "Decorator"] },
        { name: "Design problems", topics: ["TicTacToe", "Parking Lot", "BookMyShow", "Splitwise", "Google Calendar"] }
      ]
    },
    {
      id: "git",
      name: "Git & GitHub",
      eyebrow: "VERSION CONTROL · PROJECT COLLABORATION",
      price: 1999,
      regularPrice: 3999,
      duration: "Confirm before enrolment",
      mentorSessions: 0,
      href: "course-git.html",
      level: "Beginners welcome",
      highlights: ["Repositories and commits", "Branches and merging", "Conflict resolution", "GitHub pull requests"],
      summary: "Track changes, manage project history and collaborate through GitHub.",
      outcomes: [
        "Create and maintain a Git repository.",
        "Record and review project changes.",
        "Use branches to organise work.",
        "Share projects and collaborate with GitHub."
      ],
      modules: [
        { name: "Git and GitHub highlights", topics: ["Repositories", "Commits and history", "Branches and merging", "Conflict resolution", "GitHub collaboration", "Pull requests"] }
      ]
    },
    {
      id: "html-css",
      name: "HTML & CSS",
      eyebrow: "WEB PAGE FOUNDATIONS",
      price: 2999,
      duration: "Confirm before enrolment",
      mentorSessions: 0,
      href: "course-html-css.html",
      level: "Beginners welcome",
      highlights: ["Semantic HTML", "Forms and layouts", "Flexbox and Grid", "Responsive design"],
      summary: "Build the structure and visual layout of responsive web pages.",
      outcomes: [
        "Create well-structured web pages.",
        "Style pages using CSS and reusable layouts.",
        "Make pages adapt to different screen sizes."
      ],
      modules: [
        { name: "HTML & CSS highlights", topics: ["Semantic HTML", "Forms", "CSS selectors and box model", "Flexbox", "Grid", "Responsive layouts", "Accessibility"] }
      ]
    },
    {
      id: "hld",
      name: "High-Level Design",
      eyebrow: "SYSTEM DESIGN · DISTRIBUTED SYSTEMS",
      price: 9999,
      regularPrice: 15000,
      duration: "2 months",
      mentorSessions: 0,
      href: "course-hld.html",
      level: "Backend and basic networking knowledge recommended",
      highlights: ["Load balancing", "Caching and sharding", "Kafka and Elasticsearch", "Microservices and streaming"],
      summary: "Explore system design choices, trade-offs and distributed-system building blocks.",
      outcomes: [
        "Break down a system into major components.",
        "Discuss scalability, reliability and data trade-offs.",
        "Choose suitable caching, storage, messaging and search components.",
        "Explain design choices for common large-scale systems."
      ],
      modules: [
        { name: "Foundations and scale", topics: ["Computer networks", "System design basics", "Load balancing", "Consistent hashing", "Rate limiting", "Unique ID generation"] },
        { name: "Data, storage and consistency", topics: ["SQL vs NoSQL", "Sharding", "CAP and PACELC theorems", "NoSQL internals: LSM trees", "Large-file storage: S3 and HDFS", "Nearest-neighbour search"] },
        { name: "Distributed components and systems", topics: ["Caching and cache invalidation", "Messaging queues: Kafka and ZooKeeper", "Elasticsearch", "Video streaming", "Microservices", "Redis"] }
      ]
    },
    {
      id: "ai-agents",
      name: "AI & Agents: From Talking to AI to Building One",
      eyebrow: "GENERATIVE AI · AUTOMATION · AGENTS",
      price: 3999,
      regularPrice: 7999,
      duration: "21 days",
      mentorSessions: 0,
      href: "course-ai-agents.html",
      level: "Beginners welcome; basic computer skills recommended",
      highlights: ["Prompt engineering", "RAG", "AI agents and tools", "Automation and multi-agent systems"],
      summary: "Move from using GPT effectively to understanding retrieval, automation and AI-agent workflows.",
      outcomes: [
        "Write and refine prompts for practical tasks.",
        "Use LLM tools while checking their results.",
        "Understand RAG and common agent building blocks.",
        "Explore no-code workflow automation and multi-agent concepts.",
        "Plan a capstone-ready AI-agent project."
      ],
      modules: [
        { name: "AI and prompts", topics: ["Generative AI landscape", "LLM landscape", "Prompt engineering", "LLM built-in power tools"] },
        { name: "Retrieval and agents", topics: ["Retrieval-augmented generation · RAG", "What is an AI agent?", "OpenClaw", "Multi-agent systems"] },
        { name: "Automation and building", topics: ["n8n and Zapier automation", "Debugging AI with vibecoding tools", "Capstone readiness"] }
      ]
    }
  ];

  const packageCourseIds = ["java", "dsa", "lld", "html-css"];
  const packageCourses = packageCourseIds.map((id) =>
    courses.find((course) => course.id === id)
  );
  const packagePrice = 21999;
  const separateOfferTotal = packageCourses.reduce(
    (sum, course) => sum + course.price,
    0
  );

  const completePackage = {
    id: "package",
    name: "Complete Developer Package",
    price: packagePrice,
    mentorSessions: 3,
    totalMentorCredits: 3,
    courseCount: packageCourses.length,
    includedCourseIds: packageCourseIds,
    includedCourses: packageCourses.map((course) => course.name),
    individualOfferTotal: separateOfferTotal,
    savings: separateOfferTotal - packagePrice,
    duration: "Confirm total sequence and duration before enrolment",
    description: "Includes Java Backend Development, DSA, Low-Level Design, and HTML & CSS. Git & GitHub is taught within the backend batch.",
    href: "courses.html#package"
  };

  const courseAliases = {
    backend: "java",
    sql: "java",
    springboot: "java",
    spring: "java",
    "ai-agent": "ai-agents",
    "ai-assisted": "ai-agents"
  };

  window.CODRAX_COURSES = courses;
  window.CODRAX_PACKAGE = completePackage;
  window.CODRAX_COURSE_ALIASES = courseAliases;
  window.CODRAX_OFFERINGS = [
    courses.find((course) => course.id === "java"),
    completePackage,
    ...courses.filter((course) => course.id !== "java")
  ];
  window.CODRAX_SUPPORT = {
    liveClassesPerWeek: 3,
    assignmentsPerClass: 1,
    weekendTeachingAssistant: true,
    monthlyMock: true,
    problemSolvingStreak: true,
    attendanceTracking: true
  };
})();
