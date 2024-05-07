import { useEffect, useState } from "react";
import { Header } from "../../components/layout/Header";
import Page from "../../components/layout/Page";
import Table from "../../components/table/Table";
import ConfirmSidebar from "./ConfirmSidebar";
import { getConfirmDocument, getConfirmDocumentIncludeApproval } from "../../api/confirmApi";


export default function MyConfirmDocument() {
    const [drafteConfirmDocuments, setDrafteConfirmDoucments] = useState([]);
    const [approvalConfirmDocuments, setApprovalConfirmDocuments] = useState([]);

    const confirmDocumentTableColumns = () => {
        const columnNames = ['문서 ID', '상신 일시', '문서 유형', '기안자 부서', '기안자 ID','승인/반려', '승인/반려 일시']
        return (
            <tr>{columnNames.map((col) => (<td>{col}</td>))}</tr>
        )
    }

    const handleMount = async () => {
        const response = await getConfirmDocumentIncludeApproval();
        setApprovalConfirmDocuments(response.data);
    }

    const handleMount2 = async () => {
        const param = {
            requesterId: sessionStorage.getItem('memberId')
        }
       const response = await getConfirmDocument(param);
       setDrafteConfirmDoucments(response.data.data);
    }

    useEffect(() => {
        handleMount();
        handleMount2();
    }, []);

    console.log('1', drafteConfirmDocuments);
    console.log('2', approvalConfirmDocuments);
    return (
        <Page header={<Header />}
            sidebar={<ConfirmSidebar />}>
            <Table title={"기안 문서"} cn={{ table: "vacation_table" }}
                tableProperty={{
                    columns: confirmDocumentTableColumns(),
                    data: approvalConfirmDocuments.map((document) => (
                        <tr>
                            <td>#</td>
                            <td>#</td>
                            <td>#</td>
                            <td>#</td>
                            <td>#</td>
                            <td>#</td>
                            <td>#</td>
                        </tr>
                    )),
                    showCondition: true
                }} />
            <Table title={"결재 대기중인 문서"} cn={{ table: "vacation_table" }}
                tableProperty={{
                    columns: confirmDocumentTableColumns(),
                    data: drafteConfirmDocuments.map((document) => (
                        <tr>
                            <td>#</td>
                            <td>#</td>
                            <td>#</td>
                            <td>#</td>
                            <td>#</td>
                            <td>#</td>
                            <td>#</td>
                        </tr>
                    )),
                    showCondition: true
                }} />
        </Page>
    )
} 