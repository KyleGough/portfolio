type SkillProps = {
    type: string,
    progress: string,
    title: string,
    description: string,
    comment: string,
    logo?: string
};

export default function Skill(props: SkillProps) {
    return (
        <div className='flex flex-row justify-center py-4'>
            <div className='w-3/12 lg:w-4/12 pt-2'>
                <div className={`progress ${props.type}`}>
                    <div className={`progress-bar ${props.progress}`}></div>
                </div>
            </div>
            <div className='w-9/12 lg:w-8/12 ml-6 flex'>
                <img className='w-8 h-8 mr-4' src={props.logo} alt={`${props.title} logo`} />
                <div>
                    <p><span className='font-extrabold'>{props.title}</span> - <span className='text-sm'>{props.description}</span></p>
                    <p className='text-sm text-link-hover mt-1'>{props.comment}</p>
                </div>
            </div>
        </div>
    );
}
