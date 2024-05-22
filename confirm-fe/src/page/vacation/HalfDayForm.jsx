import { Fragment, useState } from "react";
import { convertDate } from "../../converter/DateTimeConvert";
import DatePicker from 'react-datepicker';
import ReactSelect from 'react-select';
import '../../css/layout/Form.css';
import "react-datepicker/dist/react-datepicker.css"
import "../../css/Input.css"
import { applyVacation } from "../../api/vacationApi";
import Button from "../../components/button/Button";
import { ApplyVacationTransfer } from "../../transfer/ApplyVacationTransfer";

export default function HalfDayForm({ vacationType }) {
    const [vacationForm, setVacationForm] = useState({
        date: convertDate(new Date()),
        startTime: '',
        endTime: '',
        reason: '',
        delegatorId: '',
        delegatorName: ''

    })

    const handleSetDate = (date) => {
        setVacationForm(prev => ({
            ...prev,
            date: convertDate(date)
        }))
    }

    const handleSetTime = (time) => {
        setVacationForm(prev => ({
            ...prev,
            startTime: time.startTime,
            endTime: time.endTime
        }))
    }

    // API 로 대체
    const options = [
        { startTime: '09:00', endTime: '13:00', label: '09:00 ~ 13:00' },
        { startTime: '10:00', endTime: '14:00', label: '10:00 ~ 14:00' },
        { startTime: '11:00', endTime: '15:00', label: '11:00 ~ 15:00' },
        { startTime: '11:00', endTime: '17:00', label: '13:00 ~ 17:00' },
        { startTime: '11:00', endTime: '18:00', label: '14:00 ~ 18:00' }
    ]

    const handleApplyVacation = async () => {
        const vacationDuration = {
            startDateTime: vacationForm.date + 'T' + vacationForm.startTime,
            endDateTime: vacationForm.date + 'T' + vacationForm.endTime
        }


        const delegator = { delegatorId: '', delegatorName: '' }

        const requestVacationForm = new ApplyVacationTransfer(vacationType, 'DEDUCT', vacationDuration, vacationForm.reason, delegator);

        const response = await applyVacation(requestVacationForm);
        console.log(response);
    }
    // API 로 대체

    return (<Fragment>
        <div style={{ display: 'grid', gridTemplateColumns: '4fr 4fr 4fr' }}>
            <div>
                <p style={{ 'color': 'grey', 'fontSize': '13px' }}>날짜를 지정해주세요</p>
                <div className="basic-dp">
                    <DatePicker
                        required
                        dateFormat="yyyy-MM-dd"
                        selected={vacationForm.date}
                        onChange={(date) => handleSetDate(date)}
                    />
                </div>
            </div>
            <div>
                <p style={{ 'color': 'grey', 'fontSize': '13px' }}>시간을 지정해주세요</p>
                <ReactSelect
                    className="basic-slnr"
                    options={options}
                    onChange={handleSetTime}
                    placeholder={'반차 시간을 지정해주세요'}
                    noOptionsMessage={() => alert('없음')} />
            </div>
        </div>
        <div>
            <Button name="신청"
                onClick={handleApplyVacation} />
        </div>
    </Fragment>)
}