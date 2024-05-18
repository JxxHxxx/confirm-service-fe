import { Fragment, useState } from "react";
import { RadioGroup } from "../../components/button/RadioGroup";
import { Radio } from "../../components/button/Radio";
import MoreDayForm from "./MoreDayForm";
import HalfDayForm from "./HalfDayForm";


export function VacationApplyForm() {
    const [vacationType, setVacationType] = useState('')

    const handleOnChange = (event) => {
        setVacationType(event.target.value);
    }

    return (
        <Fragment>
            <h2>휴가 유형을 선택해주세요</h2>
            <form>
                <RadioGroup label="휴가 유형">
                    <Radio
                        name="more_day"
                        value="more_day"
                        checked={vacationType === "more_day" ? true : false}
                        onChange={handleOnChange}>
                        연차
                    </Radio>
                    <Radio
                        name="half"
                        value="half"
                        checked={vacationType === "half" ? true : false}
                        onChange={handleOnChange}>
                        반차
                    </Radio>
                    <Radio
                        name="special"
                        value="special"
                        checked={vacationType === "special" ? true : false}
                        onChange={handleOnChange}>
                        경조사
                    </Radio>
                </RadioGroup>
            </form>
            {vacationType === 'more_day' && <MoreDayForm vacationType={vacationType} />}
            {vacationType === 'half' && <HalfDayForm />}
            {vacationType === 'special' && <h2>경조사 신청 폼</h2>}
        </Fragment>
    )
}