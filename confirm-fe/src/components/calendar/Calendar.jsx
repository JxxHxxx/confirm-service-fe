
export default function Calendar({title, id, type, onChange}) {

    return (
        <label htmlFor={id}>{title}
            <div>
                <input
                    type={type}
                    id={id}
                    onChange={onChange} />
            </div>
        </label>
    )
}