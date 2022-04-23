import { Link } from 'react-router-dom';
import ProjectChip from './ProjectChip';

export default function ProjectCard(props: { src: string, alt: string, title: string, tagline: string, date: string, link: string, chipText: string }) {
    return (
        <Link to={props.link} className='rounded-2xl overflow-hidden border-2 border-nav-dark shadow drop-shadow-lg transition-all duration-100 group'>
            <img className='w-full' src={props.src} alt={props.alt} />
            <div className='text-white p-4 font-bold group-hover:brightness-125 group-focus:brightness-125 bg-nav-light'>
                <h3 className='text-xl font-extrabold mb-4 h-[3.5rem] line-clamp-2'>{props.tagline}</h3>
                <div className='flex justify-between items-center'>
                    <p className='text-sm opacity-80'>{props.date}</p>
                    <ProjectChip name={props.chipText} />
                </div>
            </div>
        </Link>
    );
}