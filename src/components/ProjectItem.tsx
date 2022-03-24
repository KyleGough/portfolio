import { Link } from 'react-router-dom';
import Section from './Section';

type ProjectItemProps = {
    title: string,
    date: string,
    description: string,
    link: string,
    video?: string,
    src: string,
    alt: string
};



export default function ProjectItem(props: ProjectItemProps) {
    return (
        <>
        <Section>
            <div className='grid grid-cols-12 gap-8'>
                <div className='col-span-12 lg:col-span-7'>
                    <h2 className='mb-4 project-header'>{props.title}</h2>
                    <p className='my-4 text-link-hover'>{props.date}</p>
                    <p className='my-4'>{props.description}</p>
                </div>
                <div className='col-span-12 lg:col-span-5 text-center -mb-8'>
                    <Link className='project-link group' to={props.link}>
                        {
                            props.video ?
                                <video className='w-full border-2 border-link group-hover:border-link-hover rounded-sm' src={props.video} autoPlay={true} loop={true} poster={props.src} />
                            :   <img className='border-2 border-link group-hover:border-link-hover rounded-sm' src={props.src} alt={props.alt} />   
                        }
                        <button className='relative -top-7 px-12 py-3 bg-background text-link group-hover:text-link-hover rounded-sm shadow border-light'>View Project</button>
                    </Link>
                </div>
            </div>
        </Section>
        </>
    );
}
