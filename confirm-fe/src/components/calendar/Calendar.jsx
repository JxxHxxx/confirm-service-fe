import { NOW_DATE } from "../../constant/timeConst";


export default function Calendar({
    title,
    id,
    onChange,
    initValue,
    className = { 'cnInput': '', 'cnLabel': 'label_b' } }) {

    const { cnInput, cnLabel } = className;

    return (
        <label className={cnLabel} htmlFor={id}>{title}
            <div>
                <input
                    className={cnInput}
                    type="date"
                    id={id}
                    onChange={onChange}
                    value={initValue}
                    defaultValue={NOW_DATE} />
            </div>
        </label>
    )
}