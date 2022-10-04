import React, { useEffect, useRef } from 'react';

import { Divider } from '../../components/Divider';
import { GoalListItem, Progress } from '../../components/GoalListItem';
import { LabelledLogo } from '../../components/LabelledLogo';
import { Section } from '../../components/Section';
import { SkillList } from '../../components/SkillList';
import { UniModuleList } from '../../components/UniModuleList';
import { ArrowForwardIcon } from '../../icons';
import BootstrapLogo from '../../img/bootstrap.png';
import HerokuLogo from '../../img/heroku.png';
import JqueryLogo from '../../img/jquery.png';
import MaterializeLogo from '../../img/materialize.png';
import NodeLogo from '../../img/node.png';
import WebixLogo from '../../img/webix.png';
import { skillsOther } from './SkillsOther';
import { skillsProgramming } from './SkillsProgramming';
import { skillsWeb } from './SkillsWeb';

export const About: React.FC = () => {
  const anchorProgramming = useRef<HTMLDivElement>(null);
  const anchorWeb = useRef<HTMLDivElement>(null);
  const anchorOther = useRef<HTMLDivElement>(null);
  const anchorGoals = useRef<HTMLDivElement>(null);
  const anchorUni = useRef<HTMLDivElement>(null);

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
        <a
          href="/CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit shimmer group flex items-center px-12 py-4 bg-background text-link hover:text-link-hover focus:text-link-hover rounded-full border-2 shadow border-link hover:border-link-hover focus:border-link-hover"
        >
          <p>Read my CV</p>
          <ArrowForwardIcon className="float-right ml-4 w-4 h-4 fill-link group-hover:fill-link-hover group-focus:fill-link-hover" />
        </a>
      </Section>

      <hr className="mt-8 h-px bg-divider" />

      <Section ref={anchorProgramming} id="programming-languages">
        <h2 className="project-header text-center md:text-left">
          Programming Languages
        </h2>
        <SkillList skills={skillsProgramming} type="progress-programming" />
      </Section>

      <Divider />

      <Section ref={anchorWeb} id="web-development">
        <h2 className="project-header text-center md:text-left">
          Web Development
        </h2>
        <SkillList skills={skillsWeb} type="progress-web" />
        <p className="font-extrabold text-lg text-center md:text-left mb-8 mt-16">
          Additional experience in
        </p>
        <div className="grid xl:grid-cols-12 md:grid-cols-6 grid-cols-3">
          <LabelledLogo name="Node.js" logo={NodeLogo} />
          <LabelledLogo name="jQuery" logo={JqueryLogo} />
          <LabelledLogo name="Bootstrap" logo={BootstrapLogo} />
          <LabelledLogo name="Materialize" logo={MaterializeLogo} />
          <LabelledLogo name="Webix" logo={WebixLogo} />
          <LabelledLogo name="Heroku" logo={HerokuLogo} />
        </div>
      </Section>

      <Divider />

      <Section ref={anchorOther} id="other-technologies">
        <h2 className="project-header text-center md:text-left">
          Other Technologies
        </h2>
        <SkillList skills={skillsOther} type="progress-other" />
      </Section>

      <Divider />

      <Section ref={anchorGoals} id="goals">
        <h2 className="project-header text-center md:text-left">
          Goals for 2022
        </h2>
        <p className="my-4">
          Here are some languages and technologies I am keen to learn in 2022.
        </p>
        <ul className="list-none mt-8 ml-14">
          <GoalListItem name="TypeScript" progress={Progress.GREEN} />
          <GoalListItem name="ESLint" progress={Progress.GREEN} />
          <GoalListItem name="Extension API" progress={Progress.AMBER} />
          <GoalListItem name="Next.js" progress={Progress.RED} />
          <GoalListItem name="Web Sockets" progress={Progress.RED} />
          <GoalListItem name="Docker" progress={Progress.RED} />
        </ul>
      </Section>

      <Divider />

      <Section ref={anchorUni} id="university-modules">
        <h2 className="project-header text-center md:text-left">
          University Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <UniModuleList name="Year 1 Modules">
            <li>Programming for Computer Scientists</li>
            <li>Design of Information Structures</li>
            <li>Mathematics for Computer Scientists I</li>
            <li>Mathematics for Computer Scientists II</li>
            <li>Computer Organisation and Architecture</li>
            <li>Professional Skills</li>
            <li>Web Development Technologies</li>
            <li>Computer Security</li>
          </UniModuleList>

          <UniModuleList name="Year 2 Modules">
            <li>Operating Systems and Computer Networks</li>
            <li>Functional Programming</li>
            <li>Database Systems</li>
            <li>Formal Languages</li>
            <li>Algorithms</li>
            <li>Software Engineering</li>
            <li>Logic and Verification</li>
            <li>Cyber Security</li>
          </UniModuleList>

          <UniModuleList name="Year 3 Modules">
            <li>Dissertation</li>
            <li>Mobile Robotics</li>
            <li>Computer Graphics</li>
            <li>Neural Computing</li>
            <li>Machine Learning</li>
            <li>Project Management</li>
            <li>Digital Forensics</li>
          </UniModuleList>

          <UniModuleList name="Year 4 Modules">
            <li>High Peformance Computing</li>
            <li>Group Project</li>
            <li>Image and Video Analysis</li>
            <li>Quantum Computing</li>
            <li>Computational Biology</li>
            <li>Foundations of Data Analytics</li>
            <li>Advanced Computer Security</li>
          </UniModuleList>
        </div>
      </Section>
    </>
  );
};
