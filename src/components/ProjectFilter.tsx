import React, { useState, useEffect, useRef } from 'react';
import UnfoldIcon from '../icons/Unfold';

function ProjectFilterSelection(props: { value: string, onClick: (a: string) => void }) {
    return (
        <li onClick={() => props.onClick(props.value)} className='hover:text-chip hover:bg-chip-light py-2 px-8 cursor-pointer select-none'>{props.value}</li>
    );
}

export default function ProjectFilter(props: { filter: string, setFilterCallback: (value: string) => void }) {
    const [isOpen, setOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener('click', checkClickOutside);
        console.log('add');
        return () => { console.log('remove'); document.removeEventListener('click', checkClickOutside) };
    }, []);

    // Close dropdown if user clicks outside component.
    const checkClickOutside = (e: MouseEvent) => {
        if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
            e.preventDefault();
            closeDropdown();
        }
    }

    // Sets the value of the filter.
    const setValue = (value: string) => {
        props.setFilterCallback(value);
        closeDropdown();
    }

    // Toggles opening/closing the dropdown list.
    const toggleDropdown = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(prev => !prev);
    }

    // Closes the dropdown list.
    const closeDropdown = () => {
        setOpen(false);
    }

    return (
        <>
        <p className='text-sm mb-2 ml-2 font-bold text-link text-center md:text-left'>Filter Projects</p>
        <div ref={filterRef} className='relative w-64 mx-auto md:mx-0'>
            <button
                onClick={toggleDropdown}
                className='group relative w-full pl-6 pr-12 py-4 cursor-pointer bg-background ring-0 rounded-sm shadow border-light'
                aria-haspopup='listbox'
                aria-expanded={isOpen}
                aria-controls='project-filter-selection'
            >
                <span className='text-link group-hover:text-link-hover float-left'>{props.filter}</span>
                <UnfoldIcon className='w-8 h-8 absolute top-[12px] right-0 flex items-center pr-2 pointer-events-none fill-link group-hover:fill-link-hover' />
            </button>
            <ul
                id='project-filter-selection'
                className={`${isOpen ? 'absolute' : 'hidden'} w-full max-h-[75vh] overflow-y-auto mt-4 py-2 shadow rounded text-link bg-background`}
                role='listbox'
                aria-orientation='vertical'
            >
                <ProjectFilterSelection key='All' onClick={setValue} value='All' />
                <ProjectFilterSelection key='C#' onClick={setValue} value='C#' />
                <ProjectFilterSelection key='C++' onClick={setValue} value='C++' />
                <ProjectFilterSelection key='JavaScript' onClick={setValue} value='JavaScript' />
                <ProjectFilterSelection key='PHP' onClick={setValue} value='PHP' />
                <ProjectFilterSelection key='Python' onClick={setValue} value='Python' />
                <ProjectFilterSelection key='React' onClick={setValue} value='React' />
                <ProjectFilterSelection key='Games/Puzzles' onClick={setValue} value='Games/Puzzles' />
                <ProjectFilterSelection key='Group Projects' onClick={setValue} value='Group Projects' />
                <ProjectFilterSelection key='Web' onClick={setValue} value='Web' />
            </ul>
        </div>
        </>
    );
}