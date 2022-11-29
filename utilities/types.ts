import { StaticImageData } from 'next/image';

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  date: ProjectDate;
  video?: string;
  image: StaticImageData;
  alt: string;
  link: string;
  filters: string[];
  description: string;
  github?: string;
  skills: ProjectSkills;
  logo: {
    src: string;
    alt: string;
  };
  liveLink?: string;
}

interface ProjectSkills {
  active: string[];
  disabled?: string[];
}

export interface ProjectDate {
  start: Date;
  end?: Date;
}

export interface Date {
  month: number;
  year: number;
}

export interface Skill {
  name: string;
  progress: number;
  className: string;
  description: string;
  logo: string;
}

export interface ProjectPageProps {
  images: {
    imageData: StaticImageData;
    alt: string;
  }[];
  project: Project;
}
