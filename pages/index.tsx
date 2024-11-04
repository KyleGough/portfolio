import { Carousel } from '@components/Carousel';
import { Contact } from '@components/Contact';
import { ArrowForwardIcon } from '@components/Icons';
import { Layout } from '@components/Layout';
import { ProjectCard } from '@components/ProjectCard';
import { Section } from '@components/Section';
import { TimelineWidget } from '@components/TimelineWidget';
import { useObserveElement } from '@hooks/useObserveElement';
import { useTypewriter } from '@hooks/useTypewriter';
import imageCaveExploration from '@image/card-cave-exploration.jpg';
import imageSudoku from '@image/card-sudoku.jpg';
import imageHeader1 from '@image/header1.jpg';
import imageHeader2 from '@image/header2.jpg';
import imageHeader3 from '@image/header3.jpg';
import imageMars from '@image/mars.png';
import CPlusPlusLogo from '@image/skill/cplusplus.svg';
import PythonLogo from '@image/skill/python.svg';
import TypescriptLogo from '@image/skill/typescript.svg';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Home: React.FC = () => {
  const welcomeMsg =
    'Front-End Engineer based in London, with strong interests in web development and over a decade of experience coding. Feel free to browse my projects.';
  const typewriterRef = useTypewriter<HTMLParagraphElement>(
    welcomeMsg,
    35,
    1500
  );
  const zws = '​'; // Zero-width space.
  const [imageRef, isVisible] = useObserveElement<HTMLDivElement>({
    threshold: 0.5,
  });

  const backgrounds = [imageHeader1, imageHeader2, imageHeader3];

  return (
    <Layout title="Portfolio - Kyle Gough">
      <Carousel backgrounds={backgrounds}>
        <div className="block lg:flex items-center justify-around w-full">
          <h1 className="slide-in text-7xl sm:text-8xl lg:text-9xl font-sans tracking-tighter px-8 mb-12 lg:mb-0">
            Hello, I&apos;m Kyle.
          </h1>
          <p className="text-left text-2xl font-thin max-w-[38ch] lg:w-[38ch] md:h-32 h-40 lg:h-32 font-sans mx-auto px-8 lg:mx-0">
            <span
              ref={typewriterRef}
              className="text-xl md:text-2xl text-left sans-serif"
            ></span>
            <span className="fade-in caret-blink">{zws}</span>
          </p>
        </div>
      </Carousel>

      <div className="bg-circuits min-h-screen flex items-center border-y border-divider">
        <Section>
          <h2 className="font-semibold text-6xl text-center mt-24 text-header">
            Project Showcase
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 mb-8 px-4">
            <ProjectCard
              image={imageSudoku}
              alt="Logical Sudoku Solver Project Card"
              date={{
                month: 1,
                year: 2020,
              }}
              link="/projects/sudoku"
              logo={PythonLogo as string}
              logoAlt="Python Logo"
            />
            <ProjectCard
              className="md:delay-100"
              image={imageMars}
              alt="Solar System Modal Project Card"
              date={{
                month: 7,
                year: 2023,
              }}
              link="/projects/solar-system"
              logo={TypescriptLogo as string}
              logoAlt="TypeScript Logo"
            />
            <ProjectCard
              className="md:delay-200"
              image={imageCaveExploration}
              alt="Cave Exploration Project Card"
              date={{
                month: 4,
                year: 2019,
              }}
              link="/projects/cave-exploration"
              logo={CPlusPlusLogo as string}
              logoAlt="C++ Logo"
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
          <h2 className="font-semibold text-6xl text-center mt-16 text-header max-w-reading">
            Work Experience
          </h2>
          <TimelineWidget />
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
                <Image
                  src="/img/avatar.png"
                  alt="Avatar"
                  width={240}
                  height={240}
                />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </Layout>
  );
};

export default Home;
