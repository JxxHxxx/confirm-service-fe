
export default function Button({ cn = 'basic-button', name = 'button', onClick = () => { }, style = {} }) {

    return (
        <button
            type="button"
            style={style}
            className={cn}
            onClick={onClick}>
            {name}
        </button>
    )
}