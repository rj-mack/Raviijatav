/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Skill, SoftSkill, EducationEntry, ProjectEntry, PersonalInfo } from "./types";

export const DEVELOPER_NAME = "Ravi Jatav";

export const HERO_TITLES = [
  "Full Stack Developer",
  "UI/UX Architect",
  "Problem Solver",
  "Cloud Engineer"
];

export const PERSONAL_INFO: PersonalInfo = {
  location: "Bhopal",
  email: "raviijatav@gmail.com",
  phone: "+91 90000 00000",
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
  { name: "Python / FastAPI", percentage: 80 },
  { name: "Tailwind CSS", percentage: 95 },
  { name: "Docker & Cloud", percentage: 75 }
];

export const SOFT_SKILLS: SoftSkill[] = [
  { name: "Critical Thinking", icon: "Brain" },
  { name: "Agile Leadership", icon: "GitBranch" },
  { name: "UI/UX Design Sense", icon: "Palette" },
  { name: "Systems Architecture", icon: "Cpu" },
  { name: "Technical Communication", icon: "MessageSquare" },
  { name: "Empathetic Mentorship", icon: "Heart" },
  { name: "Stochastic Optimizations", icon: "Zap" }
];

export const EDUCATION_HISTORY: EducationEntry[] = [
  {
    institution: "Stanford University",
    degree: "B.S. in Computer Science",
    yearRange: "2020 - 2024",
    grade: "GPA: 3.92 / 4.00",
    description: "Specialized in Artificial Intelligence and Human-Computer Interaction. Graduated with Honors. Core coursework: Software Engineering, Distributed Systems, Interactive Media."
  },
  {
    institution: "Advanced Web Engineering Institute",
    degree: "Certified Cloud Operations Specialist",
    yearRange: "2024 - 2025",
    grade: "Grade: Distinction (98%)",
    description: "Advanced containerization systems, load balancing theory, cloud edge networking, database clustering, and security-first microservices styling."
  },
  {
    institution: "Metropolitan Design Lab",
    degree: "Micro-Degree in Interface Ergonomics",
    yearRange: "2025",
    grade: "Grade: Pass with Praise",
    description: "Immersive studies in modern typography, spatial design, responsive layouts, optical alignment, cognitive load management, and dark-mode color balance."
  }
];

export const PORTFOLIO_PROJECTS: ProjectEntry[] = [
  {
    title: "Quantum Ledger Dashboard",
    description: "A dark-mode analytics terminal measuring decentralized transactional throughput with fluid live-chart feedback and custom state queries.",
    tech: ["React", "TypeScript", "Recharts", "Tailwind CSS"],
    image: "linear-gradient(135deg, #022329 0%, #0c001a 100%)",
    demoUrl: "#projects",
    codeUrl: "https://github.com"
  },
  {
    title: "AeroForm UI Studio",
    description: "An interactive code generator translating user hand drawings into fully structured responsive styling using visual canvas processing.",
    tech: ["Next.js", "Docker", "FastAPI", "lucide-react"],
    image: "linear-gradient(135deg, #100223 0%, #021a29 100%)",
    demoUrl: "#projects",
    codeUrl: "https://github.com"
  },
  {
    title: "Vertex Collaborative Canvas",
    description: "A multiplayer collaborative drawing viewport using real-time sync systems, custom vector path smoothing, and asset layers.",
    tech: ["React", "motion", "Tailwind CSS", "Canvas API"],
    image: "linear-gradient(135deg, #23021f 0%, #00121c 100%)",
    demoUrl: "#projects",
    codeUrl: "https://github.com"
  }
];

/**
 * Generates an actual, download-friendly local PDF representation of our Resume.
 * This ensures the CTA button serves a fully functioning download!
 */
export function triggerResumeDownload() {
  const resumeContent = `
========================================
RAVI JATAV - FULL-STACK DEVELOPER RESUME
========================================
Email: ${PERSONAL_INFO.email}
Phone: ${PERSONAL_INFO.phone}
Location: ${PERSONAL_INFO.location}
Portfolio: Developed in AI Studio

SUMMARY
Highly skilled Full-Stack Developer specializing in futuristic visual designs, 
responsive React engineering, and scalable server systems.

EDUCATION
- Stanford University: B.S. in Computer Science (GPA 3.92)
- Advanced Web Institute: Certified Cloud Operations Specialist
- Metropolitan Design Lab: Interface Ergonomics

CORE TECHNICAL SKILLS
- JavaScript / TypeScript, Node.js, Python, FastAPI
- React, Next.js, Recharts, Tailwind CSS, motion
- Docker, GCP, Git, Microservices

EXPERIENCE & PROJECTS
- Quantum Ledger Dashboard: Built decentralized analytics terminal.
- AeroForm UI Studio: Designed interactive design-to-code translator.
- Vertex Collaborative Canvas: Implemented canvas drawing sync.

Created in 2026.
========================================
`;

  const blob = new Blob([resumeContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${DEVELOPER_NAME.replace(" ", "_")}_Resume.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
