import React, { useState } from 'react';

interface ImageModalProps {
  src: string;
  caption: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, caption }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <figure className="col-span-12 md:col-span-6 lg:col-span-4">
        <img
          loading="lazy"
          onClick={openModal}
          className="cursor-pointer border-2 border-link hover:border-link-hover"
          src={src}
          alt={caption}
        />
        <figcaption className="my-2 text-sm text-center text-light font-thin">
          {caption}
        </figcaption>
      </figure>
      {open && (
        <div
          role="dialog"
          onClick={closeModal}
          className="fixed bg-opacity-75 h-screen w-full left-0 top-0 flex justify-center items-center bg-black"
        >
          <div className="bg-white rounded shadow-lg">
            <div className="p-1 items-center justify-center text-center">
              <img
                loading="lazy"
                className="text-center border-2 border-link max-w-full lg:max-w-screen-lg"
                src={src}
                alt={caption}
              />
            </div>
            <div className="items-center text-center w-100 border-t p-3">
              <p className="my-1 text-sm text-center font-thin">{caption}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
