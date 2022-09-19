import React, { useEffect } from 'react';
import { Section } from '../../components/Section';
import { Divider } from '../../components/Divider';
import { Chip } from '../../components/Chip';
import { Pagination } from '../../components/Pagination';
import { ImageFigure } from '../../components/ImageFigure';
import { Screenshots } from '../../components/Screenshots';

export default function URLShortener() {
  useEffect(() => {
    document.title = 'URL Shortener - Shorten Long URLs to Easily Share';
  }, []);

  const images = [
    { src: '/img/url-shortener1.jpg', caption: 'Shortened URL example 1' },
    { src: '/img/url-shortener2.jpg', caption: 'Shortened URL example 2' },
  ];

  return (
    <>
      <Section>
        <h1 className="project-title">URL Shortener</h1>
        <p className="text-link-hover my-4">
          <time dateTime="2017-04">April 2017</time>
        </p>
        <p className="mb-4 max-w-reading">
          A URL shortening tool creating using Node.js, Express.js for routing
          GET and POST requests and MongoDB to store URLs. The project is my
          first using all three of these technologies. Long URLs are stored in
          the database and the ID is encoded and used as the short URL.
        </p>

        <div className="flex flex-row flex-wrap items-center mt-8 gap-4">
          <Chip name="JavaScript" />
          <Chip name="Node" />
          <Chip name="MongoDB" />
          <Chip name="jQuery" />
          <Chip name="HTML" />
          <Chip name="CSS" />
          <Chip name="Materialize" />
        </div>
      </Section>

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
    </>
  );
}
