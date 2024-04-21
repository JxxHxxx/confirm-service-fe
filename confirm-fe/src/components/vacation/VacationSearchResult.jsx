import { Fragment, useState } from "react";
import "../../css/Table.css";
import "../../css/Button.css";

import { convertDate } from "../../converter/DateTimeConvert";

const tag = "[vacationSearchResult]"

export function VacationSearchResult({ vacations }) {
    console.log(tag);

    const vacationTypeConst = {
        MORE_DAY: '유급휴가',
        COMMON_VACATION: '공동연차'
    }

    const vacationStatusConst = {
        CREATE: '생성',
        REQUEST: '상신',
        APPROVED: '승인',
        REJECT: '반려',
        ONGOING: '휴가 중',
        COMPLETED: '휴가 종료',
        NON_REQUIRED: '승인'
    }

    function convertVacationType(vacation) {
        return vacationTypeConst[vacation.vacationType] || '그외휴가';
    }

    function convertVacationStatus(vacation) {
        return vacationStatusConst[vacation.vacationStatus] || '';
    }

    const [chip, setChip] = useState({
        className: {
            myVacation: 'chip-unclicked',
            request: 'chip-unclicked',
            approved: 'chip-unclicked',
            ongoing: 'chip-unclicked',
        },

        condition: {
            request: false,
            approved: false,
            ongoing: false
        },

        myVacation: false

    });

    const handleChipClick = (className, conditionValue) => {
        setChip(prev => ({
            ...prev,
            className: {
                ...prev.className,
                [className]: prev.className[className] === 'chip-clicked' ? 'chip-unclicked' : 'chip-clicked',
            },

            condition: {
                ...prev.condition,
                [conditionValue]: !prev.condition[conditionValue]
            },
        }))
    };

    const handleMyVacationChipClick = (className, conditionValue) => {
        setChip(prev => ({
            ...prev,
            myVacation: !prev[conditionValue],

            className: {
                ...prev.className,
                [className]: prev.className[className] === 'chip-clicked' ? 'chip-unclicked' : 'chip-clicked',
            },
        }))
    };

    const filterVacations = () => {
        let result = vacations;
        if (chip.myVacation) {
            result = vacations.filter(vacation => vacation.requesterId === sessionStorage.getItem('memberId'));
        }

        const activeCondition = Object.keys(chip.condition).filter(key => chip.condition[key] === true);
        if (activeCondition.length === 0) {
            return result;
        }
        // 만약 vacationStatus 컨데션 칩이 활성화 되어 있다면...
        result = result.filter(vacation => activeCondition.includes(vacation.vacationStatus.toLowerCase()));
        return result;
    }

    return (
        <Fragment>
            <button className={chip.className.myVacation} onClick={() => handleMyVacationChipClick('myVacation', 'myVacation')}>내 휴가</button>
            <button className={chip.className.request} onClick={() => handleChipClick('request', 'request')}>상신</button>
            <button className={chip.className.approved} onClick={() => handleChipClick('approved', 'approved')}>승인</button>
            <button className={chip.className.ongoing} onClick={() => handleChipClick('ongoing', 'ongoing')}>휴가중인</button>
            <table className="vacation_table">
                <thead>
                    <tr>
                        <td>휴가ID</td>
                        <td>부서</td>
                        <td>이름</td>
                        <td>시작일</td>
                        <td>종료일</td>
                        <td>휴가 진행 상태</td>
                        <td>휴가 유형</td>
                    </tr>
                </thead>
                <tbody>
                    {filterVacations().length > 0 && filterVacations().map(vacation => {
                        return (<tr id={vacation.vacationDurationId} key={vacation.vacationDurationId}>
                            <td>{vacation.vacationId}</td>
                            <td>{vacation.departmentName}</td>
                            <td>{vacation.name}</td>
                            <td>{convertDate(vacation.startDateTime)}</td>
                            <td>{convertDate(vacation.endDateTime)}</td>
                            <td>{convertVacationStatus(vacation)}</td>
                            <td>{convertVacationType(vacation)} </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </Fragment>
    )
}