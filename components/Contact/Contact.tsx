import { FadeIn } from '@components/FadeIn';
import axios from 'axios';
import { clsx } from 'clsx';
import React, { useState } from 'react';

import { getFieldBorderStyle, validateEmail } from './Contact.helper';
import { EmailStatus } from './Contact.types';
import { ContactFieldError } from './ContactFieldError';
import { ContactLabel } from './ContactLabel';
import { ContactSendButton } from './ContactSendButton';

export const Contact: React.FC = () => {
  // Form input text content.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Form input error flags.
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailValidError, setEmailValidError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  // Email status.
  const [status, setStatus] = useState(EmailStatus.IDLE);

  const isSent = status === EmailStatus.SENT;
  const isLoading = status === EmailStatus.LOADING;

  // Form field change event handlers.
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError(false);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
    setEmailValidError(false);
  };

  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    setMessageError(false);
  };

  const sendMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    // No action if another request has been made.
    if (isLoading || isSent) {
      event.currentTarget.blur();
      return;
    }

    setStatus(EmailStatus.LOADING);

    // Form validation.
    let validForm = true;

    const validator = (condition: boolean, setError: (a: boolean) => void) => {
      validForm = validForm && condition;
      setError(!condition);
    };

    validator(!!name, setNameError);
    validator(!!email, setEmailError);
    validator(validateEmail(email), setEmailValidError);
    validator(!!message, setMessageError);

    if (!validForm) {
      setStatus(EmailStatus.IDLE);
      event.currentTarget.blur();
      return;
    }

    // Send Email.
    axios
      .post('/api/send', {
        name: name,
        email: email,
        message: message,
      })
      .then(() => {
        setStatus(EmailStatus.SENT);
      })
      .catch(() => {
        setStatus(EmailStatus.FAIL);
      });

    // Unfocus element.
    event.currentTarget.blur();
  };

  const inputCommonStyles = clsx(
    'block shadow',
    'transition-colours duration-200',
    'mt-2 mb-8 px-4 py-2',
    'w-full xs:w-field',
    'border-2 rounded-2xl',
    'outline-none caret-link-hover bg-background'
  );

  return (
    <form className="flex justify-center">
      <fieldset>
        <legend className="font-semibold text-6xl text-center w-full mb-16 text-header">
          Contact Me
        </legend>

        <FadeIn className="group">
          <ContactLabel valid={!nameError} isSent={isSent} htmlFor="name">
            Name
          </ContactLabel>
          {nameError && <ContactFieldError message="Required!" />}
          <input
            onChange={onNameChange}
            className={clsx(
              getFieldBorderStyle(!nameError, isSent),
              inputCommonStyles
            )}
            type="text"
            id="name"
            name="name"
            required
            maxLength={50}
            readOnly={isLoading || isSent}
            data-testid="contact-form-name"
          />
        </FadeIn>

        <FadeIn className="group">
          <ContactLabel
            valid={!(emailError || emailValidError)}
            isSent={isSent}
            htmlFor="email"
          >
            Email
          </ContactLabel>
          {emailError && <ContactFieldError message="Required!" />}
          {emailValidError && <ContactFieldError message="Invalid Email!" />}
          <input
            onChange={onEmailChange}
            className={clsx(
              getFieldBorderStyle(!emailError && !emailValidError, isSent),
              inputCommonStyles
            )}
            type="email"
            id="email"
            name="email"
            required
            maxLength={254}
            readOnly={isLoading || isSent}
            data-testid="contact-form-email"
          />
        </FadeIn>

        <FadeIn className="group">
          <ContactLabel valid={!messageError} isSent={isSent} htmlFor="message">
            Message
          </ContactLabel>
          {messageError && <ContactFieldError message="Required!" />}
          <textarea
            onChange={onMessageChange}
            className={clsx(
              getFieldBorderStyle(!messageError, isSent),
              inputCommonStyles,
              'max-h-48',
              'h-48',
              'resize-none'
            )}
            id="message"
            name="message"
            required
            maxLength={1024}
            readOnly={isLoading || isSent}
            data-testid="contact-form-message"
          />
        </FadeIn>

        <FadeIn>
          <ContactSendButton onClick={sendMessage} status={status} />
        </FadeIn>
      </fieldset>
    </form>
  );
};
