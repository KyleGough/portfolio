import React from 'react';
import { Link } from 'react-router-dom';
import Section from './Section';
import ArrowBack from '../icons/ArrowBack';
import ArrowForward from '../icons/ArrowForward';

export default function Pagination(props) {
    const previousClassName = `flex items-center ${props.previousTitle ? 'fill-link text-link hover:fill-link-hover hover:text-link-hover' : 'fill-disabled text-disabled cursor-not-allowed'}`;
    const nextClassName = `flex items-center ${props.nextTitle ? 'fill-link text-link hover:fill-link-hover hover:text-link-hover' : 'fill-disabled text-disabled cursor-not-allowed'}`;

    return (
        <Section>
            <div className='flex justify-between'>
                <Link to={props.previousLink ? props.previousLink : '#'} className={previousClassName}>
                    <ArrowBack className='w-6 h-6' />
                    <div className='text-center ml-4'>
                        <p className='text-sm'>Previous Project</p>
                        <p>{props.previousTitle ? props.previousTitle : '-'}</p>
                    </div>
                </Link>
                <Link to={props.nextLink ? props.nextLink : '#'} className={nextClassName}>
                    <div className='text-center mr-4'>
                        <p className='text-sm'>Next Project</p>
                        <p>{props.nextTitle ? props.nextTitle : '-'}</p>
                    </div>
                    <ArrowForward className='w-6 h-6' />
                </Link>
            </div>
        </Section>
    );
}