import { Divider } from '@components/Divider';
import { Layout } from '@components/Layout';
import { Link } from '@components/Link';
import { Section } from '@components/Section';
import React from 'react';

const NotFound: React.FC = () => (
  <Layout title="404 Page Not Found - Kyle Gough">
    <Section>
      <h1 className="mt-12 tracking-tight text-9xl font-extrabold text-center">
        404
      </h1>
      <h2 className="mb-8 tracking-tight text-6xl font-extrabold text-center">
        Page Not Found
      </h2>
    </Section>

    <Divider />

    <Section>
      <p className="text-center md:text-left mb-4">
        The requested page does not exist. You can use the following links to
        navigate:
      </p>
      <p className="text-center md:text-left md:ml-4">
        <Link to="/">Return to Homepage</Link>
      </p>
      <p className="text-center md:text-left md:ml-4">
        <Link to="/about">About Me</Link>
      </p>
      <p className="text-center md:text-left md:ml-4">
        <Link to="/projects">Projects</Link>
      </p>
      <p className="text-center md:text-left md:ml-4">
        <Link href="/CV.pdf">CV</Link>
      </p>
      <p className="text-center md:text-left md:ml-4">
        <Link href="https://github.com/KyleGough">GitHub</Link>
      </p>
    </Section>
  </Layout>
);

export default NotFound;
