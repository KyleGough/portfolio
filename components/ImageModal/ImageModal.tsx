import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useState } from 'react';

let screenshotLightboxId = 0;

interface ImageModalProps {
  alt: string;
  image: StaticImageData;
}

export const ImageModal: React.FC<ImageModalProps> = ({ image, alt }) => {
  const [open, setOpen] = useState(false);
  const [ids] = useState(() => {
    const n = ++screenshotLightboxId;
    return { dialog: `shot-lightbox-${n}`, title: `shot-title-${n}` };
  });
  const { dialog: dialogId, title: titleId } = ids;

  const openModal = () => setOpen(true);

  const closeModal = () => setOpen(false);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <figure className="screenshot-tile col-span-12 md:col-span-6 lg:col-span-6">
        <button
          type="button"
          onClick={openModal}
          className="group screenshot-tile__trigger"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? dialogId : undefined}
          aria-label={`View larger version: ${alt}`}
        >
          <Image
            className="block h-auto w-full"
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            placeholder="blur"
            blurDataURL={image.blurDataURL}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          {(
            [
              'top-2.5 left-2.5 border-t-2 border-l-2',
              'top-2.5 right-2.5 border-t-2 border-r-2',
              'bottom-2.5 left-2.5 border-b-2 border-l-2',
              'bottom-2.5 right-2.5 border-b-2 border-r-2',
            ] as const
          ).map((corners) => (
            <span
              key={corners}
              className={`pointer-events-none absolute h-3.5 w-3.5 border-link opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-60 group-focus:opacity-70 ${corners}`}
              aria-hidden
            />
          ))}
        </button>
        <figcaption className="screenshot-tile__caption text-sm text-header/80 mt-3 text-left">
          {alt}
        </figcaption>
      </figure>
      {open && (
        <div
          role="dialog"
          id={dialogId}
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={closeModal}
          className="fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-black/80 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-screen-svh-cap overflow-auto rounded-md bg-background shadow-2xl ring-1 ring-header/10"
          >
            <div className="flex items-center justify-center p-1">
              <Image
                className="max-w-full border border-link/20 lg:max-w-screen-lg"
                src={image.src}
                alt={alt}
                width={image.width}
                height={image.height}
                placeholder="blur"
                blurDataURL={image.blurDataURL}
              />
            </div>
            <div className="border-t border-header/10 p-3">
              <p id={titleId} className="text-sm text-header/80 text-center">
                {alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
