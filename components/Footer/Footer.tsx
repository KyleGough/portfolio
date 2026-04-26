import { EmailIcon, GitHubIcon, LinkedInIcon } from '@components/Icons';
import { Link } from '@components/Link';
import extruded from '@components/SpaceExtrudedTitle/extrudedTitle.module.css';
import React from 'react';

import { FooterCopyright } from './FooterCopyright';
import { FooterLink } from './FooterLink';

export const Footer: React.FC = () => (
  <footer className="bg-background footer--space-gothic">
    <div className="text-center text-white bg-nav-light">
      <div className="container px-0 pt-12 mx-auto">
        <div className="flex flex-wrap justify-center px-4 w-full">
          <div className="px-6 py-6 w-full text-center lg:w-4/12 lg:text-left">
            <p className="pb-5">
              <span className={extruded.perspectiveWrapFooter}>
                <span className={extruded.footerTitle}>About Me</span>
              </span>
            </p>
            <p className="pb-4">
              Senior Front-End Engineer at Ripjar. Computer Science MEng
              graduate of Warwick University. Programmer and Web Developer with
              interests in Physics, Cycling, Guitar, and Movies.
            </p>
            <div className="flex flex-row justify-center lg:justify-start">
              <Link
                className="flex justify-center group fill-white hover:text-nav-hover hover:fill-nav-hover"
                href="mailto:kylegough98@gmail.com"
              >
                <EmailIcon className="mr-2 w-6 h-6" />
                <p className="ml-1">kylegough98@gmail.com</p>
              </Link>
            </div>
          </div>
          <div className="px-6 py-6 w-full sm:w-6/12 lg:w-4/12">
            <p className="pb-5">
              <span className={extruded.perspectiveWrapFooter}>
                <span className={extruded.footerTitle}>Projects</span>
              </span>
            </p>
            <ul>
              <FooterLink href="/projects">All Projects</FooterLink>
              <FooterLink href="/projects/solar-system">
                Solar System Model
              </FooterLink>
              <FooterLink href="/projects/sudoku">
                Logical Sudoku Solver
              </FooterLink>
              <FooterLink href="/projects/ai-space-telescope">
                AI Space Telescope
              </FooterLink>
              <FooterLink href="/projects/cave-exploration">
                Cave Exploration
              </FooterLink>
            </ul>
          </div>
          <div className="px-6 py-6 w-full sm:w-6/12 lg:w-4/12">
            <p className="pb-5">
              <span className={extruded.perspectiveWrapFooter}>
                <span className={extruded.footerTitle}>Website</span>
              </span>
            </p>
            <ul>
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/projects">Projects</FooterLink>
              <FooterLink href="/privacy">Privacy</FooterLink>
              <li className="flex justify-center text-center">
                <Link
                  className="py-2 group"
                  href="https://github.com/KyleGough"
                  ariaLabel="GitHub Profile"
                >
                  <GitHubIcon className="w-6 h-6 fill-white" />
                </Link>
                <Link
                  className="py-2 ml-2 group"
                  href="https://www.linkedin.com/in/kyle-gough-882467161/"
                  ariaLabel="LinkedIn Profile"
                >
                  <LinkedInIcon className="w-6 h-6 fill-white" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="text-center text-white bg-nav-dark">
      <div className="container px-8 py-6 mx-auto">
        <FooterCopyright />
      </div>
    </div>
  </footer>
);
