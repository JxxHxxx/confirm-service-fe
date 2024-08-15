import { useEffect, useState } from "react";
import { Header } from "../../components/layout/Header";
import Page from "../../components/layout/Page";
import Table from "../../components/table/Table";
import ConfirmSidebar from "./ConfirmSidebar";
import { getConfirmDocumentWithApprovalLines, getConfirmDocumentsWrittenSelf } from "../../api/confirmApi";
import { convertApproveStatus, convertConfirmStatus, convertDocumentType } from "../../converter/DocumentConverter";
import { convertDateTime } from "../../converter/DateTimeConvert";
import ConfirmDocumentWrapper from "../document/ConfirmDocumentWrapper";


export default function MyConfirmDocument() {
    const [drafteConfirmDocuments, setDrafteConfirmDoucments] = useState([]);
    const [approvalConfirmDocuments, setApprovalConfirmDocuments] = useState([]);

    const fetchApprovalPendingConfirmDocuments = async () => {
        try {
            const params = {
                confirmStatus: 'RAISE', // 상신 상태인 문서만 조회
                approveStatus: 'PENDING',
                confirmStatus: 'RAISE',
                approvalId: sessionStorage.getItem('memberId')
            }

            const response = await getConfirmDocumentWithApprovalLines(params);

            setApprovalConfirmDocuments(response.data === undefined ? [] : response.data.data);
        } catch (error) {
            alert('check server connection');
        }

    }

    const fetchDrafteConfirmDocuments = async () => {
        const param = {
            companyId: sessionStorage.getItem('companyId'),
            departmentId: sessionStorage.getItem('departmentId'),
            requesterId: sessionStorage.getItem('memberId')
        }
        try {
            const response = await getConfirmDocumentsWrittenSelf(param);
            // TODO => 결재 라인 두 명 이 상 일 떄 PK 겹침
            const confirmDocuments = response.data === undefined ? [] : response.data.data;
            setDrafteConfirmDoucments(confirmDocuments);

        } catch (error) {
            alert('check server connection');
        }
    }

    const [modelOpen, setModalOpen] = useState(false);
    const [selectedDocumentContentPk, setDocumentContentPk] = useState();
    const [selectedDocument, setSelectedDocument] = useState();

    const handleOpenModal = (document, documentContentPk) => {
        setSelectedDocument(document);
        setDocumentContentPk(documentContentPk);
        setModalOpen(true);
    }


    useEffect(() => {
        fetchApprovalPendingConfirmDocuments();
        fetchDrafteConfirmDocuments();
    }, [modelOpen]);

    return (
        <Page header={<Header />}
            sidebar={<ConfirmSidebar />}>
            <ConfirmDocumentWrapper
                confirmDocument={selectedDocument}
                setConfirmDocument={setSelectedDocument}
                modalOpen={modelOpen}
                setModalOpen={setModalOpen} />
            <Table title={"결재 대기중인 문서"} cn={{ table: "vacation_table" }}
                tableProperty={{
                    columns: ['문서 ID', '상신 일시', '문서 유형', '기안자 부서', '기안자명', '승인/반려', '승인/반려 일시'],
                    data: approvalConfirmDocuments.map((document) => (
                        <tr key={document.pk}
                            onClick={() => handleOpenModal(document, document.confirmDocumentContentPk)}>
                            <td>{document.confirmDocumentId}</td>
                            <td>{convertDateTime(document.createTime)}</td>
                            <td>{convertDocumentType(document.documentType)}</td>
                            <td>{document.contents.department_name}</td>
                            <td>{document.contents.requester_name}</td>
                            <td>{convertApproveStatus(document.approvalStatus)}</td>
                            <td>{convertDateTime(document.completedTime)}</td>
                        </tr>
                    )),
                    showCondition: true
                }} />

            <Table title={"작성한 결재 문서"} cn={{ table: "vacation_table" }}
                tableProperty={{
                    columns: ['문서 ID', '상신 일시', '문서 유형', '기안자 부서', '기안자명', '결재 상태', '승인/반려 일시'],
                    data: drafteConfirmDocuments.map((document) => (
                        <tr key={document.approvalLinePk}
                            onClick={() => handleOpenModal(document, document.contentPk)}>
                            <td>{document.confirmDocumentId}</td>
                            <td>{convertDateTime(document.createTime)}</td>
                            <td>{convertDocumentType(document.documentType)}</td>
                            <td>{document.contents.department_name}</td>
                            <td>{document.contents.requester_name}</td>

                            <td>{convertConfirmStatus(document.confirmStatus)}</td>
                            <td>{convertDateTime(document.completedTime)}</td>
                        </tr>
                    )),
                    showCondition: true
                }} />
        </Page>
    )
} 