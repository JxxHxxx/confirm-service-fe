import { useEffect, useState } from "react";
import { getDepartmentConfirmDocuments } from "../../api/confirmApi";
import Page from "../../components/layout/Page";
import ConfirmSidebar from "./ConfirmSidebar";
import { Header } from "../../components/layout/Header";
import Table from "../../components/table/Table";
import { convertDateTime } from "../../converter/DateTimeConvert";
import { convertConfirmStatus, convertDocumentType } from "../../converter/DocumentConverter";
import { format } from "date-fns";
import ConfirmDocumentWrapper from "../document/ConfirmDocumentWrapper";

export function DepartmentConfirmDocumentPage() {

    const [confirms, setConfirms] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDocumentContentPk, setDocumentContentPk] = useState();
    const [selectedDocument, setSelectedDocument] = useState();

    const handleOpenModal = (document, documentContentPk) => {
        setSelectedDocument(document);
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

    // 최초 리랜더링, 모달이 open/close 될 때 마다 리랜더링 함... 
    // 더 효율적으로 하려면 모달에서 상신/반려 버튼이 눌렸을 때만 리랜더링 하는게 나아보임...
    useEffect(() => {
        getDateToServer();
    }, []);


    return (
        <Page header={<Header />} sidebar={<ConfirmSidebar />}>
            {<ConfirmDocumentWrapper
                confirmDocumentContentPk={selectedDocumentContentPk}
                confirmDocument={selectedDocument}
                setConfirmDocument={setSelectedDocument}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen} />}
            <Table title={"부서 결재함"}
                cn={{ table: "vacation_table" }}
                tableProperty={{
                    columns: ['문서 ID', '상신 일시', '문서 유형', '기안자', '승인/반려', '승인/반려 일시'],
                    data: confirms.map((confirm) => (
                        <tr key={confirm.pk}
                            onClick={() => handleOpenModal(confirm, confirm.contentPk)}>
                            <td>{confirm.confirmDocumentId}</td>
                            <td>{confirm.createTime ? convertDateTime(confirm.createTime) : ''}</td>
                            <td>{convertDocumentType(confirm.documentType)}</td>
                            <td>{confirm.requesterName}</td>
                            <td>{convertConfirmStatus(confirm.confirmStatus)}</td>
                            <td>{confirm.completedTime ? format(confirm.completedTime, 'yyyy/MM/dd HH:mm:ss') : '결재 진행중'}</td>
                        </tr>
                    )),
                    showCondition: true
                }} />
        </Page>
    )
}