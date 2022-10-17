import React, { useEffect } from 'react';

import { Divider } from '../../components/Divider';
import { GoalListItem, Progress } from '../../components/GoalListItem';
import { LabelledLogo } from '../../components/LabelledLogo';
import { Section } from '../../components/Section';
import { SkillList } from '../../components/SkillList';
import { ArrowForwardIcon } from '../../icons';
import ActionsLogo from '../../img/github-actions.svg';
import HaskellLogo from '../../img/haskell.svg';
import HerokuLogo from '../../img/heroku.svg';
import JqueryLogo from '../../img/jquery.svg';
import LatexLogo from '../../img/latex.svg';
import MaterializeLogo from '../../img/materialize.svg';
import MatlabLogo from '../../img/matlab.svg';
import NodeLogo from '../../img/node.svg';
import PHPLogo from '../../img/php.svg';
import RubyLogo from '../../img/ruby.svg';
import SQLLogo from '../../img/sql.svg';
import WebixLogo from '../../img/webix.svg';
import { skillsOther } from './SkillsOther';
import { skillsProgramming } from './SkillsProgramming';
import { skillsWeb } from './SkillsWeb';

interface IBookImage {
  isbn: string;
  title: string;
  size?: 'S' | 'M' | 'L';
}

const BookImage: React.FC<IBookImage> = ({ isbn, title, size = 'L' }) => {
  return (
    <img
      className="h-80 rounded-sm"
      src={`https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`}
      alt={title}
    />
  );
};

export const About: React.FC = () => {
  useEffect(() => {
    document.title = 'About Me - Kyle Gough';
  }, []);

  return (
    <>
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
          <LabelledLogo name="MATLAB" logo={MatlabLogo} />
          <LabelledLogo name="jQuery" logo={JqueryLogo} />
          <LabelledLogo name="Materialize" logo={MaterializeLogo} />
          <LabelledLogo name="Webix" logo={WebixLogo} />
          <LabelledLogo name="Heroku" logo={HerokuLogo} />
          <LabelledLogo name="SQL" logo={SQLLogo} />
          <LabelledLogo name="LaTeX" logo={LatexLogo} />
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
          <GoalListItem name="Extension API" progress={Progress.AMBER} />
          <GoalListItem name="Next.js" progress={Progress.RED} />
          <GoalListItem name="Web Sockets" progress={Progress.RED} />
          <GoalListItem name="Docker" progress={Progress.RED} />
        </ul>
      </Section>

      <Divider />

      <Section>
        <h2 className="project-header text-center md:text-left">Books</h2>
        <div className="flex gap-4">
          <BookImage isbn="9780380440658" title="Foundation" />
          <BookImage isbn="9780857501004" title="" />
        </div>
      </Section>
    </>
  );
};
