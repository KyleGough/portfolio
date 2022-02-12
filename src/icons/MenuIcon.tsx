export default function MenuIcon(props: { className: string }) {
    return (
        <svg className={props.className} xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
    );
}
