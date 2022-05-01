import React, { ReactNode, useState } from 'react';
import axios from 'axios';
import SendIcon from '../icons/SendIcon';
import RestartIcon from '../icons/RestartIcon';
import TickIcon from '../icons/TickIcon';
import FadeInWrapper from './FadeInWrapper';

function FieldError(props: { show: boolean, message: string }) {
    return (
        <span className={`${props.show ? '' : 'hidden'} transition-opactity duration-200 text-sm text-error`}>{props.message}</span>
    );
}

function Label(props: { valid: boolean, htmlFor: string, children: ReactNode }) {
    return (
        <label className={`${props.valid ? 'text-link' : 'text-error'} transition-colours duration-200 text-lg mt-8 mb-2 mr-2`} htmlFor={props.htmlFor}>{props.children}</label>
    );
}

enum EmailStatus {
    IDLE,
    SENT,
    FAIL,
    LOADING
};

export default function Contact() {
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
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setNameError(false);
    }

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError(false);
        setEmailValidError(false);
    }

    const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        setMessageError(false);
    }

    const validateEmail = (email: string) => {
        //eslint-disable-next-line
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !email || res.test(String(email).toLowerCase());
    }

    const isNotEmpty = (field: string) => {
        return Boolean(field);
    }
  
    const sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
        // No action if another request has been made.
        if (status === EmailStatus.LOADING || status === EmailStatus.SENT) {        
            e.currentTarget.blur();
            return;
        }
              
        setStatus(EmailStatus.LOADING);  

        // Form validation.
        let validForm = true;
        
        const validator = (condition: boolean, setError: (a: boolean) => void) => {
            validForm = validForm && condition;
            setError(!condition);
        }

        validator(isNotEmpty(name), setNameError);
        validator(isNotEmpty(email), setEmailError);
        validator(validateEmail(email), setEmailValidError);
        validator(isNotEmpty(message), setMessageError);
        
        if (!validForm) {           
            setStatus(EmailStatus.IDLE);
            e.currentTarget.blur();
            return;
        }
    
        // Send Email.
        axios.post('/api/sendMessage', {
            name: name,
            email: email,
            message: message
        }).then((res) => {
            console.log('Email Sent');
            setStatus(EmailStatus.SENT);
        }).catch((error) => {   
            setStatus(EmailStatus.FAIL);
        });       
        
        // Unfocus element.
        e.currentTarget.blur();
    }

    return (
        <div className='flex justify-center'>
        <fieldset>
            <legend className='font-thin text-6xl text-center w-full mb-16 text-nav-light'>Contact Me</legend>
          
            <FadeInWrapper>
                <Label valid={!nameError} htmlFor='name'>Name</Label>
                <FieldError show={nameError} message='Required!' />
                <input
                    onChange={onNameChange}
                    className={`${nameError ? 'border-error' : 'border-link focus:border-link-hover'} 
                        transition-colours duration-200 outline-none mt-2 mb-8 block px-4 py-2
                        w-full xs:w-field border-2 rounded-2xl shadow outline-1 caret-link-hover`}
                    type='email'
                    id='name'
                    name='name'
                    placeholder='Your name here'
                    required
                    maxLength={50}
                    readOnly={status === EmailStatus.LOADING || status === EmailStatus.SENT}
                />
            </FadeInWrapper>
        
            <FadeInWrapper>
                <Label valid={!(emailError || emailValidError)} htmlFor='email'>Email</Label>
                <FieldError show={emailError} message='Required!' />
                <FieldError show={emailValidError} message='Invalid Email!' />
                <input
                    onChange={onEmailChange}
                    className={`${emailError || emailValidError ? 'border-error' : 'border-link focus:border-link-hover'} 
                        transition-colours duration-200 outline-none mt-2 mb-8 block px-4 py-2
                        w-full xs:w-field border-2 rounded-2xl shadow outline-1 caret-link-hover`}
                    type='text'
                    id='email'
                    name='email'
                    placeholder='Your email here'
                    required
                    maxLength={254}
                    readOnly={status === EmailStatus.LOADING || status === EmailStatus.SENT}
                />
            </FadeInWrapper>
        
            <FadeInWrapper>
                <Label valid={!messageError} htmlFor='message'>Message</Label>
                <FieldError show={messageError} message='Required!' />
                <textarea
                    onChange={onMessageChange}
                    className={`${messageError ? 'border-error' : 'border-link focus:border-link-hover'} 
                        transition-colours duration-200 mt-2 mb-8 block resize-none px-4 py-2
                        border-2 border-link focus:border-link-hover rounded-2xl shadow
                        w-full xs:w-field outline-none caret-link-hover max-h-48 h-48`}
                    id='message'
                    name='message'
                    placeholder='Enter your message'
                    required
                    maxLength={1024}
                    readOnly={status === EmailStatus.LOADING || status === EmailStatus.SENT}
                />
            </FadeInWrapper>
            
            <FadeInWrapper>
                <button
                    onClick={sendMessage}
                    className={
                        `${status === EmailStatus.SENT ?
                            'text-link-hover border-link-hover cursor-default' 
                        : status === EmailStatus.LOADING ?
                            'text-disabled border-link-disabled cursor-default'
                        : status === EmailStatus.FAIL ?
                            'text-error border-error'
                        : 'text-link hover:text-link-hover focus:text-link-hover border-link hover:border-link-hover focus:border-link-hover'
                        }
                        group my-8 shimmer group flex items-center px-12 py-4 bg-background 
                        rounded-full border-2 shadow mx-auto`
                    }
                    type='submit'
                >
                    {status === EmailStatus.SENT ? 'Message Sent' : status === EmailStatus.FAIL ? 'Message Fail' : 'Send Message'}
                    {status === EmailStatus.IDLE && <SendIcon className='ml-4 w-6 h-6 fill-link group-hover:fill-link-hover group-focus:fill-link-hover' />}
                    {status === EmailStatus.SENT && <TickIcon className='ml-4 w-6 h-6 fill-link-hover' />}
                    {status === EmailStatus.FAIL && <RestartIcon className='ml-4 w-6 h-6 fill-error ' />}
                    {status === EmailStatus.LOADING && <RestartIcon className='ml-4 w-6 h-6 fill-disabled animate-spin' />}
                </button>
            </FadeInWrapper>
        </fieldset>
        </div>
    );
}

