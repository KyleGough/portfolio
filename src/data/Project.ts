import projects from './project-data.json';

export interface IProject {
  id: string;
  title: string;
  date: IProjectDate;
  video?: string;
  src: string;
  alt: string;
  link: string;
  filters: string[];
  description: string;
  github?: string;
  skills: IProjectSkills;
}

export interface IProjectDate {
  start: string;
  end?: string;
}

interface IProjectSkills {
  active: string[];
  disabled?: string[];
}

export const getProjectData = (projectKey: string) => {
  return (projects as IProject[]).find((project) => project.id === projectKey);
};

export const getAllProjects = () => {
  return projects as IProject[];
};
