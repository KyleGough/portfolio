import React, { useEffect } from 'react';

import { Divider } from '../../../components/Divider';
import { ImageFigure } from '../../../components/ImageFigure';
import { Pagination } from '../../../components/Pagination';
import { ProjectHeader } from '../../../components/ProjectHeader';
import { Screenshots } from '../../../components/Screenshots';
import { Section } from '../../../components/Section';
import { getProjectData } from '../../../data';
import images from './images.json';

const project = getProjectData('bookmark-labeller');

export const BookmarkLabeller: React.FC = () => {
  useEffect(() => {
    document.title = 'Bookmark Labeller Extension';
  }, []);

  return (
    <>
      <ProjectHeader project={project} />

      <Divider />

      <ImageFigure image={images[0]} />

      <Divider />

      <Section>
        <h2 className="project-header">Inspiration</h2>
        <p className="max-w-reading">
          I created this browser extension for two reasons: I often found myself
          labelling bookmarks for work such as marking PRs as merged, open, or
          closed and wanted a simpler way to achieve this. Secondly, I wanted to
          learn and experiment with the WebExtensions API. My hope is that
          people other than myself can find this extension useful.
        </p>
      </Section>

      <Divider />

      <Section>
        <h2 className="project-header">Features</h2>
        <ul className="project-list">
          <li>
            Lightweight and minimalistic &#40;<strong>13.2 KB</strong>&#41;
          </li>
          <li>Quickly label current bookmark from the extension popup</li>
          <li>Label bookmarks and folders with the context menu</li>
          <li>Customise favourite emojis</li>
        </ul>
      </Section>

      <Divider />

      <Screenshots images={images} />

      <Divider />

      <Pagination
        previousTitle="Portfolio"
        previousLink="/projects/portfolio"
      />
    </>
  );
};
