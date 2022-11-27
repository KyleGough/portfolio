import { EmailIcon, GitHubIcon, LinkedInIcon } from '@components/Icons';
import React from 'react';

import { FooterLink } from './FooterLink';

export const Footer: React.FC = () => (
  <footer className="bg-background">
    <div className="bg-nav-light text-white text-center">
      <div className="container mx-auto px-0 py-12">
        <div className="w-full flex flex-wrap justify-center px-4">
          <div className="w-full lg:w-4/12 px-6 py-6 text-center lg:text-left">
            <p className="font-header text-xl pb-6">About Me</p>
            <p className="pb-4">
              Front-End Engineer at Atom Learning. Computer Science MEng
              graduate of Warwick University. Programmer and Web Developer with
              interests in Bouldering, Cycling, Guitar, Movies and Physics.
            </p>
            <div className="flex flex-row justify-center lg:justify-start">
              <a
                className="group flex justify-center fill-white hover:text-nav-hover hover:fill-nav-hover"
                href="mailto:kylegough98@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <EmailIcon className="w-6 h-6 mr-2" />
                <p className="ml-1">kylegough98@gmail.com</p>
              </a>
            </div>
          </div>
          <div className="w-full sm:w-6/12 lg:w-4/12 px-6 py-6">
            <p className="font-header text-xl pb-6">Projects</p>
            <ul>
              <FooterLink href="/projects">All Projects</FooterLink>
              <FooterLink href="/projects/sudoku">
                Logical Sudoku Solver
              </FooterLink>
              <FooterLink href="/projects/cave-exploration">
                Cave Exploration
              </FooterLink>
              <FooterLink href="/projects/sorting-algorithm-visualiser">
                Sorting Algorithm Visualiser
              </FooterLink>
              <FooterLink href="/projects/graph-algorithm-visualiser">
                Graph Algorithm Visualiser
              </FooterLink>
              <FooterLink href="/projects/bsplit">BSplit</FooterLink>
            </ul>
          </div>
          <div className="w-full sm:w-6/12 lg:w-4/12 px-6 py-6">
            <p className="font-header text-xl pb-6">Website</p>
            <ul>
              <li>
                <a
                  href="/CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-nav-hover"
                >
                  CV
                </a>
              </li>
              <FooterLink href="/about">About Me</FooterLink>
              <FooterLink href="/projects">Projects</FooterLink>
              <FooterLink href="/privacy">Privacy</FooterLink>
              <li className="text-center flex justify-center">
                <a
                  className="py-2 group"
                  href="https://github.com/KyleGough"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <GitHubIcon className="w-6 h-6 fill-white group-hover:fill-nav-hover" />
                </a>
                <a
                  className="py-2 ml-2 group"
                  href="https://www.linkedin.com/in/kyle-gough-882467161/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInIcon className="w-6 h-6 fill-white group-hover:fill-nav-hover" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-nav-dark text-white text-center">
      <div className="container mx-auto px-8 py-8 opacity-75">
        <p className="opacity-100">© Kyle Gough, 2016 - 2022</p>
      </div>
    </div>
  </footer>
);
