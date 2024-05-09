import { useEffect, useState } from "react";
import { getDepartmentConfirmDocuments } from "../../api/confirmApi";
import Page from "../../components/layout/Page";
import ConfirmSidebar from "./ConfirmSidebar";
import { Header } from "../../components/layout/Header";
import { ConfirmDocumentModal } from "./ConfirmDocumentModal";
import Table from "../../components/table/Table";
import { convertDateTime } from "../../converter/DateTimeConvert";
import { convertApproveStatus, convertConfirmStatus, convertDocumentType } from "../../converter/DocumentConverter";

export function Confirm() {

    const [confirms, setConfirms] = useState([]);
    const [modelOpen, setModalOpen] = useState(false);
    const [selectedDocumentContentPk, setDocumentContentPk] = useState();

    const handleOpenModal = (documentContentPk) => {
        setDocumentContentPk(documentContentPk);
        setModalOpen(true);
    }

    const getDateToServer = async () => {
        try {
            const response = await getDepartmentConfirmDocuments();
            setConfirms(response.data === undefined ? [] : response.data.data);
        } catch (error) {
        }
    }

    useEffect(() => {
        getDateToServer();
    }, []);

    return (
        <Page header={<Header />} sidebar={<ConfirmSidebar />}>
            {<ConfirmDocumentModal
                modalOpen={modelOpen}
                setModalOpen={setModalOpen}
                documentContentPk={selectedDocumentContentPk}
            />}
            <Table title={"부서 결재함"}
                cn={{ table: "vacation_table" }}
                tableProperty={{
                    columns: ['문서 ID', '상신 일시', '문서 유형', '기안자', '승인/반려', '승인/반려 일시'],
                    data: confirms.map((confirm) => (
                        <tr key={confirm.pk}
                            onClick={() => handleOpenModal(confirm.contentPk)}>
                            <td>{confirm.confirmDocumentId}</td>
                            <td>{confirm.createTime ? convertDateTime(confirm.createTime) : ''}</td>
                            <td>{convertDocumentType(confirm.documentType)}</td>
                            <td>{confirm.requesterName}</td>
                            <td>{convertConfirmStatus(confirm.confirmStatus)}</td>
                            <td>{confirm.approvalTime ? convertDateTime(confirm.approvalTime) : '결재 진행중'}</td>
                        </tr>
                    )),
                    showCondition: true
                }} />
        </Page>
    )
}