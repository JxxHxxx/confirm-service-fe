
export default function Input({
    style = {},
    id = "",
    className = "",
    type = "text",
    placeholder = "",
    onChange }) {

    return <>
        <label htmlFor={id} />
        <input id={id}
            className={className}
            style={style}
            type={type}
            placeholder={placeholder}
            onChange={onChange} />
    </>
}