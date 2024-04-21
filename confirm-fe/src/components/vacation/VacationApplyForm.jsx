import { Fragment, useState } from "react";
import { RadioGroup } from "../radio/RadioGroup";
import { Radio } from "../radio/Radio";


export function VacationApplyForm() {


    const [vacationType, setVacationType] = useState('')

    const handleOnChange = (event) => {
        setVacationType(event.target.value);
    }

    return (
        <Fragment>
            <form>
                <RadioGroup label="휴가 유형">
                    <Radio name="more_day" value="more_day" checked={vacationType === "more_day" ? true : false} onChange={handleOnChange}>연차</Radio>
                    <Radio name="half" value="half" checked={vacationType === "half" ? true : false} onChange={handleOnChange}>반차</Radio>
                    <Radio name="special" value="special" checked={vacationType === "special" ? true : false} onChange={handleOnChange}>경조사</Radio>
                </RadioGroup>
            </form>
        </Fragment>
    )
}