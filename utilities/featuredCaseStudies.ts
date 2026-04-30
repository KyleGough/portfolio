import imageMars from "@image/mars.png";
import imageSudoku from "@image/sudoku1.jpg";

import type { ProjectDate } from "./types";

/**
 * Home “Case Studies” masonry tiles only. Imports two images so the index bundle
 * does not pull every card asset via `@utilities/Project`.
 *
 * Keep titles, dates, links, and alts aligned with `projects[]` in `Project.ts` for these ids.
 */
export interface FeaturedCaseStudy {
  alt: string;
  date: ProjectDate;
  excerpt: string;
  id: string;
  image: typeof imageMars;
  link: string;
  title: string;
}

export const FEATURED_CASE_STUDIES: readonly FeaturedCaseStudy[] = [
  {
    id: "solar-system",
    title: "Interactive Solar System Model",
    alt: "Solar System Model",
    link: "/projects/solar-system",
    date: { start: { month: 7, year: 2023 } },
    image: imageMars,
    excerpt:
      "Interactive 3D solar system in the browser, with orbital mechanics inspired motion, cinematic camera controls, and educational waypoints.",
  },
  {
    id: "sudoku",
    title: "Logical Sudoku Solver",
    alt: "Logical sudoku solver",
    link: "/projects/sudoku",
    date: {
      start: { month: 11, year: 2019 },
      end: { month: 1, year: 2020 },
    },
    image: imageSudoku,
    excerpt:
      "A Sudoku engine that works without backtracking, with stepwise explanations of every deduction.",
  },
];
