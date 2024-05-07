import { useEffect, useState } from "react";
import { getConfirmDocumentIncludeApproval } from "../../api/confirmApi";
import Page from "../../components/layout/Page";
import ConfirmSidebar from "./ConfirmSidebar";
import { Header } from "../../components/layout/Header";
import { ConfirmDocumentModal } from "./ConfirmDocumentModal";
import Table from "../../components/table/Table";
import { convertDateTime } from "../../converter/DateTimeConvert";
import { convertApproveStatus, convertDocumentType } from "../../converter/DocumentConverter";

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
            const response = await getConfirmDocumentIncludeApproval();
            setConfirms(response.data === undefined ? [] : response.data);
        } catch (error) {
        }
    }

    useEffect(() => {
        getDateToServer();
    }, []);

    const confirmDocumentTableColumns = () => {
        const columnNames = ['문서 ID', '상신 일시', '문서 유형', '기안자 부서', '기안자 ID', '승인/반려', '승인/반려 일시']
        return (
            <tr>{columnNames.map((col) => (<td>{col}</td>))}</tr>
        )
    }

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
                    columns: confirmDocumentTableColumns(),
                    data: confirms.map((confirm) => (
                        <tr key={confirm.pk}
                            onClick={() => handleOpenModal(confirm.confirmDocumentContentPk)}>
                            <td>{confirm.pk}</td>
                            <td>{convertDateTime(confirm.createTime)}</td>
                            <td>{convertDocumentType(confirm.documentType)}</td>
                            <td>{confirm.departmentId}</td>
                            <td>{confirm.requesterId}</td>
                            <td>{convertApproveStatus(confirm.approveStatus)}</td>
                            <td>{confirm.approvalTime ? convertDateTime(confirm.approvalTime) : null}</td>
                        </tr>
                    )),
                    showCondition: true
                }} />
        </Page>
    )
}