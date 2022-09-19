export interface ISkill {
  name: string;
  progress: number;
  className: string;
  description: string;
  confidence: Confidence;
  logo: string;
}

export enum Confidence {
  CONFIDENT = 'Confident',
  COMFORTABLE = 'Comfortable',
  BEGINNER = 'Beginner',
}
