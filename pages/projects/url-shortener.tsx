import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import imageExample1 from '@image/url-shortener1.jpg';
import imageExample2 from '@image/url-shortener2.jpg';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import React from 'react';

const URLShortener: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="URL Shortener - Shorten Long URLs to Easily Share">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <h2 className="project-header">Features</h2>
      <ul className="project-list">
        <li>
          <strong>Effortless URL Shortening:</strong> Simplify lengthy URLs with
          ease, creating concise and manageable short links for your
          convenience.
        </li>
        <li>
          <strong>Duplicate Prevention:</strong> Avoid clutter and confusion by
          preventing the creation of duplicate short URLs for the same long URL.
        </li>
        <li>
          <strong>Copy to Clipboard:</strong> Enjoy the convenience of copying
          your short URL with a simple click, making sharing and dissemination
          effortless.
        </li>
      </ul>
    </Section>

    <Divider />

    <Screenshots images={images} />

    <Divider />

    <Pagination
      previousTitle="Graph Algorithm Visualiser"
      previousLink="/projects/graph-algorithm-visualiser"
      nextTitle="RSCBot"
      nextLink="/projects/rscbot"
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = () => {
  const images = [
    { imageData: imageExample1, alt: 'Shortened URL example 1' },
    { imageData: imageExample2, alt: 'Shortened URL example 2' },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('url-shortener'),
    },
  };
};

export default URLShortener;
