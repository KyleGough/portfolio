import { ReactNode } from 'react';

export default function Section(props: { children: ReactNode }) {
    return (
        <div className='container text-primary py-8 last:pb-16'>
            {props.children}
        </div>
    );
}