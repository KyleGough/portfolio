import React, { useEffect } from 'react';

import { Divider } from '../../components/Divider';
import { Section } from '../../components/Section';
import { Link } from '../../components/Link';

export const Privacy: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy - Kyle Gough';
  }, []);

  return (
    <>
      <Section>
        <h1 className="project-title text-center md:text-left">
          Privacy Policy
        </h1>
        <p className="mt-4 text-link-hover text-center md:text-left">
          Last Revised: <time dateTime="2022-01-17">25th September 2022</time>
        </p>
        <p className="mt-4 max-w-reading">
          This Privacy Policy outlines what information is collected from you as
          a user, how your information is collected, and it is used. In short
          summary: Google Analytics is used to improve the user experience of
          the website, and any data you voluntarily submit via the contact form
          will be stored.
        </p>
      </Section>

      <Divider />

      <Section>
        <h2 className="text-2xl mb-4">Personal Data</h2>
        <p className="mb-8 max-w-reading">
          The website collects email addresses and name information of any
          visitor that voluntarily submits their information on the contact form
          on the homepage. The website will also store any information you
          voluntarily submit for as long as it makes sense. Your information
          will never be given or sold to third parties.
        </p>

        <h3 className="text-xl my-4">How your personal data is used</h3>
        <ul className="list-disc list-outside ml-4 mb-16 max-w-reading">
          <li>To improve this website.</li>
          <li>
            To reply to you via email in the case of a question when voluntarily
            submitted via the homepage contact form.
          </li>
        </ul>

        <h2 className="text-2xl my-4">Cookies</h2>
        <p className="mb-4 max-w-reading">
          This website does not use or store any cookies other than cookies used
          by Google Analytics. Cookies can be disabled via your web browser,
          this will not affect your experience or performance when using this
          website.
        </p>
        <p className="mb-16 max-w-reading">
          For more information on how Google uses cookies, visit their page on{' '}
          <Link href="https://developers.google.com/analytics/devguides/collection/gtagjs/cookie-usage">
            Cookie Usage
          </Link>
          .
        </p>

        <h2 className="text-2xl my-4">Analytics</h2>
        <p className="mb-4 max-w-reading">
          This website uses Google Analytics to measure and evaluate traffic and
          engagement with the intention to use this information to improve the
          user experience, search-engine optimisation, and for personal
          development.
        </p>
        <p className="mb-16 max-w-reading">
          For more information visit{' '}
          <Link href="https://policies.google.com/technologies/partner-sites">
            Google&apos;s Privacy &amp; Terms
          </Link>
          .
        </p>

        <h2 className="text-2xl mb-4">Changes to This Privacy Policy</h2>
        <p className="mb-16 max-w-reading">
          The privacy policy can be updated at any time without prior notice.
          Any changes to the privacy policy will be reflected on this page and
          are effective immediately.
        </p>

        <h2 className="text-2xl mb-4">Questions</h2>
        <p className="mb-16 max-w-reading">
          If you have any questions, concerns, or remarks about the Privacy
          Policy, please contact me via email.
        </p>
      </Section>
    </>
  );
};
