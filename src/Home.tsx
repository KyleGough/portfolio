import { useState, useEffect, useRef, RefObject } from 'react';
import Section from './components/Section';
import { Link } from 'react-router-dom';
import ArrowForward from './icons/ArrowForward';

function typewrite(txt: string, ref: RefObject<HTMLSpanElement>) {
    if (!ref.current || !txt) {
        return;
    }
    (ref.current as HTMLSpanElement).innerHTML = (ref.current as HTMLSpanElement).innerHTML + txt[0];
    setTimeout(() => typewrite(txt.slice(1), ref), 35);
}

function ProjectChip(props: { name: string }) {
    return (
        <div className='brightness-200 text-xs px-4 py-0.5 h-8 leading-chip rounded-2xl font-extrabold text-chip bg-chip-light'>
            {props.name}
        </div>
    );
}


function ProjectCard(props: { src: string, alt: string, title: string, tagline: string, date: string, link: string, chipText: string }) {
    return (
        <Link to={props.link} className='rounded-2xl overflow-hidden border-2 my-8 border-nav-dark bg-nav-light shadow drop-shadow-lg'>
            <img className='w-full' src={props.src} alt={props.alt} />
            <div className='text-white p-4 font-bold'>
                <h3 className='text-xl font-extrabold mb-4 h-[3.5rem] overflow-hidden'>{props.tagline}</h3>
                <div className='flex justify-between items-center'>
                    <p className='text-sm opacity-80'>{props.date}</p>
                    <ProjectChip name={props.chipText} />
                </div>
            </div>
        </Link>
    );
}

export default function Home() {
    const [carousel, setCarousel] = useState(0);
    const carouselCount: number = 3;
    const carouselInterval = useRef<any>(null);
    const typewriterRef = useRef<HTMLParagraphElement>(null);
    const welcomeMsg = "Full-stack developer based in London, with strong interests in web development and over 8 years experience coding. Feel free to browse my projects.";
    const zws = '​'; // Zero-width space.

    useEffect(() => {
        document.title = 'Portfolio - Kyle Gough';
        carouselInterval.current = window.setInterval(carouselNext, 10000);
        if (typewriterRef.current) {
            (typewriterRef.current as HTMLParagraphElement).innerHTML = '';
            setTimeout(() => {
                typewrite(welcomeMsg, typewriterRef);
            }, 1500);
        }
        return () => { window.clearInterval(carouselInterval.current) };
    }, []);

    const carouselNext = () => {
        setCarousel(carousel => (carousel + 1) % carouselCount);
    }

    return (
        <>
        <div className={`flex justify-center items-center min-h-screen-with-nav relative`}>
            <div className='absolute inset-0 bg-black opacity-50 w-full h-full z-10'></div>
            <div className={`absolute top-0 left-0 w-full h-full bg-header1 bg-fixed bg-center bg-cover duration-2000 transition-opacity ${carousel === 0 ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute top-0 left-0 w-full h-full bg-header2 bg-fixed bg-center bg-cover duration-2000 transition-opacity ${carousel === 1 ? 'opacity-100' : 'opacity-0'}`}></div>   
            <div className={`absolute top-0 left-0 w-full h-full bg-header3 bg-fixed bg-center bg-cover duration-2000 transition-opacity ${carousel === 2 ? 'opacity-100' : 'opacity-0'}`}></div>   
            <div className='z-50'>
                <div className='absolute inset-0 text-white mx-auto text-center flex tracking-tight items-center'>
                    <div className='block lg:flex items-center justify-around w-full'>
                        <p className='slide-in text-7xl sm:text-8xl lg:text-9xl font-serif tracking-tighter px-8 mb-8 lg:mb-0'>Hello, I'm Kyle.</p>
                        <p className='text-left text-2xl font-thin max-w-[38ch] monospace tracking-[-0.10rem] mx-auto px-8 lg:mx-0'>
                            <span className='text-left'>{welcomeMsg}</span>
                            <span className='caret-blink'>{zws}</span>
                        </p>
                    </div>
                </div>
                <div className='absolute right-8 bottom-8'>
                    <Link to='/projects' className='group drop-shadow-lg flex items-center px-12 py-4 bg-background text-link hover:text-link-hover focus:text-link-hover rounded-full border-2 shadow border-link hover:border-link-hover focus:border-link-hover'>
                        <p>Projects</p>
                        <ArrowForward className='float-right ml-4 w-4 h-4 fill-link group-hover:fill-link-hover group-focus:fill-link-hover' />
                    </Link>
                </div>
            </div>  
        </div>

        <div className='bg-circuits min-h-screen flex items-center'>
        <Section>
            <h2 className='font-thin text-6xl text-center mt-24 text-nav-light'>Project Showcase</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 mb-8'>
                <ProjectCard
                    src='/img/card-sudoku.jpg'
                    alt='Logical Sudoku Solver Project Card'
                    title='Logical Sudoku Solver'
                    tagline='Solve expert level Sudoku step-by-step using logical algorithms'
                    date='January 2020'
                    link='/projects/sudoku'
                    chipText='Python'
                />
                <ProjectCard
                    src='/img/card-bsplit.jpg'
                    alt='BSplit Project Card'
                    title='BSplit'
                    tagline='Bill splitter app for organising expenses between friends and housemates'
                    date='March 2017'
                    link='/projects/bsplit'
                    chipText='JavaScript'
                />
                <ProjectCard
                    src='/img/card-cave-exploration.jpg'
                    alt='Cave Exploration Project Card'
                    title='Cave Exploration'
                    tagline='Using Swarm AI to map unexplored cave networks'
                    date='April 2019'
                    link='/projects/cave-exploration'
                    chipText='C++'
                />
            </div>
            <div className='flex justify-center'>
                <Link to='/projects' className='drop-shadow-lg flex items-center shimmer px-12 py-4 bg-background text-link hover:text-link-hover focus:text-link-hover rounded-sm shadow border-light'>All Projects</Link>
            </div>
        </Section>
        </div>
        </>
    );
}
