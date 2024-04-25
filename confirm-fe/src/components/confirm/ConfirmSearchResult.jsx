import { Fragment } from "react";
import { convertDateTime } from "../../converter/DateTimeConvert";
import ConfirmSidebar from "../../layout/ConfirmSidebar";
import { convertApproveStatus, convertDocumentType } from "../../converter/DocumentConverter";
import { ConfirmDocumentModal } from "./ConfirmDocumentModal";


export function ConfirmSearchResult({ confirms }) {
    
    const handleOnClickDocumentSummary = async (confirmDocumentPk) => {
        // TODO : 문서의 상세 내용을 나타내는 모달창 띄우기
    }

    return (
        <Fragment>
            <ConfirmSidebar>
                <h2>부서 결재함</h2>
                <ConfirmDocumentModal />
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
                            <tr key={confirm.pk} onClick={() => handleOnClickDocumentSummary(confirm.pk)}>
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