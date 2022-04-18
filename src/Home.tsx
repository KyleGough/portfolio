import { useState, useEffect, useRef, RefObject } from 'react';
import Section from './components/Section';
import { Link } from 'react-router-dom';
import ArrowForward from './icons/ArrowForward';
import ArrowBack from './icons/ArrowBack';

function typewrite (txt: string, ref: RefObject<HTMLSpanElement>) {
    if (!ref.current || !txt) {
        return;
    }
    (ref.current as HTMLSpanElement).innerHTML = (ref.current as HTMLSpanElement).innerHTML + txt[0];
    setTimeout(() => typewrite(txt.slice(1), ref), 35);
}

export default function Home() {
    const [carousel, setCarousel] = useState(0);
    const carouselCount: number = 3;
    const carouselInterval = useRef<any>(null);
    const typewriterRef = useRef<HTMLSpanElement>(null);
    const welcomeMsg = "Hello, I'm Kyle - a full-stack developer based in London, with strong interests in web development. I've made this website to showcase my projects and applications.";
    const zws = '​'; // Zero-width space.

    useEffect(() => {
        document.title = 'Portfolio - Kyle Gough';
        carouselInterval.current = window.setInterval(carouselNext, 10000);
        if (typewriterRef.current) {
            (typewriterRef.current as HTMLSpanElement).innerHTML = '';
            setTimeout(() => {
                typewrite(welcomeMsg, typewriterRef);
            }, 1500);
        }
        return () => { window.clearInterval(carouselInterval.current) };
    }, []);

    const carouselPrevious = () => {
        setCarousel(carousel => (((carousel - 1) % carouselCount) + carouselCount) % carouselCount);
    }

    const carouselNext = () => {
        setCarousel(carousel => (carousel + 1) % carouselCount);
    }

    return (
        <>
        <div className={`flex justify-center items-center h-screen-with-nav relative`}>
            <div className='absolute inset-0 bg-black opacity-50 w-full h-full z-10'></div>
            <div className={`absolute top-0 left-0 w-full h-full bg-header1 bg-fixed bg-center bg-cover duration-2000 transition-opacity ${carousel === 0 ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute top-0 left-0 w-full h-full bg-header2 bg-fixed bg-center bg-cover duration-2000 transition-opacity ${carousel === 1 ? 'opacity-100' : 'opacity-0'}`}></div>   
            <div className={`absolute top-0 left-0 w-full h-full bg-header3 bg-fixed bg-center bg-cover duration-2000 transition-opacity ${carousel === 2 ? 'opacity-100' : 'opacity-0'}`}></div>   
            <div className='z-50'>
                <div className='absolute items-center text-center text-white justify-center inset-0 mt-8'>
                    <p className='mt-8 mb-8 uppercase opacity-75 leading-[15rem] text-[15rem] tracking-tighter'>Welcome</p>
                    <p className='text-3xl max-w-2xl mx-auto text-left tracking-tight'>
                        <span>{welcomeMsg}</span>
                    </p>
                </div>
                <div className='absolute right-0 bottom-0'>
                    <Link to='/projects' className='group justify-center text-link hover:text-link-hover focus:text-link-hover fill-link hover:fill-link-hover focus:fill-link-hover text-4xl flex items-center mb-8'>
                        <p className='transition-all mr-2 group-hover:mr-4 group-focus:mr-4'>Projects</p>
                        <ArrowForward className='w-8 h-8 mt-[3px]' />
                    </Link>
                </div>
            </div>  
        </div>

        <header className='text-white'>
            <Section>
                <div className='grid grid-cols-12'>
                    <div className='col-span-12 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10 text-white mb-8 h-[12rem] sm:h-[8rem] bg-nav-light p-4 rounded'>
                        <p className='mb-2 monospace uppercase opacity-75 text-xl'>Welcome</p>
                        <p className='monospace'>
                            <span>{welcomeMsg}</span>
                        </p>
                    </div>                              
                </div>
            </Section>
        </header>

        <header className='text-white'>
            <Section>
                <div className='flex items-center text-center justify-center -mt-[8rem] lg:-mt-[11rem] mb-12'>
                    <img className='rounded-full bg-gradient-to-r from-link via-sky-600 to-link border-2 border-link h-36 w-36 lg:h-48 lg:w-48 text-center drop-shadow' src='img/avatar.png' alt='Avatar' />
                </div>
                <div className='grid grid-cols-12'>
                    <div className='col-span-12 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10 text-white mb-8 h-[12rem] sm:h-[8rem] bg-nav-light'>
                        <p className='mb-2 monospace uppercase opacity-75 text-xl'>Welcome</p>
                        <p className='monospace'>
                            <span>{zws}</span>
                            <span ref={typewriterRef}>{welcomeMsg}</span>
                            <span className='caret-blink'></span>
                        </p>
                    </div>                              
                </div>
                <div className='flex justify-center mt-8'>
                    <Link to='/projects' className='group justify-center text-link hover:text-link-hover focus:text-link-hover fill-link hover:fill-link-hover focus:fill-link-hover text-2xl flex items-center mb-8'>
                        <p className='transition-all mr-2 group-hover:mr-4 group-focus:mr-4'>Projects</p>
                        <ArrowForward className='w-6 h-6 mt-[3px]' />
                    </Link>
                </div>
                <div className='flex justify-center'>
                    <Link to='/about' className='group justify-center text-link hover:text-link-hover focus:text-link-hover fill-link hover:fill-link-hover focus:fill-link-hover text-2xl flex items-center'>
                        <p className='transition-all mr-2 group-hover:mr-4 group-focus:mr-4'>About Me</p>
                        <ArrowForward className='w-6 h-6 mt-[3px]' />
                    </Link>
                </div>
            </Section>
        </header>
        </>
    );
}
