import heroStyles from '@components/Hero/Hero.module.css';
import { RestartIcon, SendIcon, TickIcon } from '@components/Icons';
import { clsx } from 'clsx';
import React from 'react';

import { EmailStatus } from '../Contact.types';
import styles from './ContactSendButton.module.css';

interface ContactSendButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  status: EmailStatus;
}

const sendIcon = clsx(styles.sendIcon, 'h-[1.1em] w-[1.1em]');

export const ContactSendButton: React.FC<ContactSendButtonProps> = ({
  onClick,
  status,
}) => {
  const getButtonStyle = (status: EmailStatus) => {
    switch (status) {
      case EmailStatus.SENT:
        return 'cursor-default !border-[oklch(100%_0_0_/_0.2)] !text-[oklch(72%_0.04_280)] opacity-90';
      case EmailStatus.LOADING:
        return 'cursor-wait !border-[oklch(100%_0_0_/_0.12)] !text-[oklch(52%_0.03_280)] opacity-85';
      case EmailStatus.FAIL:
        return 'cursor-pointer !border-error !text-error shadow-[0_0_0_1px_#0003_inset] hover:!text-[#ff4d4d] hover:!border-[#ff4d4d]';
      default:
        return 'cursor-pointer';
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

  const inactive =
    status === EmailStatus.SENT || status === EmailStatus.LOADING;
  const tone = status === EmailStatus.IDLE ? 'idle' : 'other';

  return (
    <button
      id="submit"
      type="button"
      data-tone={tone}
      disabled={inactive}
      onClick={onClick}
      className={clsx(
        'contact-send-cta group relative mx-auto mt-2 mb-6',
        styles.pill,
        heroStyles.ctaButton,
        styles.sendRow,
        'transition-[color,box-shadow,opacity,border-color,filter] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'motion-reduce:transition-none',
        getButtonStyle(status)
      )}
    >
      <span>{getButtonText(status)}</span>
      {status === EmailStatus.IDLE && (
        <span aria-hidden className={sendIcon}>
          <SendIcon className="h-full w-full fill-current" />
        </span>
      )}
      {status === EmailStatus.SENT && (
        <span aria-hidden className={sendIcon}>
          <TickIcon className="h-full w-full fill-current" />
        </span>
      )}
      {status === EmailStatus.FAIL && (
        <span aria-hidden className={sendIcon}>
          <RestartIcon className="h-full w-full fill-current" />
        </span>
      )}
      {status === EmailStatus.LOADING && (
        <span aria-hidden className={sendIcon}>
          <RestartIcon className="h-full w-full animate-spin fill-current" />
        </span>
      )}
    </button>
  );
};
