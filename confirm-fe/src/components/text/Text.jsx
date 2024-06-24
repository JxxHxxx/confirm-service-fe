

export default function Text({ className, style, msg }) {
    return <>
        <p className={className} style={style}>{msg}</p>
    </>

}