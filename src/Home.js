import React, { useState, useEffect, useRef } from 'react';
import Section from './components/Section';
import { Link } from 'react-router-dom';
import Avatar from './img/avatar.png';
import ArrowForward from './icons/ArrowForward';
import ArrowBack from './icons/ArrowBack';

export default function Home() {
    const [carousel, setCarousel] = useState(0);
    const carouselCount = 3;
    const carouselInterval = useRef(null);

    useEffect(() => {
        document.title = 'Portfolio - Kyle Gough';
        carouselInterval.current = setInterval(carouselNext, 10000);
        return () => { clearInterval(carouselInterval.current) };
    }, [])

    const carouselPrevious = () => {
        setCarousel(carousel => (((carousel - 1) % carouselCount) + carouselCount) % carouselCount);
    }

    const carouselNext = () => {
        setCarousel(carousel => (carousel + 1) % carouselCount);
    }

    return (
        <>
        <div className={`flex justify-center items-center h-[50vh] relative`}>
            <div className={`absolute top-0 left-0 w-full h-full bg-header1 bg-fixed bg-center bg-cover duration-2000 transition-opacity ${carousel === 0 ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute top-0 left-0 w-full h-full bg-header2 bg-fixed bg-center bg-cover duration-2000 transition-opacity ${carousel === 1 ? 'opacity-100' : 'opacity-0'}`}></div>   
            <div className={`absolute top-0 left-0 w-full h-full bg-header3 bg-fixed bg-center bg-cover duration-2000 transition-opacity ${carousel === 2 ? 'opacity-100' : 'opacity-0'}`}></div>   
            <div className='container z-50'>
                <div className='flex justify-between'>
                    <button onClick={carouselPrevious}><ArrowBack className='cursor-pointer w-16 h-16 fill-white opacity-75 hover:opacity-100 focus:opacity-100' /></button>
                    <button onClick={carouselNext}><ArrowForward className='cursor-pointer w-16 h-16 fill-white opacity-75 hover:opacity-100 focus:opacity-100' /></button>
                </div>
            </div>         
        </div>

        <header className='bg-nav-light text-white'>
            <Section>
                <div className='flex items-center text-center justify-center -mt-[8rem] lg:-mt-[11rem] mb-12'>
                    <img className='rounded-full bg-gradient-to-r from-link via-sky-600 to-link border-2 border-link h-36 w-36 lg:h-48 lg:w-48 text-center drop-shadow' src={Avatar} alt='Avatar' />
                </div>
                <div className='grid grid-cols-12'>
                    <div className='col-span-12 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10 text-white mb-8'>                    
                        <p>
                            <span className='uppercase opacity-75'>Welcome</span>
                            <span className='opacity-50'> &#47;&#47; </span>
                            <span className='opacity-50 text-xs'>About Me</span>
                        </p>
                        <p>Technology analyst at Bank of America and Computer Science MEng graduate of Warwick University. Programmer and Web Developer with interests in Bouldering, Cycling, Guitar, Movies and Physics.</p>                
                    </div>
                    <div className='col-span-12 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10'>    
                        <div className='flex justify-center gap-4 md:gap-8 mt-8 text-white'>
                            <Link to='/projects' className='home-project-link text-link hover:text-link-hover focus:text-link-hover fill-link hover:fill-link-hover focus:fill-link-hover font-bold text-xl flex items-center'>
                                <p>Projects</p>
                                <ArrowForward className='w-6 h-6 mt-[3px]' />
                            </Link>
                        </div>                              
                    </div>
                </div>
            </Section>
        <hr className='mt-8 mx-16 h-px bg-nav-light opacity-25' />
        </header>
        </>
    );
}
