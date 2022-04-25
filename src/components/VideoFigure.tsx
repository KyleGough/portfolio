import Section from './Section';

export default function VideoFigure(props: { src: string, caption: string }) {
    return (
        <Section>
            <video className='border-2 border-white rounded-lg text-center items-center shadow mx-auto' src={props.src} controls={true} autoPlay={true} loop={true} />
            <p className='mt-4 mb-2 text-sm text-center text-light font-thin'>{props.caption}</p>
        </Section>
    );
}
