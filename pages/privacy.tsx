import { Divider } from '@components/Divider';
import { Layout } from '@components/Layout';
import { Section } from '@components/Section';
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <Layout title="Privacy Policy - Kyle Gough">
      <Section>
        <h1 className="project-title text-center md:text-left">
          Privacy Policy
        </h1>
        <p className="mt-4 text-link-hover text-center md:text-left">
          Last Revised: <time dateTime="2022-01-17">3rd November 2022</time>
        </p>
        <p className="mt-4 max-w-reading">
          This Privacy Policy outlines what information is collected from you as
          a user, how your information is collected, and it is used. In short
          summary: Any data you voluntarily submit via the contact form will be
          collected and stored.
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
        <p className="mb-16 max-w-reading">
          This website does not use or store any cookies.
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
    </Layout>
  );
};

export default Privacy;
