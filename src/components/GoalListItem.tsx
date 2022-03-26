enum Progress {
    RED = 'before:border-traffic-red',
    AMBER = 'before:border-traffic-amber',
    GREEN = 'before:border-traffic-green'
};

export { Progress };

export default function GoalListItem(props: { name: string, progress: Progress }): React.ReactElement {
    return (
        <li className={`${props.progress} before:content-[""] before:absolute before:-left-12 before:w-6 before:h-6 before:border-2 before:rounded-xl relative my-4`}>{props.name}</li>
    )
}