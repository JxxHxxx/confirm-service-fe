import { Fragment, useState } from "react";
import "../../css/Table.css";
import "../../css/Button.css";

import { convertDate } from "../../converter/DateTimeConvert";
import { convertVacationStatus, convertVacationType } from "../../converter/VacationConverter";

const tag = "[vacationSearchResult]"

export function VacationSearchResult({ vacations }) {
    console.log(tag);

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
                <p style={{fontSize : '22px'}}>부서 휴가자 현황</p>
                <div className="chip-group">
                    <button className={chip.className.myVacation} onClick={() => handleMyVacationChipClick('myVacation', 'myVacation')}>내 휴가</button>
                    <button className={chip.className.request} onClick={() => handleChipClick('request', 'request')}>상신</button>
                    <button className={chip.className.approved} onClick={() => handleChipClick('approved', 'approved')}>승인</button>
                    <button className={chip.className.ongoing} onClick={() => handleChipClick('ongoing', 'ongoing')}>휴가중인</button>
                </div>
                <table className="vacation_table">
                    <thead>
                        <tr>
                            <td className="tdMinWidthDepartmentName">부서</td>
                            <td className="tdMinWidthMemberName">이름</td>
                            <td className="tdMinWidthDate">시작일</td>
                            <td className="tdMinWidthDate">종료일</td>
                            <td>휴가 진행 상태</td>
                            <td>휴가 유형</td>
                        </tr>
                    </thead>
                    <tbody>
                        {filterVacations().length > 0 && filterVacations().map(vacation => {
                            return (<tr id={vacation.vacationDurationId} key={vacation.vacationDurationId}>
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