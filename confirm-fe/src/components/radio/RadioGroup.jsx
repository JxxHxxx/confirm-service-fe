
export function RadioGroup({label, children}) {

    return (
        <fieldset>
            <legend>{label}</legend>
            {children}
        </fieldset>
    )
}