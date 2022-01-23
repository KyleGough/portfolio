import React, { useEffect } from 'react';
import Section from '../components/Section';
import Divider from '../components/Divider';
import Chip from '../components/Chip';
import Pagination from '../components/Pagination';

export default function QuRVe() {

    useEffect(() => {
        document.title = 'QuRVe';
    }, []);

    return (
        <>
        <Section>
            <h1 className='project-title'>QuRVe</h1>
            <h2 className='project-subtitle'>Bank of America Internship Project</h2>
            <p className='text-link-hover my-4'>June 2019 - August 2019</p>
            <p className='mb-4'>Designed and created an updated UI for the application QuRVe, a credit tech tool using JavaScript, Webix, React and Less. Implemented an interface to retrieve financial instruments data with a configurable dashboard showing graphs, pivot tables and descriptions of selected securities.</p>
            
            <div className='flex flex-row flex-wrap items-center mt-8'>
                <Chip name='React' />
                <Chip name='JavaScript' />
                <Chip name='Webix' />
                <Chip name='Less' />
                <Chip name='CSS' />                
            </div>
        </Section>

        <Divider />
 
        <Pagination
            previousTitle='Cave Exploration'
            previousLink='/projects/cave-exploration'
            nextTitle='React Minesweeper'
            nextLink='/projects/react-minesweeper'
        />
        </>
    );
}