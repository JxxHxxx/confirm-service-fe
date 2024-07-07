
export default function Input({
    style = {},
    id = "",
    title = "",
    className = "",
    type = "text",
    placeholder = "",
    onChange }) {

    return <>
        <label style={{ 'fontSize': '13px' }} htmlFor={id}>{title}
            <div>
                <input id={id}
                    className={className}
                    style={style}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange} />
            </div>
        </label>

    </>
}