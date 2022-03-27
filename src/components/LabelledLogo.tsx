export default function LabelledLogo(props: { name: string, logo: string }): React.ReactElement {
    return (
        <div className='text-center mb-8'>
            <img loading='lazy' className='w-8 h-8 mb-2 mx-auto' src={props.logo} alt={`${props.name} Logo`} />
            <p className='text-sm'>{props.name}</p>
        </div>
    )
}