import axios from 'axios';
import React, { useState } from 'react';

import { FadeIn } from '../FadeIn';
import { getFieldBorderStyle,validateEmail } from './Contact.helper';
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

    validator(Boolean(name), setNameError);
    validator(Boolean(email), setEmailError);
    validator(validateEmail(email), setEmailValidError);
    validator(Boolean(message), setMessageError);

    if (!validForm) {
      setStatus(EmailStatus.IDLE);
      event.currentTarget.blur();
      return;
    }

    // Send Email.
    axios
      .post('/api/sendMessage', {
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

  return (
    <div className="flex justify-center">
      <fieldset>
        <legend className="font-thin text-6xl text-center w-full mb-16 text-nav-light">
          Contact Me
        </legend>

        <FadeIn>
          <ContactLabel valid={!nameError} htmlFor="name">
            Name
          </ContactLabel>
          <ContactFieldError show={nameError} message="Required!" />
          <input
            onChange={onNameChange}
            className={`${getFieldBorderStyle(nameError)}
                        transition-colours duration-200 outline-none mt-2 mb-8 block px-4 py-2
                        w-full xs:w-field border-2 rounded-2xl shadow outline-1 caret-link-hover bg-background`}
            type="email"
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
          <ContactFieldError show={emailError} message="Required!" />
          <ContactFieldError show={emailValidError} message="Invalid Email!" />
          <input
            onChange={onEmailChange}
            className={`${getFieldBorderStyle(emailError || emailValidError)}
                        transition-colours duration-200 outline-none mt-2 mb-8 block px-4 py-2
                        w-full xs:w-field border-2 rounded-2xl shadow outline-1 caret-link-hover bg-background`}
            type="text"
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
          <ContactFieldError show={messageError} message="Required!" />
          <textarea
            onChange={onMessageChange}
            className={`${getFieldBorderStyle(messageError)}
                        transition-colours duration-200 mt-2 mb-8 block resize-none px-4 py-2
                        border-2 border-link focus:border-link-hover rounded-2xl shadow
                        w-full xs:w-field outline-none caret-link-hover max-h-48 h-48 bg-background`}
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
    </div>
  );
};
