import { Divider } from 'components/Divider';
import { ImageFigure } from 'components/ImageFigure';
import { Layout } from 'components/Layout';
import { Pagination } from 'components/Pagination';
import { ProjectHeader } from 'components/ProjectHeader';
import { Screenshots } from 'components/Screenshots';
import { Section } from 'components/Section';
import { GetStaticProps } from 'next';
import React from 'react';
import { getProjectData } from 'utilities/Project';
import { ProjectPageProps } from 'utilities/types';

const URLShortener: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="URL Shortener - Shorten Long URLs to Easily Share">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <h2 className="project-header">Features</h2>
      <ul className="project-list">
        <li>Simple URL shortener.</li>
        <li>AJAX request to send URL and get link counter.</li>
        <li>Express.js to handle routing for GET and POST requests.</li>
        <li>Live counter on homepage of how many links have been created.</li>
        <li>Prevents shortening links from itself.</li>
        <li>Will not duplicate URLs.</li>
        <li>Copy to clipboard feature for the short URL.</li>
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

export const getStaticProps: GetStaticProps = async () => {
  const images = [
    { src: '/img/url-shortener1.jpg', caption: 'Shortened URL example 1' },
    { src: '/img/url-shortener2.jpg', caption: 'Shortened URL example 2' },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('url-shortener'),
    },
  };
};

export default URLShortener;
