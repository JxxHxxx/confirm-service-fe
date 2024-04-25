import { Fragment, useState } from "react";
import { convertDateTime } from "../../converter/DateTimeConvert";
import ConfirmSidebar from "../../layout/ConfirmSidebar";
import { convertApproveStatus, convertDocumentType } from "../../converter/DocumentConverter";
import { ConfirmDocumentModal } from "./ConfirmDocumentModal";


export function ConfirmSearchResult({ confirms }) {
    const [modelOpen, setModalOpen] = useState(false);
    const [selectedDocumentPk, setSelectedDocumentPk] = useState(null);

    const handleOpenModal = (confirmDocumentPk) => {
        setSelectedDocumentPk(confirmDocumentPk);
        setModalOpen(true);
    }

    return (
        <Fragment>
            <ConfirmSidebar>
                <h2>부서 결재함</h2>
                {<ConfirmDocumentModal
                    confirmDocumentPk={selectedDocumentPk}
                    modalOpen={modelOpen}
                    setModalOpen={setModalOpen}
                />}
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
                            <tr key={confirm.pk} onClick={() => handleOpenModal(confirm.pk)}> {/* 클릭 이벤트 핸들러 변경 */}
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