import React from 'react';
import Section from '../components/Section';
import ImageModal from '../components/ImageModal';

type Props = {
    images: {
        src: string,
        caption: string
    }[]
};

export default function Screenshots(props: Props) {
    return (
        <Section>
            <h2 className='text-3xl mb-12'>Screenshots</h2>
            <div className='grid grid-cols-12 gap-4'>
                {props.images.map((image, i) => {
                    return (
                        <ImageModal key={i} src={image.src} caption={image.caption} />    
                    )
                })}
            </div>
        </Section>
    );
}
