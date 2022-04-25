export default function Chip(props: { name: string, disabled?: boolean }) {
    return (
        <div className={`text-xs px-4 py-0.5 h-8 leading-chip rounded-2xl font-extrabold ${props.disabled ? 'text-disabled bg-chip-old' : 'text-chip bg-chip-light'}`}>
            {props.name}
        </div>
    );
}
