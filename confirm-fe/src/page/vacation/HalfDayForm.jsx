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
import Searchbar from "../../components/input/Searchbar";
import { searchCompanyMembers } from "../../api/memberApi";
import List from "../../components/list/List";
import { useNavigate } from "react-router-dom";

export default function HalfDayForm({ vacationType }) {
    const [delegator, setDelegator] = useState({
        keyword: '',
        searchResult: [],
        selected: { delegatorId: '', delegatorName: '' }
    });

    const [vacationForm, setVacationForm] = useState({
        date: convertDate(new Date()),
        startTime: undefined,
        endTime: undefined,
        reason: '',
        delegatorId: delegator.selected.delegatorId,
        delegatorName: delegator.selected.delegatorName
    })

    const [placeHolderColor, setPlaceHolderColor] = useState({
        time: 'gray'
    });

    const navigate = useNavigate();


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

        setPlaceHolderColor(prev => ({
            ...prev,
            time: 'gray'
        }));
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

        if (vacationForm.startTime === undefined || vacationForm.endTime === undefined) {
            setPlaceHolderColor(prev => ({
                ...prev,
                time: 'red'
            }));
            throw new Error('시간을 지정해주세요');
        }

        const vacationDuration = {
            startDateTime: vacationForm.date + 'T' + vacationForm.startTime,
            endDateTime: vacationForm.date + 'T' + vacationForm.endTime
        }

        // 임시
        const delegator = { delegatorId: '', delegatorName: '' }
        const requestVacationForm = new ApplyVacationTransfer(vacationType, 'DEDUCT', vacationDuration, vacationForm.reason, delegator);

        const response = await applyVacation(requestVacationForm);

        navigate(`/vacation/${response.data.vacationId}/ApprovalLine`)
    }
    // API 로 대체

    const handleOnChangeDelegator = (event) => {
        setDelegator((prev) => ({
            ...prev,
            keyword: event.target.value
        }));
    }

    const handleOnSubmitDelegator = async (event) => {
        event.preventDefault();
        const params = {
            'memberName': delegator.keyword
        }
        const response = await searchCompanyMembers(params);

        setDelegator((prev) => ({
            ...prev,
            searchResult: response.data.length > 0 ? response.data : []
        }))
    }

    const handleOnClickSelectDelegator = (event) => {
        alert(event.target.innerHTML + "을 직무 대행자로 지정합니다")
        setDelegator((prev) => ({
            ...prev,
            searchResult: prev.searchResult.filter(member => member.memberId === event.target.getAttribute('value')),
        }))
        setVacationForm((prev) => ({
            ...prev,
            delegatorId : delegator.searchResult[0].memberId, 
            delegatorName : delegator.searchResult[0].name
        }))
    }

    return (<Fragment>
        <div style={{ display: 'grid', gridTemplateColumns: '4fr 4fr 4fr' }}>
            <div>
                <p style={{ 'color': 'grey', 'fontSize': '13px' }}>날짜를 지정해주세요</p>
                <div className="basic-dp">
                    <DatePicker
                        required
                        dateFormat="yyyy-MM-dd"
                        minDate={convertDate(new Date())}
                        selected={vacationForm.date}
                        onChange={(date) => handleSetDate(date)}
                    />
                </div>
            </div>
            <div>
                <p style={{ 'fontSize': '13px', 'color': placeHolderColor.time }}>시간을 지정해주세요</p>
                <ReactSelect
                    className="basic-slnr"
                    options={options}
                    onChange={handleSetTime}
                    placeholder={<div style={{ 'color': placeHolderColor.time }}>시간을 지정해주세요</div>}
                    isSearchable={false} />
            </div>
            <div id="empty"></div>
            <div>
                <p style={{ 'fontSize': '13px', 'color': 'gray' }}>직무 대행자를 선택해주세요</p>
                <Searchbar
                    inputProp={{ 'placeholder': '직무 대행자 이름을 입력해주세요' }}
                    onChange={handleOnChangeDelegator}
                    onSubmit={handleOnSubmitDelegator}
                />
                <List
                    cn={{ ul: 'member-list', li: 'item' }}
                    listProperty={{
                        'items': delegator.searchResult,
                        'itemKey': 'memberPk',
                        'itemValue': 'memberId',
                        'onClick': handleOnClickSelectDelegator,
                        'itemContent': (item) => (
                            <Fragment>
                                {item.departmentName}/{item.name}
                            </Fragment>
                        )
                    }} />

            </div>
        </div>
        <div style={{ 'margin': '50px' }}></div>
        <div>
            <Button name="신청"
                onClick={handleApplyVacation} />
        </div>
    </Fragment>)
}