import { Link } from 'react-router-dom';
import Section from './Section';

type ProjectItemProps = {
    title: string,
    date: string,
    description: string,
    link: string,
    src: string,
    alt: string
};

export default function ProjectItem(props: ProjectItemProps) {
    return (
        <Section>
            <div className='grid grid-cols-12 gap-8 lg:gap-16'>
                <div className='col-span-12 lg:col-span-7'>
                    <h2 className='mb-4 project-header'>{props.title}</h2>
                    <p className='my-4 text-link-hover'>{props.date}</p>
                    <p className='my-4'>{props.description}</p>
                </div>
                <div className='col-span-12 lg:col-span-5 text-center -mb-8'>
                    <Link className='group relative' to={props.link}>
                        <img loading='lazy' className='border-2 border-white rounded-lg shadow' src={props.src} alt={props.alt} />   
                        <button tabIndex={-1} className='relative -top-[1.6rem] px-12 py-3 bg-background text-link group-hover:text-link-hover group-focus:text-link-hover rounded-sm shadow border-light whitespace-nowrap'>View Project</button>
                    </Link>
                </div>
            </div>
        </Section>
    );
}
