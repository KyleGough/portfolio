import { useState } from 'react';
import { Link } from 'react-router-dom';
import GitHubIcon from '../icons/GitHubIcon';
import MenuIcon from '../icons/MenuIcon';

export default function Nav() {
    const [drawerOpen, setDrawerOpen] = useState(false);
  
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <nav>
            <div className='flex items-center justify-between flex-wrap bg-nav-light text-white px-2'>
                <div className='flex items-center flex-shrink-0 mr-6'>
                    <Link to='/' className='pl-6'><span className='text-xl tracking-normal'>Kyle Gough</span></Link>
                </div>
                <div onClick={toggleDrawer} className='block md:hidden px-6 py-5 border-b-2 border-transparent hover:border-white focus:border-white'>
                    <MenuIcon className='w-6 h-6 fill-white' />
                </div>
                <div className='hidden w-full md:block flex-grow flex items-end w-auto'>
                    <div className='flex-grow text-right'>
                        <Link to='/' className='inline-block px-5 py-5 mt-0 border-b-2 border-transparent hover:border-white focus:border-white'>Home</Link>
                        <Link to='/projects' className='inline-block px-5 py-5 mt-0 border-b-2 border-transparent hover:border-white focus:border-white'>Projects</Link>
                        <Link to='/about' className='inline-block px-5 py-5 mt-0 border-b-2 border-transparent hover:border-white focus:border-white'>About Me</Link>
                    </div>
                </div>
                <a className='hidden md:block px-6 py-5 border-b-2 border-transparent hover:border-white focus:border-white' href='https://github.com/KyleGough' target='_blank' rel='noopener noreferrer'>
                    <GitHubIcon className='w-6 h-6 fill-white' />
                </a>
            </div>
            <div className={`${drawerOpen ? '' : 'hidden'} w-full md:hidden flex-grow font-semibold`}>
                <div className='text-m'>
                    <Link onClick={toggleDrawer} to='/' className='block hover:text-secondary-light text-secondary py-4 px-8 shadow-sm'>Home</Link>
                    <Link onClick={toggleDrawer} to='/projects' className='block hover:text-secondary-light text-secondary py-4 px-8 shadow-sm'>Projects</Link>
                    <Link onClick={toggleDrawer} to='/about' className='block hover:text-secondary-light text-secondary py-4 px-8 shadow-sm'>About Me</Link>
                    <a onClick={toggleDrawer} href='https://github.com/KyleGough' target='_blank' rel='noopener noreferrer'className='block hover:text-secondary-light text-secondary py-4 px-8 shadow-sm'>GitHub</a>
                </div>
            </div>
        </nav>
    );
}
