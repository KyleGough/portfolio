export default function ProjectChip(props: { name: string }) {
    return (
        <div className='brightness-200 text-xs px-4 py-0.5 h-8 leading-chip rounded-2xl font-extrabold text-chip bg-chip-light'>
            {props.name}
        </div>
    );
}