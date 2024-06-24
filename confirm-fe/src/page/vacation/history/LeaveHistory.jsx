import { Fragment, useEffect, useState } from "react";
import { getDeparmentMemberLeaves } from "../../../api/memberApi"
import Table from "../../../components/table/Table";
import PaginationButtons from "../../../components/button/PaginationButtons";

const size = 5;

export default function LeaveHistory() {
    const [memberLeaves, setMemberLeaves] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        totalPages: 0
    });
    const requestToServer = async () => {
        const params = {
            page: pagination.page,
            size: size
        }
        const response = await getDeparmentMemberLeaves(params);
        setPagination((prev) => ({
            ...prev,
            totalPages: response.totalPages
        }))
        setMemberLeaves(response.content);
    }

    const handleCallback = (pageNum) => {
        setPagination((prev) => ({
            ...prev,
            page: pageNum
        }))
    }

    useEffect(() => {
        requestToServer();
    }, [pagination.page])

    return (
        <Fragment>
            <Table
                title="연차 히스토리"
                tableProperty={{
                    showCondition: true,
                    columns: ['이름', '부서명', '입사일', '총 연차', '사용 연차', '잔여 연차'],
                    data: memberLeaves.map((memberLeave => (
                        <tr key={memberLeave.memberId}>
                            <td>{memberLeave.name}</td>
                            <td>{memberLeave.departmentName}</td>
                            <td>{memberLeave.enteredDate}</td>
                            <td>{memberLeave.totalLeave}개</td>
                            <td>{memberLeave.totalLeave - memberLeave.remainingLeave}개</td>
                            <td>{memberLeave.remainingLeave}개</td>
                        </tr>
                    )))
                }} />
            <div style={{ 'marginBottom': '30px' }}></div>
            <PaginationButtons
                totalPages={pagination.totalPages}
                sendPageNumCallback={handleCallback} />
        </Fragment>

    )
}