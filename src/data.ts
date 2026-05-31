import { Skill, SoftSkill, EducationEntry, ProjectEntry, PersonalInfo } from "./types";

export const DEVELOPER_NAME = "Ravi Jatav";

export const HERO_TITLES = [
  "Full Stack Developer",
  "UI/UX Architect",
  "Mern Stack Developer",
  "Backend Engineer"
];

export const PERSONAL_INFO: PersonalInfo = {
  location: "Bhopal",
  email: "raviijatav@gmail.com",
  phone: "+919074319013",
  github: "https://github.com/raviijatav",
  linkedin: "https://linkedin.com/in/raviijatav",
  twitter: "https://twitter.com/raviijatav",
  instagram: "https://instagram.com/raviijatav",
};

export const BIO_TEXT = `As a versatile Full-Stack Engineer, I specialize in crafting next-generation, high-performance web systems. Powered by futuristic aesthetics and bulletproof architectures, I turn complex business challenges into seamless, reactive digital experiences. My dual passion for pixel-perfect user interfaces and robust server logic enables me to engineer solutions that are both visually captivating and mathematically efficient.`;

export const STATS = [
  { id: "projects", value: 20, label: "Projects Completed", suffix: "+" },
  { id: "experience", value: 2, label: "Years Experience", suffix: "+" },
  { id: "clients", value: 10, label: "Satisfied Clients", suffix: "+" }
];

export const TECHNICAL_SKILLS: Skill[] = [
  { name: "React / Next.js", percentage: 95 },
  { name: "TypeScript", percentage: 90 },
  { name: "Node.js", percentage: 85 },
  { name: "Express", percentage: 80 },
  { name: "Tailwind CSS", percentage: 95 },
  { name: "AWS", percentage: 75 },
  { name: "MONGODB", percentage: 75},
  { name: "POSTGRESQL", percentage: 75 }
];

export const SOFT_SKILLS: SoftSkill[] = [
  { name: "API Design", icon: "Brain" },
  { name: "Agile Leadership", icon: "GitBranch" },
  { name: "UI/UX Design Sense", icon: "Palette" },
  { name: "Product Strategy", icon: "Cpu" },
  { name: "Technical Communication", icon: "MessageSquare" },
  { name: "Empathetic Mentorship", icon: "Heart" },
  { name: "AI Integration", icon: "Zap" }
];
export const Work_HISTORY: ExperinceEntry[] = [
  {
    company: "Binary Logix Private Limited Bhopal",
    role: "Front-End Deveploper",
    yearRange: "2023 - 2023",
    description: "Developing and maintaining full-stack web applications using MongoDB, Express.js, React.js, and Node.js (MERN). Building scalable RESTful APIs and integrating them seamlessly with dynamic React-based frontend."
  },
 {
    company: "Mansvi Technology Bhopal",
    role: "Mern-Stack Devploper",
    yearRange: "2019 - 2023",
    description: "Developing and maintaining full-stack web applications using MongoDB, Express.js, React.js, and Node.js (MERN). Building scalable RESTful APIs and integrating them seamlessly with dynamic React-based frontend."
  },
 {
    company: "Rajya Shiksha Kendra Bhopal (Education Department)",
    role: "Mern-Stack Deveploper",
    yearRange: "2025 April - Present",
    description: "Work at as junior Developer"
  },
];

export const EDUCATION_HISTORY: EducationEntry[] = [
  {
    institution: "Sam Collage of Engineering of Bhopal",
    degree: "B.S. in Computer Science",
    yearRange: "2019 - 2023",
    grade: "CPA: 7.2 / 10",
    description: "Specialized in Computer Science Engineering and Human-Computer Interaction. Graduated with Honors. Core coursework: Software Engineering, Distributed Systems, Interactive Media."
  },
  {
    institution: "Sheryians Coding School",
    degree: "Certified Backend Specialist",
    yearRange: "2023 – 6 Months",
    grade: "",
    description: "Mastered backend development through hands-on projects — built secure REST APIs with JWT-based authentication, handled real-time communication via Socket.io, managed file uploads using Multer, and integrated email workflows with Nodemailer. Engineered a full-scale Pinterest Clone as a capstone project, applying MVC architecture, session management, and database-driven dynamic rendering."
  },
  {
    institution: "Self-Directed Learning Path",
    degree: "DevOps Engineering — Upcoming",
    yearRange: "Future",
    grade: "",
    description: "Planning to dive into the DevOps ecosystem — with goals to learn containerization using Docker, CI/CD pipeline automation, cloud infrastructure, and Linux server administration. The next step in evolving from a Backend Developer to a full production-ready engineer."
  }
];

export const PORTFOLIO_PROJECTS: ProjectEntry[] = [
  {
  title: "Style Lounge — Salon Platform",
description: "A luxury salon web platform built with a modern editorial design system. Features a full services showcase, academy course section, interactive gallery with transformation previews, and a WhatsApp-integrated appointment booking flow. Appointments are managed via local storage for a seamless client experience — fully responsive and mobile-first optimized.",
tech: ["React", "Tailwind CSS", "Local Storage", "WhatsApp API"],
image: "linear-gradient(135deg, #1a0010 0%, #0d0015 100%)",
demoUrl: "https://style-lounge.vercel.app",
codeUrl: "https://github.com"
  },
  {
    title: "TourToPachmarhi",
    description: "Developed TourToPachmarhi, a comprehensive One-Stop Solution travel platform using the MERN stack specifically designed to streamline Pachmarhi tourism",
    tech: ["React,Node.js, Express.js, and MongoDB."],
    image: "linear-gradient(135deg, #100223 0%, #021a29 100%)",
    demoUrl: "https://tourtopachmarhi.com/",
    codeUrl: "https://github.com"
  },
  {
    title: "SS Pathcare Lab Website",
    description: "Developed a full-stack diagnostic lab platform using MongoDB, Express.js, React (Vite), Redux, Tailwind CSS, and Node.js",
    tech: ["React", "Node.js", "Tailwind CSS", "Mongodb","Express.js"],
    image: "linear-gradient(135deg, #23021f 0%, #00121c 100%)",
    demoUrl: "https://sspathcare.com/",
    codeUrl: "https://github.com"
  }
];



export function triggerResumeDownload() {
   const a = document.createElement("a");

  a.href = "/resume.pdf";

  a.download = "resume.pdf";

  a.click();
}


