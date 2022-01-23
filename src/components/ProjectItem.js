import React from 'react';
import { Link } from 'react-router-dom';
import Divider from './Divider';
import Section from './Section';

export default function ProjectItem(props) {
    return (
        <>
        <Divider />
        <Section>
            <div className='grid grid-cols-12 gap-8'>
                <div className='col-span-12 lg:col-span-7'>
                    <h2 className='mb-4 project-header'>{props.title}</h2>
                    <p className='my-4 text-link-hover'>{props.date}</p>
                    <p className='my-4'>{props.description}</p>
                </div>
                <div className='col-span-12 lg:col-span-5 text-center -mb-8'>
                    <Link className='project-link' to={props.link}>
                        <img className='border-2 border-link rounded-lg' src={props.src} alt={props.alt} />
                        <button className='relative -top-7 rounded-full border-2 border-disabled bg-gradient-to-r from-link to-sky-600 py-3 px-12 text-white'>View Project</button>
                    </Link>
                </div>
            </div>
        </Section>
        </>
    );
}