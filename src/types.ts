/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Skill {
  name: string;
  percentage: number;
}

export interface SoftSkill {
  name: string;
  icon: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  yearRange: string;
  grade: string;
  description: string;
}

export interface ProjectEntry {
  title: string;
  description: string;
  tech: string[];
  image: string; // fallback base64 or generative gradient representation
  demoUrl: string;
  codeUrl: string;
}

export interface PersonalInfo {
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
}
