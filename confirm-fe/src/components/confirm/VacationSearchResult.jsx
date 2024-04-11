import { Fragment } from "react";


export function VacationSearchResult({ vacations }) {
    console.log('vacations', vacations);

    function getVacationType(vacation) {
        if (vacation.vacationType === "MORE_DAY") {
            return '유급휴가';
        } else {
            return '그외 휴가';
        }
    }

    return (
        <Fragment>
            {vacations && (
                <table>
                    <thead>
                        <tr>
                            <td>휴가 ID</td>
                            <td>부서</td>
                            <td>이름</td>
                            <td>시작일</td>
                            <td>종료일</td>
                            <td>휴가 진행 상태</td>
                            <td>휴가 유형</td>
                        </tr>
                    </thead>
                    {vacations.map(vacation =>
                    (<tr key={vacation.vacationId}>
                        <td>{vacation.departmentName}</td>
                        <td>{vacation.name}</td>
                        <td>{vacation.startDateTime}</td>
                        <td>{vacation.endDateTime}</td>
                        <td>{vacation.vacationStatus}</td>
                        <td>{getVacationType(vacation)} </td>
                    </tr>))}
                </table>
            )}
        </Fragment>
    )
} 