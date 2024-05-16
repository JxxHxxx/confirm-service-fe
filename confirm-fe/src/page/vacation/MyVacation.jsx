import { useEffect, useState } from "react";
import VacationSidebar from "./VacationSidebar";
import { getVacations } from "../../api/vacationApi";
import { getDeparmentMembers } from "../../api/memberApi";
import { convertVacationStatus, convertVacationType } from "../../converter/VacationConverter";
import { convertDate } from "../../converter/DateTimeConvert";
import { useNavigate } from "react-router-dom";
import Page from "../../components/layout/Page";
import { Header } from "../../components/layout/Header";
import Table from "../../components/table/Table";

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
        navigate(`/vacation/${vacationId}/ApprovalLine`,
            {
                state: {
                    departmentId: sessionStorage.getItem('departmentId')
                }
            })
    }

    return (
        <Page
            header={<Header />}
            sidebar={<VacationSidebar />}>
            <Table title={"내 휴가"}
                cn={{
                    table: 'vacation_table'
                }}
                tableProperty={{
                    columns: ['휴가ID', '부서', '이름', '시작일', '종료일', '휴가 진행 상태', '휴가 유형'],
                    data: raisedAfterVacations.map((vacation) => (
                        <tr id={vacation.vacationDurationId}
                            key={vacation.vacationDurationId}>
                            <td>{vacation.vacationId}</td>
                            <td>{vacation.departmentName}</td>
                            <td>{vacation.name}</td>
                            <td>{convertDate(vacation.startDateTime)}</td>
                            <td>{convertDate(vacation.endDateTime)}</td>
                            <td>{convertVacationStatus(vacation)}</td>
                            <td>{convertVacationType(vacation)} </td>
                        </tr>
                    )),
                    showCondition: raisedAfterVacations.length > 0
                }} />
            <Table title={"작성중인 휴가"}
                cn={{
                    table: 'vacation_table'
                }}
                tableProperty={{
                    columns: ['휴가ID', '부서', '이름', '시작일', '종료일', '휴가 진행 상태', '휴가 유형'],
                    data: raiseBeforeVacations.map((vacation) => (
                        <tr id={vacation.vacationDurationId}
                            key={vacation.vacationDurationId}
                            onClick={() => handleOnClickTableRow(vacation.vacationId)}>
                            <td>{vacation.vacationId}</td>
                            <td>{vacation.departmentName}</td>
                            <td>{vacation.name}</td>
                            <td>{convertDate(vacation.startDateTime)}</td>
                            <td>{convertDate(vacation.endDateTime)}</td>
                            <td>{convertVacationStatus(vacation)}</td>
                            <td>{convertVacationType(vacation)} </td>
                        </tr>
                    )),
                    showCondition: raiseBeforeVacations.length > 0
                }} />
        </Page>
    )
}