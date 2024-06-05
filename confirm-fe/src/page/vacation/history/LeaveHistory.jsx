import { Fragment, useEffect, useState } from "react";
import { getDeparmentMembers } from "../../../api/memberApi"
import Table from "../../../components/table/Table";


export default function LeaveHistory() {
    const [memberLeaves, setMemberLeaves] = useState([]);

    const requestToServer = async () => {
        const response = await getDeparmentMembers();
        setMemberLeaves(response);
    }

    console.log('memberLeaves', memberLeaves);
    useEffect(() => {
        requestToServer();
    }, [])

    return (
        <Fragment>
            <Table
                title="연차 히스토리"
                tableProperty={{
                    showCondition: true,
                    columns: ['부서명', '이름', '입사일', '총 연차', '사용 연차', '잔여 연차'],
                    data: memberLeaves.map((memberLeave => (
                        <tr>
                            <td>{memberLeave.departmentName}</td>
                            <td>{memberLeave.name}</td>
                            <td>{memberLeave.enteredDate}</td>
                            <td>{memberLeave.totalLeave}개</td>
                            <td>{memberLeave.totalLeave - memberLeave.remainingLeave}개</td>
                            <td>{memberLeave.remainingLeave}개</td>
                        </tr>
                    )))
                }} />
        </Fragment>

    )
}