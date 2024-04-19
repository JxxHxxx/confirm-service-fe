import { Fragment } from "react";
import "../../css/Table.css";
import { convertDate } from "../../converter/DateTimeConvert";

export function VacationSearchResult({ vacations }) {
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
        COMPLETED: '휴가 종료'
    }



    function convertVacationType(vacation) {
        return vacationTypeConst[vacation.vacationType] || '그외휴가';
    }

    function convertVacationStatus(vacation) {
        return vacationStatusConst[vacation.vacationStatus] || '';
    }

    return (
        <Fragment>
            <table className="vacation_table">
                <thead>
                    <tr>
                        <td>부서</td>
                        <td>이름</td>
                        <td>시작일</td>
                        <td>종료일</td>
                        <td>휴가 진행 상태</td>
                        <td>휴가 유형</td>
                    </tr>
                </thead>
                <tbody>
                    {vacations.length > 0 && vacations.map(vacation =>
                    (<tr key={vacation.vacationId}>
                        <td>{vacation.departmentName}</td>
                        <td>{vacation.name}</td>
                        <td>{convertDate(vacation.startDateTime)}</td>
                        <td>{convertDate(vacation.endDateTime)}</td>
                        <td>{convertVacationStatus(vacation)}</td>
                        <td>{convertVacationType(vacation)} </td>
                    </tr>))}
                </tbody>
            </table>
        </Fragment>
    )
} 