window.CODRAX_COURSES = [
  {
    id: "java",
    name: "Java — Programming Foundations",
    regularPrice: 9999,
    price: 5999
  },
  {
    id: "sql",
    name: "SQL & Database Fundamentals",
    regularPrice: 6999,
    price: 3499
  },
  {
    id: "springboot",
    name: "Spring Boot & REST API Development",
    regularPrice: 12499,
    price: 5499
  },
  {
    id: "html-css",
    name: "HTML & CSS",
    regularPrice: 4999,
    price: 2999
  },
  {
    id: "git",
    name: "Git & GitHub",
    regularPrice: 3999,
    price: 1999
  },
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    regularPrice: 11999,
    price: 7999
  },
  {
    id: "lld",
    name: "Low-Level Design",
    regularPrice: 8999,
    price: 5499
  }
];

window.CODRAX_PACKAGE = {
  name: "Complete Learning Package",
  courseCount: window.CODRAX_COURSES.length,

  individualRegularTotal: window.CODRAX_COURSES.reduce(
    (total, course) => total + course.regularPrice,
    0
  ),

  individualOfferTotal: window.CODRAX_COURSES.reduce(
    (total, course) => total + course.price,
    0
  ),

  price: 16749,
  mentorCreditsPerCourse: 3
};

window.CODRAX_PACKAGE.savings =
  window.CODRAX_PACKAGE.individualOfferTotal -
  window.CODRAX_PACKAGE.price;

window.CODRAX_PACKAGE.totalMentorCredits =
  window.CODRAX_PACKAGE.courseCount *
  window.CODRAX_PACKAGE.mentorCreditsPerCourse;