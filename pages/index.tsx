import { Contact } from '@components/Contact';
import { Divider } from '@components/Divider';
import { Hero } from '@components/Hero';
import { Layout } from '@components/Layout';
import { MasonryShowcase } from '@components/MasonryShowcase';
import { Section } from '@components/Section';
import { TimelineWidget } from '@components/TimelineWidget';
import { useObserveElement } from '@hooks/useObserveElement';
import { clsx } from 'clsx';
import Image from 'next/image';
import React from 'react';

const Home: React.FC = () => {
  const [imageRef, isVisible] = useObserveElement<HTMLDivElement>({
    threshold: 0.5,
  });

  return (
    <Layout title="Portfolio - Kyle Gough">
      <Hero />
      <MasonryShowcase />
      <Divider />

      <div className="min-h-0 border-t border-divider">
        <Section id="work-experience">
          <h2 className="mb-6 text-center project-header md:mb-8 md:text-left">
            Work Experience
          </h2>
          <TimelineWidget />
        </Section>
      </div>

      <Divider />

      <div className="min-h-screen flex items-center">
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
