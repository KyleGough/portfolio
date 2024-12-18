import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Link } from '@components/Link';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import imagePopup from '@image/bookmark-labeller.jpg';
import imageFolder from '@image/bookmark-labeller-folder.jpg';
import FirefoxLogo from '@image/firefox.svg';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import React from 'react';

const BookmarkLabeller: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="Bookmark Labeller Extension">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <div className="flex">
        <div className="w-8 h-8 mr-2">
          <Image
            src={FirefoxLogo as string}
            alt="Firefox Logo"
            width={30}
            height={30}
          />
        </div>
        <Link
          className="text-2xl text-link hover:text-link-hover focus:text-link-hover"
          href="https://addons.mozilla.org/en-US/firefox/addon/bookmark-labeller/"
        >
          Install from the Mozilla Add-On Marketplace
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
        learn and experiment with the WebExtensions API. My hope is that people
        other than myself can find this extension useful.
      </p>
    </Section>

    <Divider />

    <Section>
      <h2 className="project-header">Key Features</h2>
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
  </Layout>
);

export const getStaticProps: GetStaticProps = () => {
  const images = [
    {
      imageData: imagePopup,
      alt: 'Bookmark Labeller Extension Popup',
    },
    {
      imageData: imageFolder,
      alt: 'Labelled bookmark folder',
    },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('bookmark-labeller'),
    },
  };
};

export default BookmarkLabeller;
