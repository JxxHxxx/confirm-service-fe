

export function Radio({ children, value, name, checked, onChange }) {

    return (
        <label>
            <input
                type="radio"
                value={value}
                name={name}
                checked={checked}
                onChange={onChange}
            />
            {children}
        </label>
    )
}