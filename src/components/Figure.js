import React from 'react';
import Section from './Section';

export default function Figure(props) {
    return (
        <Section>
            <img className='text-center items-center mx-auto' src={props.image.src} alt={props.image.caption} />
            <p className='my-2 text-sm text-center text-light font-thin'>{props.image.caption}</p>
        </Section>
    );
}