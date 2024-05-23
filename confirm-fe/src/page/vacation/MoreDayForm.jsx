import { Fragment, useEffect, useState } from "react";
import { applyVacation } from "../../api/vacationApi";
import Calendar from "../../components/calendar/Calendar";
import { searchCompanyMembers } from "../../api/memberApi";
import DatePicker from 'react-datepicker';
import '../../css/List.css'
import { useNavigate } from "react-router-dom";
import { ApplyVacationTransfer } from "../../transfer/ApplyVacationTransfer";
import DelegatorSearch from "./DelegatorSearch";
import List from "../../components/list/List";
import Button from "../../components/button/Button";
import { convertDate } from "../../converter/DateTimeConvert";

export default function MoreDayForm({ vacationType }) {
    const [vacationForm, setVacationForm] = useState({
        duration: {
            'startDateTime': '',
            'endDateTime': ''
        },
        reason: '',
    });

    const [delegator, setDelegator] = useState({
        keyword: '',
        searchResult: [],
        selected: { delegatorId: '', delegatorName: '' }
    });

    const [vacationId, setVactionId] = useState('');

    const navigate = useNavigate();

    const handleOnSubmmit = async () => {
        const duration = {
            startDateTime: vacationForm.duration.startDateTime + "T00:00",
            endDateTime: vacationForm.duration.endDateTime + "T00:00"
        }

        const requestVacationForm = new ApplyVacationTransfer(vacationType, 'DEDUCT', duration, vacationForm.reason, delegator.selected);


        const response = await applyVacation(requestVacationForm);

        if (response.status === 200) {
            setVactionId(response.data.vacationId)
        }

        navigate(`/vacation/${response.data.vacationId}/ApprovalLine`)
    }

    const handleOnChangeDate = (event) => {
        setVacationForm(prev => ({
            ...prev,
            duration: {
                ...prev.duration,
                [event.target.id]: event.target.value
            }
        }))
    }

    const hnadleOnChangeReasonInput = (event) => {
        setVacationForm(prev => ({
            ...prev,
            reason: event.target.value
        }));
    }

    const onChangeSearchValue = (event) => {
        setDelegator((prev) => ({
            ...prev,
            keyword: event.target.value
        }));
    }

    const handleOnSubmitSearchValue = async (event) => {
        event.preventDefault();
        const params = {
            'memberName': delegator.keyword
        }
        const response = await searchCompanyMembers(params);
        setDelegator((prev) => ({
            ...prev,
            searchResult: response.data.length > 0 ? response.data : []
        }));
    }

    const handleOnClickSelectDelegator = (event) => {
        alert(event.target.innerHTML + "을 직무 대행자로 지정합니다")
        setDelegator((prev) => ({
            ...prev,
            searchResult: prev.searchResult.filter(member => member.memberId === event.target.getAttribute('value')),
        }))
        setDelegator((prev) => ({
            ...prev,
            selected: {
                delegatorId: delegator.searchResult[0].memberId,
                delegatorName: delegator.searchResult[0].name
            }
        }))
    }

    useEffect(() => {
    }, [])

    return (
        <Fragment>
            <h2>연차 신청</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '4fr 4fr 4fr', gridRowGap: '50px' }}>
                <div>
                    <p style={{ 'color': 'grey', 'fontSize': '13px' }}>시작일을 지정해주세요</p>
                    <Calendar
                        id="startDateTime"
                        onChange={handleOnChangeDate}
                    />
                </div>
                <div>
                    <p style={{ 'color': 'grey', 'fontSize': '13px' }}>종료일을 지정해주세요</p>
                    <Calendar
                        id="endDateTime"
                        onChange={handleOnChangeDate} />
                </div>
                {/* <div>
                    <p style={{ 'color': 'grey', 'fontSize': '13px' }}>시작일을 지정해주세요</p>
                    <DatePicker
                        required
                        inline
                        dateFormat="yyyy-MM-dd"
                        minDate={convertDate(new Date())}
                    // selected={vacationForm.date}
                    // onChange={(date) => handleSetDate(date)}
                    />
                </div>
                <div>
                    <p style={{ 'color': 'grey', 'fontSize': '13px' }}>종료일을 지정해주세요</p>
                    <DatePicker
                        required
                        inline
                        dateFormat="yyyy-MM-dd"
                        minDate={convertDate(new Date())}
                    // selected={vacationForm.date}
                    // onChange={(date) => handleSetDate(date)}
                    />
                </div> */}
                <div className="empty-div"></div>
                <div>
                    <DelegatorSearch onChange={onChangeSearchValue} onSubmit={handleOnSubmitSearchValue} />
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
                <div>
                    <label htmlFor="vacation-reason" />사유
                    <input
                        id="vacation-reasont"
                        type="text"
                        onChange={hnadleOnChangeReasonInput} />
                </div>
                <div className="empty-div"></div>
                <div>
                    <Button name="신청" onClick={handleOnSubmmit} />
                </div>
            </div>

        </Fragment>

    )
}