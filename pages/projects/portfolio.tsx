import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Link } from '@components/Link';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import imageAbout from '@image/portfolio-about.jpg';
import imageHomepage from '@image/portfolio-homepage.jpg';
import imageShowcase from '@image/portfolio-project-showcase.jpg';
import imageProjects from '@image/portfolio-projects.jpg';
import imageV1Projects from '@image/portfolio-projects-v1a.jpg';
import imageV1About from '@image/portfolio-projects-v1b.jpg';
import imageV2Projects from '@image/portfolio-projects-v2.jpg';
import imageV3Projects from '@image/portfolio-projects-v3.jpg';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import React from 'react';

const Portfolio: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="Portfolio - Personal Portfolio Website">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[4]} />

    <Divider />

    <Section>
      <h2 className="project-header">Versions</h2>
      <h3 className="mb-4">
        <strong>Static HTML</strong>
      </h3>
      <p className="max-w-reading mb-8">
        My interest in web development was sparked by the initial version of
        this website which was created whilst I was studying at university, but
        was never made public. It started off as a simple static site using
        HTML, Sass, and Bootstrap. Then as I gained further knowledge during my
        studies, components were replaced with Materialize CSS.
      </p>

      <h3 className="mb-4">
        <strong>PHP</strong>
      </h3>
      <p className="max-w-reading mb-2">
        The next iteration of the website was reconstructed with PHP to aid
        maintainability, promote code reuse, and to further my knowledge with
        PHP. This allowed the creation of various reusable components such as
        pagination, navigation bar, footer, and skill progress bars.
      </p>
      <p className="mb-8">
        <Link href="https://github.com/KyleGough/portfolio-php">
          GitHub Repository
        </Link>
      </p>

      <h3 className="mb-4">
        <strong>Create React App, JavaScript, Materialize</strong>
      </h3>
      <p className="max-w-reading mb-2">
        Migration of the website to React in{' '}
        <time dateTime="2020-05">May 2020</time> marked the start of my React
        journey. The site was built with create-react-app and effort was taken
        to replicate most of the previous functionality and styling. Materialize
        was retained for UI components with the help of vanilla CSS and
        CSS-in-JS.
      </p>
      <p className="mb-8">
        <Link href="https://github.com/KyleGough/portfolio-react">
          GitHub Repository
        </Link>
      </p>

      <h3 className="mb-4">
        <strong>Create React App, TypeScript, TailwindCSS</strong>
      </h3>
      <p className="max-w-reading mb-8">
        In January 2022, another major update was undertaken to replace
        Materialize with TailwindCSS which has now become my personal favourite
        CSS framework for web development. During this period, considerable
        effort and research was taken to improve and understand responsiveness,
        page speed, SEO, accessibility, and best practices.
      </p>

      <h3 className="mb-4">
        <strong>Next.js, TypeScript, TailwindCSS</strong>
      </h3>
      <p className="max-w-reading mb-2">
        In November 2022, the latest major update to the website replaced the
        create-react-app framework with Next.js as well as switching deployment
        hosts from Heroku to Vercel. This update included many updates to
        security headers, project structure, path aliases, and images.
      </p>
      <p className="mb-8">
        <Link href="https://github.com/KyleGough/portfolio">
          GitHub Repository
        </Link>
      </p>
    </Section>

    <Divider />

    <Screenshots images={images} />

    <Divider />

    <Pagination
      previousTitle="LucidLab"
      previousLink="/projects/lucidlab"
      nextTitle="Bookmark Labeller"
      nextLink="/projects/bookmark-labeller"
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const images = [
    {
      imageData: imageV1Projects,
      alt: 'Portfolio project page version 1',
    },
    {
      imageData: imageV1About,
      alt: 'Portfolio about page version 1',
    },
    {
      imageData: imageV2Projects,
      alt: 'Portfolio project page version 2',
    },
    {
      imageData: imageV3Projects,
      alt: 'Portfolio project page version 3',
    },
    {
      imageData: imageHomepage,
      alt: 'Current Portfolio Homepage',
    },
    {
      imageData: imageAbout,
      alt: 'Current Portfolio About Page',
    },
    {
      imageData: imageProjects,
      alt: 'Current Portfolio Projects Page',
    },
    {
      imageData: imageShowcase,
      alt: 'Current Portfolio Project Showcase',
    },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('portfolio'),
    },
  };
};

export default Portfolio;
