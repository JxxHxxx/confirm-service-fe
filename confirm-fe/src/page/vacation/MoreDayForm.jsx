import { Fragment, useEffect, useState } from "react";
import { applyVacation } from "../../api/vacationApi";
import Calendar from "../../components/calendar/Calendar";
import { getDeparmentMembers } from "../../api/memberApi";

import '../../css/List.css'
import ApprovalLine from "./ApprovalLine";
import MemberSearch from "../member/MemberSearch";

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
            delegatorName: "테스터",
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
            </Fragment>
        )
    }

    // 없어도 될 듯 검토
    const [deparmentMenbers, setDepartmentMembers] = useState([]);

    const handleApprovalLine = async () => {
        const findDepartmentMembers = await getDeparmentMembers();
        setDepartmentMembers(findDepartmentMembers);
    }

    useEffect(() => {
        handleApprovalLine();
    }, [])
    // 없어도 될 듯 검토

    return (
        <Fragment>
            {applyStep.vacationDuration && tempVacationDurationComponent()}
            {/* {applyStep.approvalLine && <MemberSearch />} */}
            {applyStep.approvalLine && <ApprovalLine vacationId={vacationId} />}
        </Fragment>

    )
}