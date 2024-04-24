import { useEffect, useState } from "react";
import VacationSidebar from "../../layout/VacationSidebar";
import { getVacations } from "../../api/vacationApi";
import VacationTable from "../table/VacationTable";
import { getDeparmentMembers } from "../../api/memberApi";

const tag = '[MyVacation] COMPONENT'

export default function MyVacation() {
    console.log(tag);

    const [deparmentMembers, setDepartmentMembers] = useState([]);
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

    return (
        <VacationSidebar>
            <main>
                <article>
                    <VacationTable
                        tableTitle={"내 휴가"}
                        vacationList={raisedAfterVacations} />
                </article>
                <article>
                    <VacationTable
                        tableTitle={"작성중인 휴가"}
                        vacationList={raiseBeforeVacations}
                        deparmentMembers={deparmentMembers} />
                </article>
            </main>
        </VacationSidebar>
    )
}