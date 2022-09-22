import { clsx } from 'clsx';
import React from 'react';

import { RestartIcon, SendIcon, TickIcon } from '../../../icons';
import { EmailStatus } from '../Contact.types';

interface ContactSendButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  status: EmailStatus;
}

export const ContactSendButton: React.FC<ContactSendButtonProps> = ({
  onClick,
  status,
}) => {
  const getButtonStyle = (status: EmailStatus) => {
    switch (status) {
      case EmailStatus.SENT:
        return 'text-link-hover border-link-hover cursor-default';
      case EmailStatus.LOADING:
        return 'text-disabled border-link-disabled cursor-default';
      case EmailStatus.FAIL:
        return 'text-error border-error';
      default:
        return 'text-link hover:text-link-hover focus:text-link-hover border-link hover:border-link-hover focus:border-link-hover';
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

  return (
    <button
      onClick={onClick}
      className={clsx(
        getButtonStyle(status),
        'group flex items-center',
        'mx-auto my-8 px-12 py-4',
        'bg-background',
        'rounded-full border-2',
        'shimmer shadow'
      )}
      type="submit"
    >
      {getButtonText(status)}
      {status === EmailStatus.IDLE && (
        <SendIcon className="ml-4 w-6 h-6 fill-link group-hover:fill-link-hover group-focus:fill-link-hover" />
      )}
      {status === EmailStatus.SENT && (
        <TickIcon className="ml-4 w-6 h-6 fill-link-hover" />
      )}
      {status === EmailStatus.FAIL && (
        <RestartIcon className="ml-4 w-6 h-6 fill-error " />
      )}
      {status === EmailStatus.LOADING && (
        <RestartIcon className="ml-4 w-6 h-6 fill-disabled animate-spin" />
      )}
    </button>
  );
};
