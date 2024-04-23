import { Fragment, useEffect, useState } from "react";
import { applyVacation } from "../../api/vacationApi";
import Calendar from "../calendar/Calendar";
import { getDeparmentMembers } from "../../api/memberApi";

import '../../css/List.css'
import ApprovalLine from "./ApprovalLine";

export default function MoreDayForm({ vacationType }) {
    const [vacationDuration, setVacationDuration] = useState({
        'duration': {
            'startDateTime': '',
            'endDateTime': ''
        }
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
                    startDateTime: vacationDuration.duration.startDateTime + "T00:00",
                    endDateTime: vacationDuration.duration.endDateTime + "T00:00"
                }
            ]
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
        setVacationDuration(prev => ({
            duration: {
                ...prev.duration,
                [event.target.id]: event.target.value
            }
        }))
    }

    const tempVacationDurationComponent = () => {
        return (
            <Fragment>
                <h2>연차 신청 폼</h2>
                <form onSubmit={handleOnSubmmit}>
                    <Calendar
                        title="연차 시작일을 지정해주세요"
                        id="startDateTime"
                        type="date"
                        onChange={handleOnChangeDate} />
                    <Calendar
                        title="연차 종료일을 지정해주세요"
                        id="endDateTime"
                        type="date"
                        onChange={handleOnChangeDate} />
                    <button type="submit">제출</button>
                </form>
            </Fragment>
        )
    }

    const [deparmentMenbers, setDepartmentMembers] = useState([]);

    const handleApprovalLine = async () => {
        const findDepartmentMembers = await getDeparmentMembers();
        setDepartmentMembers(findDepartmentMembers);
    }

    useEffect(() => {
        handleApprovalLine();
    }, [])

    return (
        <Fragment>
            {applyStep.vacationDuration && tempVacationDurationComponent()}
            {applyStep.approvalLine && <ApprovalLine departmentMembers={deparmentMenbers} vacationId={vacationId}/>}
        </Fragment>

    )
}