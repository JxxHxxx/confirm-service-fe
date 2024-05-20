import { Fragment, useEffect, useState } from "react";
import { applyVacation } from "../../api/vacationApi";
import Calendar from "../../components/calendar/Calendar";
import { getDeparmentMembers, searchCompanyMembers } from "../../api/memberApi";

import '../../css/List.css'
import ApprovalLine from "./ApprovalLine";
import Searchbar from "../../components/input/Searchbar";

export default function MoreDayForm({ vacationType }) {
    const [vacationForm, setVacationForm] = useState({
        'duration': {
            'startDateTime': '',
            'endDateTime': ''
        },
        'reason': ''
    });

    const [vacationId, setVactionId] = useState('');

    const [applyStep, setApplyStep] = useState({
        'vacationDuration': true,
        'approvalLine': false,
    })

    const handleOnSubmmit = async (event) => {
        event.preventDefault();

        const requestVacationForm = {
            requesterId: sessionStorage.getItem('memberId'),
            vacationType: vacationType.toUpperCase(),
            leaveDeduct: "DEDUCT",
            requestVacationDurations: [
                {
                    startDateTime: vacationForm.duration.startDateTime + "T00:00",
                    endDateTime: vacationForm.duration.endDateTime + "T00:00"
                }
            ],
            title: "휴가신청서",
            reason: vacationForm.reason,
            requesterName: sessionStorage.getItem('memberName'),
            delegatorId: searchResultMember !== undefined ? searchResultMember.memberId : '',
            delegatorName: searchResultMember !== undefined ? searchResultMember.name : '',
            departmentId: sessionStorage.getItem('departmentId'),
            departmentName: sessionStorage.getItem('departmentName')
        }

        const requestResult = await applyVacation(requestVacationForm);

        if (requestResult.status === 200) {
            setVactionId(requestResult.data.vacationId)

            setApplyStep(prev => ({
                ...prev,
                'vacationDuration': false,
                'approvalLine': true
            }))
        }
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

    const [keyword, setKeyword] = useState();
    const [searchResultMember, setSearchResultMember] = useState();

    const onChangeSearchValue = (event) => {
        setKeyword(event.target.value);
    }

    const handleOnSubmitSearchValue = async (event) => {
        event.preventDefault();
        const params = {
            'memberName': keyword
        }
        const response = await searchCompanyMembers(params);
        setSearchResultMember(response.data[0] !== undefined ? response.data[0] : {'memberId' : null, 'name' : null});
    }

    const tempVacationDurationComponent = () => {
        return (
            <Fragment>
                <h2>연차 신청 폼</h2>
                <form onSubmit={handleOnSubmmit}>
                    <Calendar
                        title="연차 시작일을 지정해주세요"
                        id="startDateTime"
                        onChange={handleOnChangeDate}
                    />
                    <Calendar
                        title="연차 종료일을 지정해주세요"
                        id="endDateTime"
                        onChange={handleOnChangeDate} />
                    <label htmlFor="vacation-reason" />사유
                    <input
                        id="vacation-reasont"
                        type="text"
                        onChange={hnadleOnChangeReasonInput} />
                    <div>
                        <button type="submit">제출</button>
                    </div>
                </form>
                <div>
                    <h3>직무대행자</h3>
                    <Searchbar
                        inputProp={{ 'placeholder': '사용자 이름을 입력해주세요' }}
                        onChange={onChangeSearchValue}
                        onSubmit={handleOnSubmitSearchValue}
                    />
                    <p>{searchResultMember && searchResultMember.name}</p>
                </div>
            </Fragment>
        )
    }


    useEffect(() => {
    }, [])

    return (
        <Fragment>
            {applyStep.vacationDuration && tempVacationDurationComponent()}
            {applyStep.approvalLine && <ApprovalLine vacationId={vacationId} />}
        </Fragment>

    )
}