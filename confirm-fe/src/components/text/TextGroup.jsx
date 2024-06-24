

export default function TextGroup({ id, className, style, children }) {

    return <div className={className} id={id} style={style}>
        {children}
    </div>
}