import React, { useEffect } from 'react';
import { Divider } from './components/Divider';
import { Section } from './components/Section';

export default function About() {
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
          Last Revised: 17th January 2022
        </p>
      </Section>

      <Divider />

      <Section>
        <h2 className="text-2xl mb-4">Personal Data</h2>
        <ul className="list-disc list-outside ml-4 mb-16 max-w-reading">
          <li>Your data is not stored by myself or by any third party.</li>
        </ul>

        <h2 className="text-2xl mb-4">Cookies</h2>
        <ul className="list-disc list-outside ml-4 mb-16 max-w-reading">
          <li>No cookies are in use on this website.</li>
        </ul>

        <h2 className="text-2xl mb-4">Changes to This Privacy Policy</h2>
        <ul className="list-disc list-outside ml-4 mb-8 max-w-reading">
          <li>
            Although this privacy policy is unlikely to change, new changes to
            the privacy policy will be reflected on this page and are effective
            immediately.
          </li>
        </ul>
      </Section>
    </>
  );
}
