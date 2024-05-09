
export default function Button({ cn = '', name = 'button', onClick = () => { }, style = {} }) {

    return (
        <button
            style = {style}
            className={cn}
            onClick={onClick}>
            {name}
        </button>
    )
}