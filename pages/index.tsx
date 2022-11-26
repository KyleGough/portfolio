import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { CarouselImage } from '../components/CarouselImage';
import { Contact } from '../components/Contact';
import { Layout } from '../components/Layout';
import { ProjectCard } from '../components/ProjectCard';
import { Section } from '../components/Section';
import { TimelineNode } from '../components/TimelineNode';
import { useObserveElement } from '../hooks/useObserveElement';
import { useTypewriter } from '../hooks/useTypewriter';
import { ArrowForwardIcon } from '../icons';

const Home: React.FC = () => {
  const [carousel, setCarousel] = useState(0);
  const carouselCount = 3;
  const carouselInterval = useRef<NodeJS.Timeout | null>(null);
  const welcomeMsg =
    'Front-End Engineer based in London, with strong interests in web development and over 8 years experience coding. Feel free to browse my projects.';
  const typewriterRef = useTypewriter<HTMLParagraphElement>(
    welcomeMsg,
    35,
    1500
  );
  const zws = '​'; // Zero-width space.
  const [imageRef, isVisible] = useObserveElement<HTMLDivElement>({
    threshold: 0.5,
  });

  useEffect(() => {
    carouselInterval.current = setInterval(carouselNext, 10_000);
    return () => {
      window.clearInterval(carouselInterval.current as NodeJS.Timeout);
    };
  }, []);

  const carouselNext = () => {
    setCarousel((carousel) => (carousel + 1) % carouselCount);
  };

  const carouselImages = {
    cave: 'bg-header1',
    minesweeper: 'bg-header2',
    coaster: 'bg-header3',
  };

  return (
    <Layout title="Portfolio - Kyle Gough">
      <div className="flex justify-center items-center h-screen relative">
        <div className="absolute inset-0 bg-black opacity-70 w-full h-full z-10"></div>
        <CarouselImage bg={carouselImages.cave} show={carousel === 0} />
        <CarouselImage bg={carouselImages.minesweeper} show={carousel === 1} />
        <CarouselImage bg={carouselImages.coaster} show={carousel === 2} />
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
      </div>

      <div className="bg-circuits min-h-screen flex items-center border-y border-divider">
        <Section>
          <h2 className="font-thin text-6xl text-center mt-24 text-nav-light">
            Project Showcase
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 mb-8 px-4">
            <ProjectCard
              src="/img/card-sudoku.jpg"
              alt="Logical Sudoku Solver Project Card"
              date={{
                month: 1,
                year: 2020,
              }}
              link="/projects/sudoku"
              chipText="Python"
            />
            <ProjectCard
              className="md:delay-100"
              src="/img/ai-space-telescope1.jpg"
              alt="AI Space Telescope Project Card"
              date={{
                month: 11,
                year: 2022,
              }}
              link="/projects/ai-space-telescope"
              chipText="TypeScript"
            />
            <ProjectCard
              className="md:delay-200"
              src="/img/card-cave-exploration.jpg"
              alt="Cave Exploration Project Card"
              date={{
                month: 4,
                year: 2019,
              }}
              link="/projects/cave-exploration"
              chipText="C++"
            />
          </div>
          <div className="mt-16 flex justify-center">
            <Link href="/projects">
              <div className="shimmer group flex items-center px-12 py-4 bg-background text-link hover:text-link-hover focus:text-link-hover rounded-full border-2 shadow border-link hover:border-link-hover focus:border-link-hover cursor-pointer">
                <p>All Projects</p>
                <ArrowForwardIcon className="float-right ml-4 w-4 h-4 fill-link group-hover:fill-link-hover group-focus:fill-link-hover" />
              </div>
            </Link>
          </div>
        </Section>
      </div>

      <div className="min-h-screen flex items-center border-b border-divider shadow">
        <Section>
          <h2 className="font-thin text-6xl text-center mt-16 text-nav-light max-w-reading">
            Work Experience
          </h2>
          <div
            className={clsx(
              'grid grid-cols-1 md:grid-cols-2',
              'my-16 relative',
              'before:absolute before:content-[""] before:h-2/4 before:w-[2px]',
              'before:right-0 md:before:left-2/4',
              'before:bg-gradient-to-t before:from-timeline before:via-timeline before:to-transparent',
              'after:absolute after:content-[""] after:h-2/4 after:w-[2px]',
              'after:top-2/4 after:right-0 md:after:left-2/4',
              'after:bg-gradient-to-b after:from-timeline after:via-timeline after:to-transparent'
            )}
          >
            <TimelineNode
              title="Front-End Engineer"
              company="Atom Learning"
              date="July 2022 - Present"
              align="left"
              logo="/img/atom.png"
            />
            <TimelineNode
              title="Tech Analyst"
              company="Bank of America"
              date="July 2020 - June 2022"
              align="right"
              logo="/img/bofa.png"
            />
            <TimelineNode
              title="Summer Intern"
              company="Bank of America"
              date="June 2019 - August 2019"
              align="left"
              logo="/img/bofa.png"
            />
          </div>
        </Section>
      </div>

      <div className="bg-accent-blue min-h-screen flex items-center">
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
            <Contact />
            <div className="hidden lg:flex justify-center my-auto">
              <div
                ref={imageRef}
                className={clsx(
                  { 'opacity-100': isVisible },
                  { 'opacity-0': !isVisible },
                  'transition-opacity duration-1000 w-64 h-64 rounded-full relative'
                )}
              >
                <Image src="/img/avatar.png" alt="Avatar" layout="fill" />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </Layout>
  );
};

export default Home;