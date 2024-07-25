import '../../css/Fieldset.css'

export function RadioGroup({ label, children }) {

    return (
        <fieldset className="basic-fs">
            <legend>{label}</legend>
            {children}
        </fieldset>
    )
}