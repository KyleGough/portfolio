import React, { useState, useEffect } from 'react';
import useObserveElement from '../hooks/useObserveElement';

type SkillProps = {
    type: string,
    progress: number,
    progressClass: string,
    title: string,
    description: string,
    comment: string,
    logo?: string
};

function Skill(props: SkillProps) {
    const [progressRef, isVisible] = useObserveElement<HTMLDivElement>({
        root: null,
        rootMargin: '0px',
        threshold: 0
    });
    const [animatedIn, setAnimatedIn] = useState(false);
    const durationVar = { "--duration-factor": props.progress } as React.CSSProperties;

    useEffect(() => {
        if (!animatedIn && isVisible) {
            (progressRef.current as HTMLDivElement).classList.replace('-translate-x-full', 'translate-x-0');
            setAnimatedIn(true);
        }
    }, [progressRef, isVisible, animatedIn]);

    return (
        <div className='flex flex-row justify-center py-4'>
            <div className='w-3/12 lg:w-4/12 pt-2'>
                <div className={`progress overflow-hidden ${props.type}`}>
                    <div ref={progressRef} className={`custom-duration progress-bar transition-transform ease-in-out -translate-x-full ${props.progressClass}`} style={durationVar}></div>
                </div>
            </div>
            <div className='w-9/12 lg:w-8/12 ml-6 flex'>
                <img loading='lazy' className={`w-8 h-8 mr-4 transition-opacity duration-500 ${animatedIn ? 'opacity-100' : 'opacity-0'}`} src={props.logo} alt={`${props.title} logo`} />
                <div>
                    <p><span className='font-extrabold'>{props.title}</span> - <span className='text-sm'>{props.description}</span></p>
                    <p className='text-sm text-link-hover mt-1'>{props.comment}</p>
                </div>
            </div>
        </div>
    );
}

export default function renderSkills(skills: [string, number, string, string, string, string][], type: string) {
    return skills.map(skill => {
        return (
            <Skill
                key={skill[0]}
                type={type}
                title={skill[0]}
                progress={skill[1]}
                progressClass={skill[2]}
                description={skill[3]}
                comment={skill[4]}
                logo={skill[5]}
            />
        )
    });
}