import { RestartIcon, SendIcon, TickIcon } from '@components/Icons';
import { clsx } from 'clsx';
import React from 'react';

import { EmailStatus } from '../Contact.types';

interface ContactSendButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  status: EmailStatus;
}

const iconWrap = clsx(
  'inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center opacity-55',
  'transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
  'motion-reduce:transition-none',
  'motion-safe:enabled:group-hover:translate-x-1 motion-safe:enabled:group-focus-visible:translate-x-1',
  'motion-safe:enabled:group-hover:opacity-100 motion-safe:enabled:group-focus-visible:opacity-100'
);

export const ContactSendButton: React.FC<ContactSendButtonProps> = ({
  onClick,
  status,
}) => {
  const getButtonStyle = (status: EmailStatus) => {
    switch (status) {
      case EmailStatus.SENT:
        return 'cursor-default border-white/20 text-link-hover';
      case EmailStatus.LOADING:
        return 'cursor-wait border-white/15 text-disabled';
      case EmailStatus.FAIL:
        return 'cursor-pointer border-error text-error';
      default:
        return clsx(
          'cursor-pointer border-white/25 text-link',
          'enabled:hover:text-link-hover enabled:focus-visible:text-link-hover'
        );
    }
  };

  const getButtonText = (status: EmailStatus) => {
    if (status === EmailStatus.SENT) {
      return 'Message Sent';
    } else if (status === EmailStatus.FAIL) {
      return 'Message Failed';
    } else {
      return 'Send Message';
    }
  };

  const inactive = status === EmailStatus.SENT || status === EmailStatus.LOADING;
  const tone = status === EmailStatus.IDLE ? 'idle' : 'other';

  return (
    <button
      id="submit"
      type="button"
      data-tone={tone}
      disabled={inactive}
      onClick={onClick}
      className={clsx(
        'contact-send-cta group relative mx-auto my-8 flex w-full max-w-md items-center justify-center gap-2.5',
        'rounded-lg border-2 bg-background px-5 py-3.5',
        'font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.2em]',
        'shadow transition-[color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'motion-reduce:transition-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link-hover focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        getButtonStyle(status)
      )}
    >
      <span>{getButtonText(status)}</span>
      {status === EmailStatus.IDLE && (
        <span aria-hidden className={iconWrap}>
          <SendIcon className="h-full w-full fill-current" />
        </span>
      )}
      {status === EmailStatus.SENT && (
        <span aria-hidden className={iconWrap}>
          <TickIcon className="h-full w-full fill-current" />
        </span>
      )}
      {status === EmailStatus.FAIL && (
        <span aria-hidden className={iconWrap}>
          <RestartIcon className="h-full w-full fill-current" />
        </span>
      )}
      {status === EmailStatus.LOADING && (
        <span aria-hidden className={clsx(iconWrap, 'opacity-100')}>
          <RestartIcon className="h-full w-full animate-spin fill-current" />
        </span>
      )}
    </button>
  );
};
