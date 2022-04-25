import Section from './Section';

type FigureProps = {
    image: {
        src: string,
        caption: string
    }
};

export default function ImageFigure(props: FigureProps) {
    return (
        <Section>
            <img className='border-2 border-white rounded-lg text-center items-center shadow mx-auto' src={props.image.src} alt={props.image.caption} />
            <p className='mt-4 mb-2 text-sm text-center text-light font-thin'>{props.image.caption}</p>
        </Section>
    );
}
