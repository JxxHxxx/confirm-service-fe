import { Fragment, useState } from "react";
import { RadioGroup } from "../radio/RadioGroup";
import { Radio } from "../radio/Radio";


export function VacationApplyForm() {
    

    const [vacationType, setVacationType] = useState({
        moreDayChecked : true,
        halfChecked : false,
        specialChecked : false    
    })

    const handleButton = () => {
        setVacationType({
            moreDayChecked : true,
            halfChecked : true,
            specialChecked : true
        })
    }

    return (
        <Fragment>
            <form>
                <RadioGroup label="휴가 유형">
                    <Radio name="more_day" value="more_day" checked={vacationType.moreDayChecked}>연차</Radio>
                    <Radio name="half" value="half" checked={vacationType.halfChecked}>반차</Radio>
                    <Radio name="special" value="special" checked={vacationType.specialChecked}>경조사</Radio>
                </RadioGroup>
            </form>
        </Fragment>
    )
}