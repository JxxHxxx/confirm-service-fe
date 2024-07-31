import { Fragment, useState } from "react";
import { RadioGroup } from "../../components/button/RadioGroup";
import { Radio } from "../../components/button/Radio";
import MoreDayForm from "./MoreDayForm";
import HalfDayForm from "./HalfDayForm";
import MoreDayFormV2 from "./MoreDayFormV2";


export function VacationApplyForm() {
    const [vacationType, setVacationType] = useState('')

    const handleOnChange = (event) => {
        setVacationType(event.target.value);
    }

    return (
        <Fragment>
            <div style={{ border: '1px dashed red', margin: '50px 0px 50px 0px', padding :'20px' }}>
                <p style={{fontSize: '22px', fontWeight : 'bold'}}>휴가 신청</p>
                <form>
                    <RadioGroup label="휴가 유형을 선택하세요">
                        <Radio
                            name="MORE_DAY"
                            value="MORE_DAY"
                            checked={vacationType === "MORE_DAY" ? true : false}
                            onChange={handleOnChange}>
                            연차
                        </Radio>
                        <Radio
                            name="HALF_MORNING"
                            value="HALF_MORNING"
                            checked={vacationType === "HALF_MORNING" ? true : false}
                            onChange={handleOnChange}>
                            반차
                        </Radio>
                        <Radio
                            name="SPECIAL"
                            value="SPECIAL"
                            checked={vacationType === "SPECIAL" ? true : false}
                            onChange={handleOnChange}>
                            경조사
                        </Radio>
                    </RadioGroup>
                </form>
                {vacationType === 'MORE_DAY' && <MoreDayForm vacationType={vacationType} />}
                {/* {vacationType === 'MORE_DAY' && <MoreDayFormV2 vacationType={vacationType} />} */}
                {vacationType === 'HALF_MORNING' && <HalfDayForm vacationType={vacationType} />}
                {vacationType === 'SPECIAL' && <h2>경조사 신청 폼</h2>}
            </div>
        </Fragment>
    )
}