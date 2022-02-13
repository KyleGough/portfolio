import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Divider from './components/Divider';
import Section from './components/Section';

export default function NotFound() {

    useEffect(() => {
        document.title = '404 Page Not Found - Kyle Gough';
    }, [])

    return (
        <>
        <Section>
            <h1 className='mt-12 tracking-tight text-9xl font-extrabold text-center'>404</h1>
            <h2 className='mb-8 tracking-tight text-6xl font-extrabold text-center'>Page Not Found</h2>
        </Section>

        <Divider />

        <Section>            
            <p className='text-center md:text-left mb-4'>The requested page does not exist. You can use the following links to navigate:</p>
            <p className='text-center md:text-left md:ml-4'><Link to='/' className='text-link hover:text-link-hover'>Return to Homepage</Link></p>
            <p className='text-center md:text-left md:ml-4'><Link to='/about' className='text-link hover:text-link-hover'>About Me</Link></p>
            <p className='text-center md:text-left md:ml-4'><Link to='/projects' className='text-link hover:text-link-hover'>Projects</Link></p>
            <p className='text-center md:text-left md:ml-4'><a href='/CV.pdf' target='_blank' rel='noopener noreferrer' className='text-link hover:text-link-hover'>CV</a></p>
            <p className='text-center md:text-left md:ml-4'><a href='https://github.com/KyleGough' target='_blank' rel='noopener noreferrer' className='text-link hover:text-link-hover'>GitHub</a></p>
        </Section>
        </>
    );
}
