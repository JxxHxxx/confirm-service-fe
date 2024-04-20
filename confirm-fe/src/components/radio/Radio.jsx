

export function Radio({children, value, name, checked, onClick}) {

    return (
        <label>
            <input 
            type="radio"
            value={value}
            name={name}
            checked={checked}
            onClick={onClick}
            />
            {children}
        </label>
    )
}