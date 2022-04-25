import { useEffect } from 'react';
import Section from '../components/Section';
import Divider from '../components/Divider';
import Chip from '../components/Chip';
import Pagination from '../components/Pagination';
import ImageFigure from '../components/ImageFigure';
import Screenshots from '../components/Screenshots';

export default function Portfolio() {

    useEffect(() => {
        document.title = 'Portfolio - Personal Portfolio Website';
    }, []);

    const images = [
        { src:'/img/portfolio-projects-v1a.jpg', caption:'Portfolio project page version 1' },
        { src:'/img/portfolio-projects-v1b.jpg', caption:'Portfolio about page version 1' },
        { src:'/img/portfolio-projects-v2.jpg', caption:'Portfolio project page version 2' },
        { src:'/img/portfolio-projects-v3.jpg', caption:'Portfolio project page version 3' },
        { src:'/img/portfolio-projects-v4a.jpg', caption:'Portfolio project page upper version 4' },
        { src:'/img/portfolio-projects-v4b.jpg', caption:'Portfolio project page lower version 4' }
    ];

    return (
        <>
        <Section>
            <h1 className='project-title'>Portfolio</h1>
            <p className='text-link-hover my-4'><time dateTime='2016-12'>December 2016</time> - <time dateTime='2022-05'>March 2022</time></p>
            <p className='mb-4'>Personal portfolio website created to showcase my projects and technical skills. First created in 2016 as a simple static HTML website, the website has experienced multiple improvements over the years including migration to PHP, then to React with Materialize, and most recently to React with Tailwind.</p>

            <div className='flex flex-row flex-wrap items-center mt-8 gap-4'>
                <Chip name='React' />
                <Chip name='JavaScript' />
                <Chip name='TypeScript' />
                <Chip name='Tailwind' />
                <Chip name='HTML' />
                <Chip name='CSS' />
                <Chip name='Node' />
                <Chip disabled name='PHP' />
                <Chip disabled name='Materialize' />
                <Chip disabled name='Bootstrap' />
                <Chip disabled name='Sass' />
            </div>
        </Section>

        <Divider />

        <ImageFigure image={images[5]} />

        <Divider />

        <Section>
            <h2 className='project-header'>Versions</h2>
            <h3 className='mb-4'><strong>Version 1 (HTML)</strong></h3>
            <ul className='project-list mb-16'>
                <li>The initial version created in <time dateTime='2016-12'>December 2016</time>.</li>
                <li>Simple static site created with HTML, Sass and Bootstrap.</li>
                <li>As additional project pages were added the CSS framework was ported to Materialize.</li>
                <li>This version was never made public.</li>
            </ul>

            <h3 className='mb-4'><strong>Version 2 (PHP)</strong></h3>
            <ul className='project-list mb-16'>
                <li>Rebuilt in PHP to aid code reuse, maintainability, and expand functionality.</li>
                <li>Reusable components such as pagination, navigation bars, footers, and skill progress bars.</li>
                <li>However, these components were not easily maintainable or readable.</li>
                <li><a className='text-link hover:text-link-hover focus:text-link-hover' href='https://github.com/KyleGough/portfolio-php' target='_blank' rel='noopener noreferrer'>GitHub Repository</a></li>
            </ul>

            <h3 className='mb-4'><strong>Version 3 (React with Materialize)</strong></h3>
            <ul className='project-list mb-16'>
                <li>Rebuilt in <time dateTime='2020-05'>May 2020</time> with React due to its benefits and ease of use over PHP.</li>
                <li>Effort taken to replicate most of the previous styling but made specific changes where necessary.</li>
                <li>The app was built starting from an initial create-react-app environment.</li>
                <li>Materialize for UI components.</li>
                <li>Mixture of vanilla CSS and CSS-in-JS for custom styling.</li>
                <li><a className='text-link hover:text-link-hover focus:text-link-hover' href='https://github.com/KyleGough/portfolio-react' target='_blank' rel='noopener noreferrer'>GitHub Repository</a></li>
            </ul>

            <h3 className='mb-4'><strong>Version 4 (React with Tailwind)</strong></h3>
            <ul className='project-list mb-8'>
                <li>Rebuilt in <time dateTime='2022-01'>January 2022</time> with React and TailwindCSS - my preferred CSS framework.</li>
                <li>JavaScript was upgraded to TypeScript to improve code quality, testing and help me learn the language.</li>
                <li>Created custom CSS animations.</li>
                <li>Additional care and consideration into responsiveness, semantic HTML, and SEO.</li>
                <li><a className='text-link hover:text-link-hover focus:text-link-hover' href='https://github.com/KyleGough/portfolio' target='_blank' rel='noopener noreferrer'>GitHub Repository</a></li>
            </ul>
        </Section>

        <Divider />

        <Screenshots images={images} />

        <Divider />
        
        <Pagination
            previousTitle='LucidLab'
            previousLink='/projects/lucidlab'
        />
        </>
    );
}
