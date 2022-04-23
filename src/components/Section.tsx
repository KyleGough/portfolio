import { ReactNode, forwardRef, ForwardedRef } from 'react';

function Section(props: { id?: string, children: ReactNode }, ref: ForwardedRef<HTMLDivElement>) {
    return (
        <div id={props.id} ref={ref} className='container text-primary py-8 first:pt-24 last:pb-16'>
            {props.children}
        </div>
    );
}

export default forwardRef(Section);