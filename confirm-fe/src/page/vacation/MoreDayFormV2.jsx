
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
import DatePicker from 'react-datepicker';
import { NOW_DATE } from "../../constant/timeConst";
import { convertDate } from "../../converter/DateTimeConvert";
import { format } from "date-fns";
import Searchbar from "../../components/input/Searchbar";



export default function MoreDayFormV2({ vacationType }) {
    const [vacationForm, setVacationForm] = useState({
        duration: {
            startDateTime: NOW_DATE,
            endDateTime: NOW_DATE
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
            <div style={{ margin: '30px' }}></div>
            <div style={{ display: 'grid', gridTemplateColumns: '4fr 4fr', gridRowGap: '5px' }}>
                <div style={{ paddingBottom: '3px', borderBottom: '1px solid black', display: 'flex', justifyContent: "space-between" }}>
                    <span style={{
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}>연차 신청서</span>
                    <button style={{
                        padding: '0px 15px 0px 15px',
                        backgroundColor: "white",
                        border: '0.5px solid black'
                    }} onClick={handleOnSubmmit}>신청</button>
                </div>
                <div></div>
                <div style={{ border: '1px dashed blue' }}>
                    <div className="basic-dp">
                    </div>
                    <div className="basic-dp" style={{ 'display': 'inline-block', marginRight: '10px' }}>
                        <label htmlFor="startDateTime" style={{ fontSize: '12px' }}>
                            시작일을 입력해주세요
                            <div>
                                <DatePicker
                                    id="startDateTime"
                                    required
                                    dateFormat="yyyy-MM-dd"
                                    minDate={convertDate(new Date())}
                                    selected={vacationForm.duration.startDateTime}
                                    onChange={(date) => setVacationForm((prev) => ({
                                        ...prev,
                                        duration: {
                                            ...prev.duration,
                                            startDateTime: format(date, 'yyyy-MM-dd')
                                        }
                                    })
                                    )}
                                />
                            </div>
                        </label>
                    </div>
                    <div className="basic-dp" style={{ 'display': 'inline-block' }}>
                        <label htmlFor="endDateTime" style={{ fontSize: '12px' }}>종료일을 입력해주세요</label>
                        <div>
                            <DatePicker
                                id="endDateTime"
                                required
                                dateFormat="yyyy-MM-dd"
                                minDate={format(new Date(), 'yyyy-MM-dd')}
                                selected={vacationForm.duration.endDateTime}
                                onChange={(date) => setVacationForm((prev) => ({
                                    ...prev,
                                    duration: {
                                        ...prev.duration,
                                        endDateTime: format(date, 'yyyy-MM-dd')
                                    }
                                })
                                )}
                            /></div>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <p style={{ fontSize: '12px', margin: '0px' }}>사유</p>
                        <textarea style={{
                            width: '425px',
                            height: '75px'
                        }}></textarea>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <p style={{ fontSize: '12px', margin: '0px' }}>직무대행자</p>
                        <Searchbar/>
                    </div>
                </div>
            </div>
            <div className="empty-div"></div>
        </Fragment>

    )
}