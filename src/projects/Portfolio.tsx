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
        { src:'/img/portfolio-projects-v4a.png', caption:'Portfolio project page upper version 4' },
        { src:'/img/portfolio-projects-v4b.png', caption:'Portfolio project page lower version 4' }
    ];

    return (
        <>
        <Section>
            <h1 className='project-title'>Portfolio</h1>
            <p className='text-link-hover my-4'><time dateTime='2016-12'>December 2016</time> - <time dateTime='2022-05'>March 2022</time></p>
            <p className='mb-4'>Personal portfolio website created to showcase my projects and technical skills. First created in 2016 as a simple static HTML website, the website has experienced multiple improvements over the years including migration to PHP, then to React with Materialize, and most recently to React with Tailwind.'</p>

            <div className='flex flex-row flex-wrap items-center mt-8'>
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

        <ImageFigure image={images[4]} />

        <Divider />

        <Section>
            <h2 className='project-header'>Versions</h2>
            <h3 className='mb-4'><strong>Version 1 (HTML)</strong></h3>
            <p className='mb-8'>The initial version created in <time dateTime='2016-12'>December 2016</time> and was a simple site created with HTML, Sass and Bootstrap. As additional project pages were added the CSS framework was ported to Materialize. This version was never made public.</p>

            <h3 className='mb-4'><strong>Version 2 (PHP)</strong></h3>
            <p className='mb-8'>The second iteration of the site was rebuilt in PHP to aid maintainability and expand functionality. Using PHP allowed reusable components such as pagination, navigation bars, footers, and skill progress bars. However these components were not easily maintainable or readable. This version's repository can be viewed
                <a href='https://github.com/KyleGough/portfolio' target='_blank' rel='noopener noreferrer'> here</a>.
            </p>

            <h3 className='mb-4'><strong>Version 3 (React with Materialize)</strong></h3>
            <p className='mb-8'>The third iteration was rebuilt again in <time dateTime='2020-05'>May 2020</time> with React due to its benefits and ease of use over PHP. After using React in multiple other projects, I decided to rebuild the site taking effort to replicate most of the previous styling but making specific changes where necessary. The app was built starting from an initial create-react-app environment using Material UI for UI components, a mixture of vanilla CSS and CSS-in-JS for custom styling, and Express.js for the server and routing.</p>

            <h3 className='mb-4'><strong>Version 4 (React with Tailwind)</strong></h3>
            <p className='mb-8'>The current version was rebuilt again in <time dateTime='2022-01'>January 2022</time> with React and TailwindCSS as this became my preferred CSS framework. Additionally, JavaScript was upgraded to TypeScript to improve code quality, testing and help me learn the language.</p>
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
