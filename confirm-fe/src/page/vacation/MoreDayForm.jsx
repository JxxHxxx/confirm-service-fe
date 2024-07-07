import { Fragment, useEffect, useState } from "react";
import { applyVacation } from "../../api/vacationApi";
import Calendar from "../../components/calendar/Calendar";
import { searchCompanyMembers } from "../../api/memberApi";
import '../../css/List.css'
import { useNavigate } from "react-router-dom";
import { ApplyVacationTransfer } from "../../transfer/ApplyVacationTransfer";
import DelegatorSearch from "./DelegatorSearch";
import List from "../../components/list/List";
import Button from "../../components/button/Button";
import Title from "../document/Title";
import Input from "../../components/input/Input";
import { format } from "date-fns";
import { NOW_DATE } from "../../constant/timeConst";



export default function MoreDayForm({ vacationType }) {
    const [vacationForm, setVacationForm] = useState({
        duration: {
            'startDateTime': NOW_DATE,
            'endDateTime': NOW_DATE
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

    const handleSearchDelegator = async (event, paramsKey, paramsValue) => {
        if (event !== null) {
            event.preventDefault();
        }
        const params = {
            [paramsKey]: paramsValue
        }
        const response = await searchCompanyMembers(params);
        setDelegator((prev) => ({
            ...prev,
            searchResult: response.data.length > 0 ? response.data : []
        }));
    }

    const handleOnClickSelectDelegator = (event) => {
        const selectedMember = delegator.searchResult.filter(member => member.memberId === event.target.getAttribute('value'));
        alert(event.target.innerHTML + "을 직무 대행자로 지정합니다");

        setDelegator((prev) => ({
            ...prev,
            searchResult: selectedMember,
            selected: {
                delegatorId: selectedMember[0].memberId,
                delegatorName: selectedMember[0].name
            }
        }))
    }

    useEffect(() => {
        handleSearchDelegator(null, 'departmentId', sessionStorage.getItem('departmentId'))
    }, [])

    return (
        <Fragment>
            <Title className='titlt_left' name="연차 신청서" />
            <div style={{ display: 'grid', gridTemplateColumns: '4fr 4fr', gridRowGap: '50px' }}>
                <div>
                    <div style={{ 'display': 'inline-block' }}>
                        <Calendar
                            className={{ 'cnInput': "input_cal", 'cnLabel': 'label_b' }}
                            title='시작일을 지정해주세요'
                            id="startDateTime"
                            onChange={handleOnChangeDate}
                        />
                    </div>
                    <div style={{ 'display': 'inline-block' }}>
                        <Calendar
                            className={{ 'cnInput': "input_cal", 'cnLabel': 'label_b' }}
                            title='종료일을 지정해주세요'
                            id="endDateTime"
                            onChange={handleOnChangeDate} />
                    </div>
                    <div style={{ 'marginTop': '20px' }}>
                        <Input
                            id="vacation-reason"
                            onChange={hnadleOnChangeReasonInput}
                            type="text"
                            style={{ 'width': '300px', 'height': '40px' }}
                            title="사유를 입력해주세요"
                            placeholder="셀렉트박스로 바꿀거임" />
                    </div>
                </div>
                <div>
                    <DelegatorSearch
                        onChange={onChangeSearchValue}
                        onSubmit={(event) => handleSearchDelegator(event, 'memberName', delegator.keyword)} />
                    <List
                        cn={{ ul: 'member-list', li: 'item_narrow' }}
                        listProperty={{
                            'items': delegator.searchResult,
                            'itemKey': 'memberPk',
                            'itemValue': 'memberId',
                            'onClick': handleOnClickSelectDelegator,
                            'itemContent': (item) => (<>{item.departmentName}/{item.name}/{item.enteredDate}</>)
                        }} />
                </div>

            </div>
            <div className="empty-div"></div>
            <div>
                <Button name="신청" onClick={handleOnSubmmit} />
            </div>
        </Fragment>

    )
}