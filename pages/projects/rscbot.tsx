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
      <h2 className="project-header">Project Highlights</h2>
      <ul className="project-list max-w-reading">
        <li>
          <strong>Swift and Precise Responses:</strong> Experience
          lightning-fast answers to all your stock market queries, ensuring
          you&apos;re always in the know.
        </li>
        <li>
          <strong>Tailored News Briefings:</strong> Enjoy hourly news updates on
          your favourite companies and sectors within the FTSE 100 index,
          keeping you well-informed about market developments.
        </li>
        <li>
          <strong>Customised Preferences:</strong> Handpick your favourite
          companies and sectors, then choose your preferred poll rate for each,
          ensuring you receive the information that matters most to you.
        </li>
        <li>
          <strong>Comprehensive Query Options:</strong> Access an extensive list
          of available queries, making it easy to retrieve the precise
          information you need.
        </li>
        <li>
          <strong>AI-Driven Adaptation:</strong> RSCBot&apos;s AI capabilities
          identify and adapt to your main interests in the stock market,
          delivering a personalised trading experience that evolves with you.
        </li>
        <li>
          <strong>Sentiment Analysis:</strong> Gain valuable insights into news
          stories with sentiment analysis on every piece of information
          received, helping you assess market sentiment.
        </li>
        <li>
          <strong>Currency Conversion:</strong> Seamlessly convert between USD,
          GBP, and Euro, simplifying your currency-related tasks.
        </li>
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
