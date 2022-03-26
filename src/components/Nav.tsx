import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import GitHubIcon from '../icons/GitHubIcon';
import MenuIcon from '../icons/MenuIcon';

export default function Nav() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const menuBtnRef = useRef<HTMLDivElement>(null);
    const mobileNavRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
        // Close mobile nav drawer if user clicks outside nav component.
        const checkClickOutside = (e: MouseEvent) => {
            if (menuBtnRef.current && !menuBtnRef.current.contains(e.target as Node) && mobileNavRef.current && !mobileNavRef.current.contains(e.target as Node)) {
                e.preventDefault();
                closeDrawer();
            }
        }
        // Add listener on mount.
        document.addEventListener('click', checkClickOutside);
        // Remove listener on unmount.
        return () => { document.removeEventListener('click', checkClickOutside) };
    }, []);

    // Toggles opening/closing the mobile nav drawer.
    const toggleDrawer = () => {
        setDrawerOpen(prev => !prev);
    };

    // Closes the mobile nav drawer.
    const closeDrawer = () => {
        setDrawerOpen(false);
    }

    return (
        <nav>
            <div className='flex items-center justify-between flex-wrap bg-nav-light text-white px-2'>
                <div className='flex items-center flex-shrink-0 mr-6'>
                    <Link to='/' className='ml-6'><span className='text-xl tracking-normal'>Kyle Gough</span></Link>
                </div>
                <div ref={menuBtnRef} onClick={toggleDrawer} className='block md:hidden px-6 py-5 border-b-2 border-transparent hover:border-white focus:border-white'>
                    <MenuIcon className='w-6 h-6 fill-white' />
                </div>
                <div className='hidden md:block flex-grow w-auto'>
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
            <div ref={mobileNavRef} className={`${drawerOpen ? '' : 'hidden'} w-full md:hidden flex-grow font-semibold`}>
                <div className='text-link leading-8 bg-background'>
                    <Link onClick={closeDrawer} to='/' className='block hover:text-link-hover focus:text-link-hover py-4 px-8 shadow-sm'>Home</Link>
                    <Link onClick={closeDrawer} to='/projects' className='block hover:text-link-hover focus:text-link-hover py-4 px-8 shadow-sm'>Projects</Link>
                    <Link onClick={closeDrawer} to='/about' className='block hover:text-link-hover focus:text-link-hover py-4 px-8 shadow-sm'>About Me</Link>
                    <a onClick={closeDrawer} href='https://github.com/KyleGough' target='_blank' rel='noopener noreferrer'className='group flex block items-center hover:text-link-hover focus:text-link-hover py-4 px-8 shadow-sm'>
                        <GitHubIcon className='w-6 h-6 mr-2 fill-link group-hover:fill-link-hover group-focus:fill-link-hover' />
                        GitHub
                    </a>
                </div>
            </div>
        </nav>
    );
}
