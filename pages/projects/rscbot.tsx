import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import imageStockQuery from '@image/rscbot1.jpg';
import imageNewsfeed from '@image/rscbot2.jpg';
import imageFavourites from '@image/rscbot3.jpg';
import imageNewsQuery from '@image/rscbot4.jpg';
import imageOther from '@image/rscbot5.jpg';
import imageHelp from '@image/rscbot6.jpg';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import React from 'react';

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

export const getStaticProps: GetStaticProps = () => {
  const images = [
    { imageData: imageStockQuery, alt: 'Stock query' },
    {
      imageData: imageNewsfeed,
      alt: 'Hourly newsfeed with natural language processing',
    },
    { imageData: imageFavourites, alt: 'Favourites selection' },
    { imageData: imageNewsQuery, alt: 'News query' },
    { imageData: imageOther, alt: 'Other queries' },
    { imageData: imageHelp, alt: 'Help modal' },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('rscbot'),
    },
  };
};

export default RSCBot;
