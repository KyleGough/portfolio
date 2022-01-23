import React, { useState } from 'react';

export default function ImageModal(props) {
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

    return (
        <>
        <div className='col-span-12 md:col-span-6 lg:col-span-4'>
            <img onClick={openModal} className='cursor-pointer border-2 border-link hover:border-link-hover' src={props.src} alt={props.caption} />
            <p className='my-2 text-sm text-center text-light font-thin'>{props.caption}</p>
        </div>
        {open ? 
            <div onClick={closeModal} className='fixed bg-opacity-75 h-screen w-full left-0 top-0 flex justify-center items-center bg-black'>
                <div className='bg-white rounded shadow-lg'> 
                    <div className='p-1 items-center justify-center text-center'>
                        <img className='text-center border-2 border-link max-w-full lg:max-w-screen-lg' src={props.src} alt={props.caption} />
                    </div>
                    <div className="items-center text-center w-100 border-t p-3">
                        <p className='my-1 text-sm text-center font-thin'>{props.caption}</p>
                    </div>
                </div>
            </div>
            : <></>
        }
        </>
    );
}