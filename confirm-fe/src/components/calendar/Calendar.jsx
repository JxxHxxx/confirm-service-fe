
export default function Calendar({title, id, onChange, initValue}) {

    return (
        <label htmlFor={id}>{title}
            <div>
                <input
                    type="date"
                    id={id}
                    onChange={onChange}
                    value={initValue} />
            </div>
        </label>
    )
}