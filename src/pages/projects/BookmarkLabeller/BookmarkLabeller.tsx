import React, { useEffect } from 'react';

import { Divider } from '../../../components/Divider';
import { ImageFigure } from '../../../components/ImageFigure';
import { Link } from '../../../components/Link';
import { Pagination } from '../../../components/Pagination';
import { ProjectHeader } from '../../../components/ProjectHeader';
import { Screenshots } from '../../../components/Screenshots';
import { Section } from '../../../components/Section';
import { getProjectData } from '../../../data';
import FirefoxLogo from '../../../img/firefox.svg';
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
        <div className="flex">
          <img className="w-8 h-8 mr-2" src={FirefoxLogo} alt="Firefox Logo" />
          <Link href="https://addons.mozilla.org/en-US/firefox/addon/bookmark-labeller/">
            <p className="text-2xl">
              Install from the Mozilla Add-On Marketplace
            </p>
          </Link>
        </div>
      </Section>

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
          <li>Lightweight and minimalistic</li>
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
        nextTitle="AI Space Telescope"
        nextLink="/projects/ai-space-telescope"
      />
    </>
  );
};
