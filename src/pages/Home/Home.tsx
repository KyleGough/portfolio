import React, { useState, useEffect, useRef } from 'react';
import useTypewriter from '../../hooks/useTypewriter';
import { Link } from 'react-router-dom';
import { Section } from '../../components/Section';
import { ArrowForward } from '../../icons';
import { ProjectCard } from '../../components/ProjectCard';
import { Contact } from '../../components/Contact';
import { useObserveElement } from '../../hooks/useObserveElement';

export const Home: React.FC = () => {
  const [carousel, setCarousel] = useState(0);
  const carouselCount = 3;
  const carouselInterval = useRef<any>(null);
  const welcomeMsg =
    'Front-End Engineer based in London, with strong interests in web development and over 8 years experience coding. Feel free to browse my projects.';
  const typewriterRef = useTypewriter<HTMLParagraphElement>(
    welcomeMsg,
    35,
    1500
  );
  const zws = '​'; // Zero-width space.
  const [imageRef, isVisible] = useObserveElement<HTMLImageElement>({
    threshold: 0.5,
  });

  useEffect(() => {
    document.title = 'Portfolio - Kyle Gough';
    carouselInterval.current = window.setInterval(carouselNext, 10000);
    return () => {
      window.clearInterval(carouselInterval.current);
    };
  }, []);

  const carouselNext = () => {
    setCarousel((carousel) => (carousel + 1) % carouselCount);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen relative">
        <div className="absolute inset-0 bg-black opacity-70 w-full h-full z-10"></div>
        <div
          className={`absolute top-0 left-0 w-full h-full bg-header1 bg-fixed bg-center bg-cover duration-2000 transition-opacity ${
            carousel === 0 ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        <div
          className={`absolute top-0 left-0 w-full h-full bg-header2 bg-fixed bg-center bg-cover duration-2000 transition-opacity ${
            carousel === 1 ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        <div
          className={`absolute top-0 left-0 w-full h-full bg-header3 bg-fixed bg-center bg-cover duration-2000 transition-opacity ${
            carousel === 2 ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        <div className="z-20 absolute inset-0 text-white mx-auto text-center flex tracking-tight items-center">
          <div className="block lg:flex items-center justify-around w-full">
            <h1 className="slide-in text-7xl sm:text-8xl lg:text-9xl font-sans tracking-tighter px-8 mb-12 lg:mb-0">
              Hello, I&apos;m Kyle.
            </h1>
            <p className="text-left text-2xl font-thin max-w-[38ch] lg:w-[38ch] md:h-32 h-40 lg:h-32 font-sans mx-auto px-8 lg:mx-0">
              <span
                ref={typewriterRef}
                className="text-xl md:text-2xl text-left sans-serif"
              >
                {welcomeMsg}
              </span>
              <span className="fade-in caret-blink">{zws}</span>
            </p>
          </div>
        </div>
        ]
      </div>

      <div className="bg-circuits min-h-screen flex items-center border-y border-divider shadow">
        <Section>
          <h2 className="font-thin text-6xl text-center mt-24 text-nav-light">
            Project Showcase
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 mb-8 px-4">
            <ProjectCard
              className="delay-100 md:delay-0"
              src="/img/card-sudoku.jpg"
              alt="Logical Sudoku Solver Project Card"
              title="Logical Sudoku Solver"
              tagline="Solve expert level Sudoku step-by-step using logical algorithms"
              shortDate="2020-01"
              date="January 2020"
              link="/projects/sudoku"
              chipText="Python"
            />
            <ProjectCard
              className="delay-0 md:delay-100"
              src="/img/card-bsplit.jpg"
              alt="BSplit Project Card"
              title="BSplit"
              tagline="Bill splitter app for organising expenses between friends and housemates"
              shortDate="2017-03"
              date="March 2017"
              link="/projects/bsplit"
              chipText="JavaScript"
            />
            <ProjectCard
              className="delay-0 md:delay-200"
              src="/img/card-cave-exploration.jpg"
              alt="Cave Exploration Project Card"
              title="Cave Exploration"
              tagline="Using Swarm AI to map unexplored cave networks"
              shortDate="2019-04"
              date="April 2019"
              link="/projects/cave-exploration"
              chipText="C++"
            />
          </div>
          <div className="mt-16 flex justify-center">
            <Link
              to="/projects"
              className="shimmer group drop-shadow-lg flex items-center px-12 py-4 bg-background text-link hover:text-link-hover focus:text-link-hover rounded-full border-2 shadow border-link hover:border-link-hover focus:border-link-hover"
            >
              <p>All Projects</p>
              <ArrowForward className="float-right ml-4 w-4 h-4 fill-link group-hover:fill-link-hover group-focus:fill-link-hover" />
            </Link>
          </div>
        </Section>
      </div>

      <div className="bg-accent-blue min-h-screen flex items-center">
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
            <Contact />
            <div className="hidden lg:flex justify-center my-auto">
              <img
                ref={imageRef}
                className={`${
                  isVisible ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-1000 w-64 h-64 rounded-full`}
                src="/img/avatar.png"
                alt="Avatar"
              />
            </div>
          </div>
        </Section>
      </div>
    </>
  );
};
