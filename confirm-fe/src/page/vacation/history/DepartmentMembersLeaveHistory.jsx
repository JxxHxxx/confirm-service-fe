import { Fragment, useEffect, useState } from "react";
import { getDeparmentMemberLeaves } from "../../../api/memberApi"
import Pagination from "../../../components/pagination/Pagination";
import { leaveHistoryContext } from "../../../context/PaginationContext";

const size = 10;

export default function DepartmentMembersLeaveHistory() {
    const [memberLeaveHistPgn, setMemberLeaveHistPgn] = useState({
        content: [],
        pageable: {
            pageNumber: 0
        }
    });

    const requestToServer = async () => {
        const params = {
            page: memberLeaveHistPgn.pageable.pageNumber,
            size: size
        }
        const response = await getDeparmentMemberLeaves(params);

        setMemberLeaveHistPgn(response);
    }

    const updatePageNumber = (btnNum) => {
        setMemberLeaveHistPgn((prev) => ({
            ...prev,
            pageable: {
                ...prev.pageable,
                pageNumber: btnNum - 1 // 버튼 넘버에서 - 1 해야 pageNumber 기 때문에...
            }
        }))
    }

    useEffect(() => {
        requestToServer();
    }, [memberLeaveHistPgn.pageable.pageNumber])

    return (
        <Fragment>
            <p style={{fontSize : '22px'}}>부서 연차 현황</p>
            <leaveHistoryContext.Provider value={memberLeaveHistPgn}>
                <Pagination
                    pageContext={leaveHistoryContext}
                    sendToBtnNumber={(btnNum) => updatePageNumber(btnNum)}
                    totalPages={memberLeaveHistPgn.totalPages}
                    columns={['이름', '부서명', '입사일', '총 연차', '사용 연차', '잔여 연차']}
                    rows={memberLeaveHistPgn.content.map((memberLeave => (
                        <tr key={memberLeave.memberId}>
                            <td>{memberLeave.name}</td>
                            <td>{memberLeave.departmentName}</td>
                            <td>{memberLeave.enteredDate}</td>
                            <td>{memberLeave.totalLeave}개</td>
                            <td>{memberLeave.totalLeave - memberLeave.remainingLeave}개</td>
                            <td>{memberLeave.remainingLeave}개</td>
                        </tr>
                    )))
                    }
                />
            </leaveHistoryContext.Provider>
        </Fragment>
    )
}