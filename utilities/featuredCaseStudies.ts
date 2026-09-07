import imageMars from '@image/mars.jpg';
import imageQubitEvolution from '@image/qubit-evolution.jpg';

import type { ProjectDate } from './types';

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
  image: typeof imageQubitEvolution;
  link: string;
  title: string;
}

export const FEATURED_CASE_STUDIES: readonly FeaturedCaseStudy[] = [
  {
    id: 'qubit-evolution',
    title: 'Qubit Evolution',
    alt: 'Qubit Evolution visualiser',
    link: '/projects/qubit-evolution',
    date: { start: { month: 9, year: 2026 } },
    image: imageQubitEvolution,
    excerpt:
      'Qubit visualiser with tunable Hamiltonian. Visualises time-independent Schrödinger evolution on the Bloch sphere.',
  },
  {
    id: 'solar-system',
    title: 'Interactive Solar System Model',
    alt: 'Solar System Model',
    link: '/projects/solar-system',
    date: { start: { month: 7, year: 2023 } },
    image: imageMars,
    excerpt:
      'Interactive Three.js orrery: travel between the Sun, planets, and moons, toggle trails and points of interest, and read HUD facts.',
  },
];
