import { Divider } from '@components/Divider';
import { GoalListItem, Progress } from '@components/GoalListItem';
import { ArrowForwardIcon } from '@components/Icons';
import { LabelledLogo } from '@components/LabelledLogo';
import { Layout } from '@components/Layout';
import { Section } from '@components/Section';
import { SkillList } from '@components/SkillList';
import { skillsOther } from '@utilities/skillsOther';
import { skillsProgramming } from '@utilities/skillsProgramming';
import { skillsWeb } from '@utilities/skillsWeb';
import ActionsLogo from 'public/img/skill/github-actions.svg';
import HaskellLogo from 'public/img/skill/haskell.svg';
import HerokuLogo from 'public/img/skill/heroku.svg';
import jQueryLogo from 'public/img/skill/jquery.svg';
import LaTeXLogo from 'public/img/skill/latex.svg';
import MaterializeLogo from 'public/img/skill/materialize.svg';
import MATLABLogo from 'public/img/skill/matlab.svg';
import NodeLogo from 'public/img/skill/node.svg';
import PHPLogo from 'public/img/skill/php.svg';
import RubyLogo from 'public/img/skill/ruby.svg';
import SQLLogo from 'public/img/skill/sql.svg';
import WebixLogo from 'public/img/skill/webix.svg';
import React from 'react';

const About: React.FC = () => {
  return (
    <Layout title="About Me - Kyle Gough">
      <Section>
        <h1 className="project-title mb-8 text-center md:text-left">
          About Me
        </h1>
        <p className="mt-4 mb-8 max-w-reading">
          Hello, I&apos;m Kyle, a Front-End Engineer at Atom Learning and
          Computer Science MEng graduate of the University of Warwick. Interests
          lie in bouldering, cycling, guitar, movies, and physics. I enjoy
          learning new languages, frameworks and technologies and have pursued
          multiple personal projects putting these skills into practice,
          detailed below.
        </p>
        <div className="flex justify-center md:block">
          <a
            href="/CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit shimmer group flex items-center px-12 py-4 bg-background text-link hover:text-link-hover focus:text-link-hover rounded-full border-2 shadow border-link hover:border-link-hover focus:border-link-hover"
          >
            <p>Read my CV</p>
            <ArrowForwardIcon className="float-right ml-4 w-4 h-4 fill-link group-hover:fill-link-hover group-focus:fill-link-hover" />
          </a>
        </div>
      </Section>

      <Divider />

      <Section id="web-development">
        <h2 className="project-header text-center md:text-left">
          Web Development
        </h2>
        <SkillList skills={skillsWeb} type="progress-web" />
      </Section>

      <Divider />

      <Section id="programming-languages">
        <h2 className="project-header text-center md:text-left">
          Programming Languages
        </h2>
        <SkillList skills={skillsProgramming} type="progress-programming" />
      </Section>

      <Divider />

      <Section id="other-technologies">
        <h2 className="project-header text-center md:text-left">
          Other Technologies
        </h2>
        <SkillList skills={skillsOther} type="progress-other" />
      </Section>

      <Divider />

      <Section id="additional-experience">
        <p className="font-extrabold text-lg text-center md:text-left mb-8 mt-16">
          Additional Experience
        </p>
        <div className="lg:w-4/5 xl:w-3/5 grid md:grid-cols-6 grid-cols-3">
          <LabelledLogo name="Node.js" logo={NodeLogo} />
          <LabelledLogo name="PHP" logo={PHPLogo} />
          <LabelledLogo name="Ruby" logo={RubyLogo} />
          <LabelledLogo name="Haskell" logo={HaskellLogo} />
          <LabelledLogo name="MATLAB" logo={MATLABLogo} />
          <LabelledLogo name="jQuery" logo={jQueryLogo} />
          <LabelledLogo name="Materialize" logo={MaterializeLogo} />
          <LabelledLogo name="Webix" logo={WebixLogo} />
          <LabelledLogo name="Heroku" logo={HerokuLogo} />
          <LabelledLogo name="SQL" logo={SQLLogo} />
          <LabelledLogo name="LaTeX" logo={LaTeXLogo} />
          <LabelledLogo name="GitHub Actions" logo={ActionsLogo} />
        </div>
      </Section>

      <Divider />

      <Section id="goals">
        <h2 className="project-header text-center md:text-left">
          Goals for 2022
        </h2>
        <p className="my-4">
          Here are some languages and technologies I am keen to learn in 2022.
        </p>
        <ul className="list-none mt-8 ml-14">
          <GoalListItem name="TypeScript" progress={Progress.GREEN} />
          <GoalListItem name="ESLint" progress={Progress.GREEN} />
          <GoalListItem name="GitHub Actions" progress={Progress.GREEN} />
          <GoalListItem name="WebExtensions API" progress={Progress.GREEN} />
          <GoalListItem name="Next.js" progress={Progress.GREEN} />
          <GoalListItem name="Rust" progress={Progress.AMBER} />
          <GoalListItem name="Web Sockets" progress={Progress.RED} />
        </ul>
      </Section>
    </Layout>
  );
};

export default About;
