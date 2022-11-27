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

const RSCBot: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="RSCBot - Personalisable Trader ChatBot">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <h2 className="project-header">Features</h2>
      <ul className="project-list">
        <li>Fast and responsive answers to stock market queries.</li>
        <li>
          Hourly news briefings from a selection of the user&apos;s favourite
          companies and sectors.
        </li>
        <li>Ability to select favourite companies and sectors.</li>
        <li>Poll rate choice for each individual company and sector.</li>
        <li>Extensive list of available queries.</li>
        <li>AI to detect possible interests to the user.</li>
        <li>Sentiment analysis on every news story recieved.</li>
        <li>Currency conversion capabilities for USD, GBP and Euro.</li>
        <li>Text and Voice input.</li>
        <li>Textual, Graphic and Audio output.</li>
      </ul>
    </Section>

    <Divider />

    <Screenshots images={images} />

    <Divider />

    <Pagination
      previousTitle="URL Shortener"
      previousLink="/projects/url-shortener"
      nextTitle="Roller Coaster"
      nextLink="/projects/roller-coaster"
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const images = [
    { src: '/img/rscbot1.jpg', alt: 'Stock query' },
    {
      src: '/img/rscbot2.jpg',
      alt: 'Hourly newsfeed with natural language processing',
    },
    { src: '/img/rscbot3.jpg', alt: 'Favourites selection' },
    { src: '/img/rscbot4.jpg', alt: 'News query' },
    { src: '/img/rscbot5.jpg', alt: 'Other queries' },
    { src: '/img/rscbot6.jpg', alt: 'Help modal' },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('rscbot'),
    },
  };
};

export default RSCBot;
