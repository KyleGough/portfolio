import { Layout } from '@components/Layout';
import { Link } from '@components/Link';
import { Section } from '@components/Section';
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <Layout title="Privacy Policy - Kyle Gough" theme="space-gothic">
      <Section>
        <div className="privacy-page">
          <header className="privacy-page__header">
            <h1 className="project-title">Privacy Policy</h1>
            <p className="privacy-page__meta">
              Last updated{' '}
              <time dateTime="2026-04-25">25 April 2026</time>
            </p>
            <p className="project-subtitle max-w-reading">
              What is collected when you use this site, why it exists, and how
              long it is kept. The short version: data you send through the
              contact form is used to reply to you. Nothing is sold.
            </p>
          </header>

          <div className="privacy-page__body">
            <nav
              className="privacy-page__toc"
              aria-label="Sections on this page"
            >
              <p className="privacy-page__toc-title">On this page</p>
              <ul className="privacy-page__toc-list">
                <li>
                  <a href="#personal-data">Personal data</a>
                </li>
                <li>
                  <a href="#cookies">Cookies and analytics</a>
                </li>
                <li>
                  <a href="#changes">Policy changes</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </nav>

            <div className="privacy-page__main">
              <section
                id="personal-data"
                className="privacy-page__section"
                aria-labelledby="personal-data-heading"
              >
                <h2 id="personal-data-heading" className="project-header">
                  Personal data
                </h2>
                <p className="max-w-reading">
                  The site collects your name, email address, and message when
                  you submit the contact form on the homepage. That information
                  is kept only as long as it is needed to respond and for
                  reasonable record keeping. It is not sold to third parties.
                </p>
                <h3 className="privacy-page__subhead">How it is used</h3>
                <ul className="project-list max-w-reading">
                  <li>To improve site content and clarity.</li>
                  <li>
                    To reply by email when you ask a question through the
                    contact form.
                  </li>
                </ul>
              </section>

              <section
                id="cookies"
                className="privacy-page__section"
                aria-labelledby="cookies-heading"
              >
                <h2 id="cookies-heading" className="project-header">
                  Cookies and analytics
                </h2>
                <p className="max-w-reading">
                  This site does not use advertising or social tracking
                  cookies. Anonymized traffic and performance metrics may be
                  collected by the hosting platform so basic usage can be
                  understood without identifying individuals.
                </p>
              </section>

              <section
                id="changes"
                className="privacy-page__section"
                aria-labelledby="changes-heading"
              >
                <h2 id="changes-heading" className="project-header">
                  Changes to this policy
                </h2>
                <p className="max-w-reading">
                  This policy may be updated. Changes are published on this
                  page and take effect when posted.
                </p>
              </section>

              <section
                id="contact"
                className="privacy-page__section"
                aria-labelledby="contact-heading"
              >
                <h2 id="contact-heading" className="project-header">
                  Contact
                </h2>
                <p className="max-w-reading">
                  Questions about this policy can be sent through the{' '}
                  <Link to="/">contact form on the homepage</Link>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Privacy;
