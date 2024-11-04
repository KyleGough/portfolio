import { StaticImageData } from 'next/image';

export interface Project {
  alt: string;
  date: ProjectDate;
  description: string;
  filters: string[];
  github?: string;
  id: string;
  image: StaticImageData;
  link: string;
  liveLink?: string;
  logo: {
    alt: string;
    src: string;
  };
  skills: string[];
  subtitle?: string;
  title: string;
  video?: string;
}

export interface ProjectDate {
  end?: Date;
  start: Date;
}

export interface Date {
  month: number;
  year: number;
}

export interface Skill {
  description: string;
  logo: string;
  name: string;
}

export interface ProjectPageProps {
  images: {
    alt: string;
    imageData: StaticImageData;
  }[];
  project: Project;
}
