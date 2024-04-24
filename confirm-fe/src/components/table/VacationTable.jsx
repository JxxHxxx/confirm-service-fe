import { Fragment } from "react";
import { convertDate } from "../../converter/DateTimeConvert";
import { convertVacationStatus, convertVacationType } from "../../converter/VacationConverter";

const tag = '[VacationTable] COMPONENT';

export default function VacationTable({ tableTitle, vacationList }) {
    console.log(tag);

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