import { Layout } from '@components/Layout';
import { Link } from '@components/Link';
import { Section } from '@components/Section';
import extruded from '@components/SpaceExtrudedTitle/extrudedTitle.module.css';
import React from 'react';

import styles from './privacy.module.css';

const Privacy: React.FC = () => {
  return (
    <Layout title="Privacy - Kyle Gough">
      <Section>
        <article className={styles.page}>
          <header className={styles.header}>
            <h1 className="projects-list-page-title mb-8 mt-16 text-center md:mt-20 md:text-left">
              <span className={extruded.nameExtruded}>Privacy</span>
            </h1>
            <p className={styles.meta}>
              Last updated <time dateTime="2026-04-25">25 April 2026</time>
            </p>
            <p className="project-subtitle text-xl">
              What this site stores and why. Nothing is sold to advertisers.
            </p>
          </header>

          <div className={styles.content}>
            <section
              className={styles.section}
              aria-labelledby="contact-form-heading"
            >
              <h2 id="contact-form-heading" className="project-header">
                Contact form
              </h2>
              <p className={styles.prose}>
                If you use the form on the homepage, I receive your name, email
                address, and message. I use that only to reply. It is not sold
                and I do not add you to marketing lists. I may keep messages for
                a reasonable time in line with normal email practice.
              </p>
            </section>

            <section
              className={styles.section}
              aria-labelledby="analytics-heading"
            >
              <h2 id="analytics-heading" className="project-header">
                Analytics and hosting
              </h2>
              <p className={styles.prose}>
                The site is hosted on Vercel, which can collect basic traffic
                and performance data so the pages stay fast and reliable. There
                are no advertising or social tracking cookies from this project.
              </p>
            </section>

            <footer className={styles.outro}>
              <p>
                I may update this text; the current version is always on this
                page. Questions: <Link to="/">home page contact form</Link>.
              </p>
            </footer>
          </div>
        </article>
      </Section>
    </Layout>
  );
};

export default Privacy;
