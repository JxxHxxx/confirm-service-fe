import { forwardRef } from "react"

export default forwardRef(function Input(
    {
        style = {},
        id = "",
        title = "",
        className = "",
        type = "text",
        placeholder = "",
        onChange,
        onKeyDown
    }, ref = ""
) {

    return <>
        <label style={{ 'fontSize': '13px' }} htmlFor={id}>{title}
            <div>
                <input id={id}
                    ref={ref}
                    onKeyDown={onKeyDown}
                    className={className}
                    style={style}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange} />
            </div>
        </label>

    </>
});