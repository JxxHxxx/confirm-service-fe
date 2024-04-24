import { useEffect, useState } from "react";
import VacationSidebar from "../../layout/VacationSidebar";
import { getVacations } from "../../api/vacationApi";
import VacationTable from "../table/VacationTable";
import { getDeparmentMembers } from "../../api/memberApi";
import { convertVacationStatus, convertVacationType } from "../../converter/VacationConverter";
import { convertDate } from "../../converter/DateTimeConvert";
import { useNavigate } from "react-router-dom";

const tag = '[MyVacation] COMPONENT'

export default function MyVacation() {
    console.log(tag);

    const navigate = useNavigate();
    const [departmentMembers, setDepartmentMembers] = useState([]);
    const [createdMyVacations, setCreatedMyVacations] = useState([]);

    const handleVacationList = async () => {
        const addParams = {
            requesterId: sessionStorage.getItem("memberId")
        }
        const result = await getVacations(addParams);
        setCreatedMyVacations(result);
    }

    const handleApprovalLine = async () => {
        const findDepartmentMembers = await getDeparmentMembers();
        setDepartmentMembers(findDepartmentMembers);
    }

    useEffect(() => {
        handleVacationList();
        handleApprovalLine();
    }, [])

    const raisedAfterVacations = createdMyVacations.filter(vacation => vacation.vacationStatus !== 'CREATE')
    const raiseBeforeVacations = createdMyVacations.filter(vacation => vacation.vacationStatus === 'CREATE')

    const handleOnClickTableRow = (vacationId) => {
        navigate('/vacation/vacation-id/ApprovalLine',
            {
                state: {
                    departmentMembers: departmentMembers,
                    vacationId: vacationId
                }
            })

    }

    return (
        <VacationSidebar>
            <main>
                <article>
                    <h2>내 휴가</h2>
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
                            {raisedAfterVacations.length > 0 && raisedAfterVacations.map(vacation => {
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
                </article>
                <article>
                    <h2>작성중인 휴가</h2>
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
                            {raiseBeforeVacations.length > 0 && raiseBeforeVacations.map(vacation => {
                                return (<tr
                                    id={vacation.vacationDurationId}
                                    key={vacation.vacationDurationId}
                                    onClick={() => handleOnClickTableRow(vacation.vacationId)}
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
                </article>
            </main>
        </VacationSidebar>
    )
}