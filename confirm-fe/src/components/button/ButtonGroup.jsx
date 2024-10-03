

export default function ButtonGroup({cn = '', children, style}) {
    
    return (
        <div style={style} className={cn}>
            {children}
        </div>
    )
}