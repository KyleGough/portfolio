import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import imageEarth from '@image/earth.jpg';
import imageMars from '@image/mars.jpg';
import imageMoon from '@image/moon.jpg';
import imageNeptune from '@image/neptune.jpg';
import imageSaturn from '@image/saturn.jpg';
import { fetchGitHubStargazerCount } from '@utilities/fetchGitHubStargazerCount';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import React from 'react';

const SolarSystem: React.FC<ProjectPageProps> = ({
  images,
  project,
  githubStargazerCount,
}) => (
  <Layout title="Solar System Model">
    <ProjectHeader
      project={project}
      githubStargazerCount={githubStargazerCount}
    />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <h2 className="project-header">Key Features</h2>
      <ul className="project-list max-w-reading">
        <li className="mb-4">
          <strong>Travel Between Bodies</strong>
          <br />
          Click a body to fly to it, use the orbit nav to jump between the Sun,
          planets, and major moons, or link straight to a focus with a URL hash
          such as <code>#mars</code>. Travel favours the dayside so the surface
          is lit when you arrive.
        </li>
        <li className="mb-4">
          <strong>Orbit Trails &amp; Simulation Controls</strong>
          <br />
          Toggle orbit paths, ride the focused body&apos;s rotation with Spin,
          and open Controls for simulation settings including speed—so you can
          explore at your own pace.
        </li>
        <li className="mb-4">
          <strong>Points of Interest</strong>
          <br />
          Labels mark probes and landmarks on selected bodies, including Mars
          rover landing sites such as Curiosity and Perseverance, Apollo on the
          Moon, and features on Jupiter, Saturn, and Neptune.
        </li>
        <li className="mb-4">
          <strong>Body Info Panel</strong>
          <br />
          A HUD panel shows a short description and stats for the focused body
          so orientation stays clear while you look around.
        </li>
        <li className="mb-4">
          <strong>Atmospheres, Rings &amp; Lighting</strong>
          <br />
          Custom atmosphere glow, Saturn&apos;s rings and ring shadow, Earth
          night lights, a bloomed Sun, and a subtle starfield give each world
          depth beyond a flat texture map.
        </li>
        <li className="mb-4">
          <strong>Cinematic Camera</strong>
          <br />
          Orbit the focused body like a satellite, with smooth focus
          transitions and zoom suited to both planet-scale and close surface
          views.
        </li>
      </ul>
    </Section>

    <Divider />

    <Screenshots images={images} />

    <Divider />

    <Pagination
      previousTitle="AI Space Telescope"
      previousLink="/projects/ai-space-telescope"
      nextTitle="Qubit Evolution"
      nextLink="/projects/qubit-evolution"
    />
  </Layout>
);

export const getStaticProps: GetStaticProps<ProjectPageProps> = async () => {
  const images = [
    {
      imageData: imageMars,
      alt: 'Mars',
    },
    {
      imageData: imageEarth,
      alt: 'Earth',
    },
    {
      imageData: imageMoon,
      alt: 'Moon',
    },
    {
      imageData: imageNeptune,
      alt: 'Neptune',
    },
    {
      imageData: imageSaturn,
      alt: 'Saturn',
    },
  ];

  const githubStargazerCount = await fetchGitHubStargazerCount('solar-system');

  return {
    props: {
      images: images,
      project: getProjectData('solar-system'),
      ...(githubStargazerCount !== undefined && { githubStargazerCount }),
    },
    revalidate: 3600,
  };
};

export default SolarSystem;
