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
  skills: string[];
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

export interface ProjectPageProps {
  githubStargazerCount?: number | null;
  images: {
    alt: string;
    imageData: StaticImageData;
  }[];
  project: Project;
}
