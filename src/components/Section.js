import React from 'react';

export default function Section(props) {
    return (
        <div className='container text-primary py-8 last:pb-16'>
            {props.children}
        </div>
    );
}