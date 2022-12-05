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
  skills: string[];
  logo: {
    src: string;
    alt: string;
  };
  liveLink?: string;
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
