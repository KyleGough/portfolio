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
            <img className='text-center items-center mx-auto' src={props.image.src} alt={props.image.caption} />
            <p className='my-2 text-sm text-center text-light font-thin'>{props.image.caption}</p>
        </Section>
    );
}
