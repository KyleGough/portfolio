import React, { useEffect } from 'react';
import { Section } from '../../../components/Section';
import { Divider } from '../../../components/Divider';
import { Chip } from '../../../components/Chip';
import { Pagination } from '../../../components/Pagination';
import { ImageFigure } from '../../../components/ImageFigure';
import { Screenshots } from '../../../components/Screenshots';
import images from './images.json';

export const RSCBot: React.FC = () => {
  useEffect(() => {
    document.title = 'RSCBot - Personalisable Trader ChatBot';
  }, []);

  return (
    <>
      <Section>
        <h1 className="project-title">RSCBot</h1>
        <h2 className="project-subtitle">Software Engineering Group Project</h2>
        <p className="text-link-hover my-4">
          <time dateTime="2018-02">February 2018</time> -{' '}
          <time dateTime="2019-03">March 2019</time>
        </p>
        <p className="mb-4 max-w-reading">
          A specialised, personalisable trader chatbot that can fetch data and
          current news on financial stocks and sectors from the FTSE 100 index.
          RSCBot communicates with the user in a natural way, and has been
          designed to identify and adapt to the user&apos;s main interests in
          the stock market, making for a more personal trading experience.
        </p>

        <div className="flex flex-row flex-wrap items-center mt-8 gap-4">
          <Chip name="JavaScript" />
          <Chip name="jQuery" />
          <Chip name="HTML" />
          <Chip name="CSS" />
          <Chip name="Materialize" />
          <Chip disabled name="PHP" />
          <Chip disabled name="SQL" />
        </div>
      </Section>

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
    </>
  );
};
