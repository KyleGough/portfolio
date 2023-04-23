import { Divider } from '@components/Divider';
import { GoalsWidget } from '@components/GoalsWidget';
import { ArrowForwardIcon } from '@components/Icons';
import { LabelledLogo } from '@components/LabelledLogo';
import { Layout } from '@components/Layout';
import { Link } from '@components/Link';
import { Section } from '@components/Section';
import { SkillList } from '@components/SkillList';
import ActionsLogo from '@image/skill/github-actions.svg';
import HaskellLogo from '@image/skill/haskell.svg';
import jQueryLogo from '@image/skill/jquery.svg';
import LaTeXLogo from '@image/skill/latex.svg';
import MaterializeLogo from '@image/skill/materialize.svg';
import MATLABLogo from '@image/skill/matlab.svg';
import NextLogo from '@image/skill/next.svg';
import NodeLogo from '@image/skill/node.svg';
import PHPLogo from '@image/skill/php.svg';
import RubyLogo from '@image/skill/ruby.svg';
import SQLLogo from '@image/skill/sql.svg';
import WebixLogo from '@image/skill/webix.svg';
import { skillsOther } from '@utilities/skillsOther';
import { skillsProgramming } from '@utilities/skillsProgramming';
import { skillsWeb } from '@utilities/skillsWeb';
import React from 'react';

const About: React.FC = () => {
  return (
    <Layout title="About Me - Kyle Gough">
      <Section>
        <h1 className="mb-8 text-center project-title md:text-left">
          About Me
        </h1>
        <p className="mt-4 mb-8 max-w-reading">
          Hello, I&apos;m Kyle, a Front-End Engineer at Ripjar. I have a Master
          of Engineering degree from Warwick University. My interests lie in
          bouldering, cycling, guitar, movies, and physics (cosmology and
          quantum mechanics). I enjoy learning and acquiring new skills and
          putting them into practice. Currently I am learning Three.js, and hope
          to apply these newly acquired skills on this website.
        </p>
        <div className="flex justify-center md:block">
          <Link
            className="flex items-center px-8 py-2 rounded-lg border-2 w-fit group bg-background text-link hover:text-link-hover focus:text-link-hover"
            href="/CV.pdf"
          >
            <p>Read my CV</p>
            <ArrowForwardIcon className="float-right ml-4 w-4 h-4 fill-link group-hover:fill-link-hover group-focus:fill-link-hover" />
          </Link>
        </div>
      </Section>

      <Divider />

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

      <Divider />

      <Section id="other-technologies">
        <h2 className="text-center project-header md:text-left">
          Other Technologies
        </h2>
        <SkillList skills={skillsOther} className="progress-other" />
      </Section>

      <Divider />

      <Section id="additional-experience">
        <h2 className="mb-16 text-center project-header md:text-left">
          Additional Experience
        </h2>
        <div className="grid grid-cols-3 lg:w-4/5 xl:w-3/5 md:grid-cols-6">
          <LabelledLogo name="Node.js" logo={NodeLogo} />
          <LabelledLogo name="Next.js" logo={NextLogo} />
          <LabelledLogo name="PHP" logo={PHPLogo} />
          <LabelledLogo name="Ruby" logo={RubyLogo} />
          <LabelledLogo name="Haskell" logo={HaskellLogo} />
          <LabelledLogo name="MATLAB" logo={MATLABLogo} />
          <LabelledLogo name="GitHub Actions" logo={ActionsLogo} />
          <LabelledLogo name="jQuery" logo={jQueryLogo} />
          <LabelledLogo name="Materialize" logo={MaterializeLogo} />
          <LabelledLogo name="MySQL" logo={SQLLogo} />
          <LabelledLogo name="LaTeX" logo={LaTeXLogo} />
          <LabelledLogo name="Webix" logo={WebixLogo} />
        </div>
      </Section>

      <Divider />

      <GoalsWidget />
    </Layout>
  );
};

export default About;
