export default function Chip(props: { name: string, disabled?: boolean }) {
    return (
        <div className={`text-xs px-4 py-0.5 ml-0 md:ml-2 mr-2 first:ml-0 last:mr-0 mt-4 h-8 leading-chip border rounded-2xl font-thin ${props.disabled ? 'border-disabled text-disabled' : 'border-chip text-chip'}`}>
            {props.name}
        </div>
    );
}
