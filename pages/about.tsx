import { Divider } from '@components/Divider';
import { Layout } from '@components/Layout';
import { Section } from '@components/Section';
import { SkillList } from '@components/SkillList';
import { TimelineWidget } from '@components/TimelineWidget';
import { skillsProgramming } from '@utilities/skillsProgramming';
import { skillsWeb } from '@utilities/skillsWeb';
import React from 'react';

const About: React.FC = () => {
  return (
    <Layout title="About Me - Kyle Gough" theme="space-gothic">
      <Section>
        <h1 className="mb-8 text-center project-title md:text-left">
          About Me
        </h1>
        <p className="mt-4 mb-8 max-w-reading">
          Hello, I&apos;m Kyle, a Senior Front-End Engineer at Ripjar. I have a
          Master of Engineering degree from Warwick University. My interests lie
          in cycling, guitar, movies, and physics (cosmology and quantum
          mechanics). I enjoy learning and acquiring new skills and putting them
          into practice. Currently I am learning Three.js, and hope to apply
          these newly acquired skills on this website.
        </p>
      </Section>

      <div className="min-h-0 border-y border-divider">
        <Section id="work-experience">
          <h2 className="mb-6 text-center project-header md:mb-8 md:text-left">
            Work Experience
          </h2>
          <TimelineWidget />
        </Section>
      </div>

      <Section id="web-development">
        <h2 className="text-center project-header md:text-left">
          Web Development
        </h2>
        <SkillList skills={skillsWeb} className="progress-web" />
      </Section>

      <Divider />

      <Section id="programming-languages">
        <h2 className="text-center project-header md:text-left">
          Programming Languages
        </h2>
        <SkillList
          skills={skillsProgramming}
          className="progress-programming"
        />
      </Section>
    </Layout>
  );
};

export default About;
