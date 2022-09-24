import React, { useEffect } from 'react';

import { Divider } from '../../../components/Divider';
import { ImageFigure } from '../../../components/ImageFigure';
import { Pagination } from '../../../components/Pagination';
import { ProjectHeader } from '../../../components/ProjectHeader';
import { Screenshots } from '../../../components/Screenshots';
import { Section } from '../../../components/Section';
import { getProjectData } from '../../../data';
import images from './images.json';

const project = getProjectData('rscbot');

export const RSCBot: React.FC = () => {
  useEffect(() => {
    document.title = 'RSCBot - Personalisable Trader ChatBot';
  }, []);

  return (
    <>
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
    </>
  );
};
