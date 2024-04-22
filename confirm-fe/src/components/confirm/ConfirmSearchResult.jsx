import { Fragment } from "react";
import { convertDateTime } from "../../converter/DateTimeConvert";
import ConfirmSidebar from "../../layout/ConfirmSidebar";


export function ConfirmSearchResult({ confirms }) {

    const approveStatusConst = {
        PENDING: '미결',
        REJECT: '반려',
        ACCEPT: '승인'
    }

    const documentTypeConst = {
        VAC: '휴가'
    }

    const convertApproveStatus = (approveStatus) => {
        return approveStatusConst[approveStatus] || ''
    }

    const convertDocumentType = (documentType) => {
        return documentTypeConst[documentType] || ''
    }

    return (
        <Fragment>
            <ConfirmSidebar>
                <h2>부서 결재함</h2>
                <table className="vacation_table">
                    <thead>
                        <tr>
                            <td>문서 ID</td>
                            <td>상신 일시</td>
                            <td>문서 유형</td>
                            <td>기안자 부서</td>
                            <td>기안자 ID</td>
                            <td>승인/반려</td>
                            <td>승인/반려 일시</td>
                        </tr>
                    </thead>
                    <tbody>
                        {confirms.data && confirms.data.map(confirm => (
                            <tr key={confirm.pk}>
                                <td>{confirm.pk}</td>
                                <td>{convertDateTime(confirm.createTime)}</td>
                                <td>{convertDocumentType(confirm.documentType)}</td>
                                <td>{confirm.departmentId}</td>
                                <td>{confirm.requesterId}</td>
                                <td>{convertApproveStatus(confirm.approveStatus)}</td>
                                <td>{confirm.approvalTime ? convertDateTime(confirm.approvalTime) : null}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ConfirmSidebar>
        </Fragment>
    )
}