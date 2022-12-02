import { FadeIn } from '@components/FadeIn';
import { Endpoints } from '@utilities/endpoints';
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
    if (status === EmailStatus.LOADING || status === EmailStatus.SENT) {
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
      .post(Endpoints.CONTACT, {
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
        <legend className="font-thin text-6xl text-center w-full mb-16 text-nav-light">
          Contact Me
        </legend>

        <FadeIn>
          <ContactLabel valid={!nameError} htmlFor="name">
            Name
          </ContactLabel>
          {nameError && <ContactFieldError message="Required!" />}
          <input
            onChange={onNameChange}
            className={clsx(getFieldBorderStyle(nameError), inputCommonStyles)}
            type="text"
            id="name"
            name="name"
            placeholder="Your name here"
            required
            maxLength={50}
            readOnly={
              status === EmailStatus.LOADING || status === EmailStatus.SENT
            }
          />
        </FadeIn>

        <FadeIn>
          <ContactLabel
            valid={!(emailError || emailValidError)}
            htmlFor="email"
          >
            Email
          </ContactLabel>
          {emailError && <ContactFieldError message="Required!" />}
          {emailValidError && <ContactFieldError message="Invalid Email!" />}
          <input
            onChange={onEmailChange}
            className={clsx(
              getFieldBorderStyle(emailError || emailValidError),
              inputCommonStyles
            )}
            type="email"
            id="email"
            name="email"
            placeholder="Your email here"
            required
            maxLength={254}
            readOnly={
              status === EmailStatus.LOADING || status === EmailStatus.SENT
            }
          />
        </FadeIn>

        <FadeIn>
          <ContactLabel valid={!messageError} htmlFor="message">
            Message
          </ContactLabel>
          {messageError && <ContactFieldError message="Required!" />}
          <textarea
            onChange={onMessageChange}
            className={clsx(
              getFieldBorderStyle(messageError),
              inputCommonStyles,
              'max-h-48',
              'h-48',
              'resize-none'
            )}
            id="message"
            name="message"
            placeholder="Enter your message"
            required
            maxLength={1024}
            readOnly={
              status === EmailStatus.LOADING || status === EmailStatus.SENT
            }
          />
        </FadeIn>

        <FadeIn>
          <ContactSendButton onClick={sendMessage} status={status} />
        </FadeIn>
      </fieldset>
    </form>
  );
};
