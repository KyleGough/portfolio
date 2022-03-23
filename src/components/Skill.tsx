import { useState, useEffect, useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen';

type SkillProps = {
    type: string,
    progress: string,
    title: string,
    description: string,
    comment: string,
    logo?: string
};

export default function Skill(props: SkillProps) {
    const progressRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(progressRef);
    const [animatedIn, setAnimatedIn] = useState(false);

    useEffect(() => {
        if (!animatedIn && isVisible) {
            (progressRef.current as HTMLDivElement).classList.replace('-translate-x-full', 'translate-x-0');
            setAnimatedIn(true);
        }
    }, [isVisible, animatedIn]);

    return (
        <div className='flex flex-row justify-center py-4'>
            <div className='w-3/12 lg:w-4/12 pt-2'>
                <div className={`progress overflow-hidden ${props.type}`}>
                    <div ref={progressRef} className={`progress-bar transition-transform ease-in-out duration-[1500ms] -translate-x-full ${props.progress}`}></div>
                </div>
            </div>
            <div className='w-9/12 lg:w-8/12 ml-6 flex'>
                <img className='w-8 h-8 mr-4' src={props.logo} alt={`${props.title} logo`} />
                <div>
                    <p><span className='font-extrabold'>{props.title}</span> - <span className='text-sm'>{props.description}</span></p>
                    <p className='text-sm text-link-hover mt-1'>{props.comment}</p>
                </div>
            </div>
        </div>
    );
}
