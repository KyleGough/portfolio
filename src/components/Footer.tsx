import { Link } from 'react-router-dom';
import GitHubIcon from '../icons/GitHubIcon';
import LinkedInIcon from '../icons/LinkedInIcon';
import EmailIcon from '../icons/EmailIcon';

export default function Footer() {
    return (
        <footer className='bg-background'>
            <div className='bg-nav-light text-white text-center'>
                <div className='container mx-auto px-0 py-12'>
                    <div className='w-full flex flex-wrap justify-center px-4'>
                        <div className='w-full lg:w-4/12 px-6 py-6 text-center lg:text-left'>
                            <p className='font-header text-xl pb-6'>About Me</p>
                            <p className='pb-4'>Front-End Engineer at Atom Learning. Computer Science MEng graduate of Warwick University. Programmer and Web Developer with interests in Bouldering, Cycling, Guitar, Movies and Physics.</p>
                            <div className='flex flex-row justify-center lg:justify-start'>
                                <a className='group flex justify-center fill-white hover:text-nav-hover hover:fill-nav-hover' href='mailto:kylegough98@gmail.com' target='_blank' rel='noopener noreferrer'>
                                    <EmailIcon className='w-6 h-6 mr-2' />
                                    <p className='ml-1'>kylegough98@gmail.com</p>
                                </a>
                            </div>
                        </div>
                        <div className='w-full sm:w-6/12 lg:w-4/12 px-6 py-6'>
                            <p className='font-header text-xl pb-6'>Projects</p>
                            <ul>
                                <li><Link to='/projects' className='p-2 hover:text-nav-hover'>All Projects</Link></li>
                                <li><Link to='/projects/sudoku' className='p-2 hover:text-nav-hover'>Logical Sudoku Solver</Link></li>
                                <li><Link to='/projects/cave-exploration' className='p-2 hover:text-nav-hover'>Cave Exploration</Link></li>
                                <li><Link to='/projects/sorting-algorithm-visualiser' className='p-2 hover:text-nav-hover'>Sorting Algorithm Visualiser</Link></li>
                                <li><Link to='/projects/graph-algorithm-visualiser' className='p-2 hover:text-nav-hover'>Graph Algorithm Visualiser</Link></li>
                                <li><Link to='/projects/bsplit' className='p-2 hover:text-nav-hover'>BSplit</Link></li>
                            </ul>
                        </div>
                        <div className='w-full sm:w-6/12 lg:w-4/12 px-6 py-6'>
                            <p className='font-header text-xl pb-6'>Website</p>
                            <ul>
                                <li><a href='/CV.pdf' target='_blank' rel='noopener noreferrer' className='p-1 hover:text-nav-hover'>CV</a></li>
                                <li><Link to='/about' className='p-1 hover:text-nav-hover'>About Me</Link></li>
                                <li><Link to='/projects' className='p-1 hover:text-nav-hover'>Projects</Link></li>
                                <li><Link to='/privacy' className='p-1 hover:text-nav-hover'>Privacy</Link></li>
                                <li className='text-center flex justify-center'>
                                    <a className='py-2 group' href='https://github.com/KyleGough' target='_blank' rel='noopener noreferrer'>
                                        <GitHubIcon className='w-6 h-6 fill-white group-hover:fill-nav-hover' />
                                    </a>
                                    <a className='py-2 ml-2 group' href='https://www.linkedin.com/in/kyle-gough-882467161/' target='_blank' rel='noopener noreferrer'>
                                        <LinkedInIcon className='w-6 h-6 fill-white group-hover:fill-nav-hover' />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-nav-dark text-white text-center'>
                <div className='container mx-auto px-8 py-8 opacity-75'>
                    <p className='opacity-100'>© Kyle Gough, 2016 - 2022</p>
                </div>
            </div>
        </footer>
    );
};