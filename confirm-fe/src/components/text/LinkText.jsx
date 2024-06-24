

export default function LinkText({className, href, msg}) {
    return <a className={className}
        href={href}>
        {msg}
        </a>
}