import React from 'react';

export default function Skill(props) {
    return (
        <div className='flex flex-row justify-center py-4'>
            <div className='w-3/12 lg:w-4/12 pt-2'>
                <div className={`progress ${props.type}`}>
                    <div className={`progress-bar ${props.progress}`} data-skill={props.progress}></div>
                </div>
            </div>
            <div className='w-9/12 lg:w-8/12 ml-6'>
                <p><span className='font-extrabold'>{props.title}</span> - <span className='text-sm'>{props.description}</span></p>
                <p className='text-sm text-link-hover mt-1'>{props.comment}</p>
            </div>
        </div>
    );
}