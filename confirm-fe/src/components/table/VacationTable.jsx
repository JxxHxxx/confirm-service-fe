import { Fragment, useEffect, useState } from "react";
import { convertDate } from "../../converter/DateTimeConvert";

const tag = '[VacationTable] COMPONENT';

export default function VacationTable({ deparmentMembers, tableTitle, vacationList }) {
    console.log(tag);
    console.log('deparmentMembersdeparmentMembers', deparmentMembers)

    function convertVacationType(vacation) {
        return vacationTypeConst[vacation.vacationType] || '그외휴가';
    }

    function convertVacationStatus(vacation) {
        return vacationStatusConst[vacation.vacationStatus] || '';
    }

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

    return (
        <Fragment>
            <h2>{tableTitle}</h2>
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
                    {vacationList.length > 0 && vacationList.map(vacation => {
                        return (<tr
                            id={vacation.vacationDurationId}
                            key={vacation.vacationDurationId}
                            // onClick={handleOnClickTableRow}
                        >
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