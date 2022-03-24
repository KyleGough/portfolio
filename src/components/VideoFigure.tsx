import Section from './Section';

export default function VideoFigure(props: { src: string, caption: string }) {
    return (
        <Section>
            <video className='text-center items-center mx-auto' src={props.src} controls={true} autoPlay={true} loop={true} />
            <p className='my-2 text-sm text-center text-light font-thin'>{props.caption}</p>
        </Section>
    );
}
