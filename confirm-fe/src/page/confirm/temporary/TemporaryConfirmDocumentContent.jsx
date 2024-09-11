import { useEffect, useState } from "react";
import { ConfirmApi } from "../../../api/confirmApi"
import MainContainer from "../../../components/layout/container/MainContainer";
import Title from "../../document/Title";
import Table from "../../../components/table/Table";
import { DocumentConverter } from "../../../converter/DocumentConverter";

export default function TemporaryConfirmDocumentContent() {

    const [tempConfirmDocument, setTempConfirmDocument] = useState();

    const requestConfirmDocuments = async () => {
        const params = {
            requesterId: sessionStorage.getItem('memberId'),
            confirmStatus: 'CREATE',
        }
        const { data, status } = await ConfirmApi.searchConfirmDocuments(params);
        setTempConfirmDocument(data.data);
    }



    // 임시
    useEffect(() => {
        requestConfirmDocuments();
    }, [])

    return <MainContainer>
        <div id="temporaryConfirmContainer" style={{ border: '1px dashed blue', width: '900px', margin: '0px 0px 50px 0px', padding: '20px' }}>
            <Title className="titleLeft" name="임시보관함" />
            <Table tableProperty={
                {
                    columns: ['문서 ID', '기안자', '기안자 부서', '문서 유형'],
                    data: <>
                    {tempConfirmDocument.map(tcd => <tr>
                        <td>{tcd.confirmDocumentId}</td>
                        <td>{tcd.requesterName}</td>
                        <td>{tcd.departmentName}</td>
                        <td>{DocumentConverter.convertDocumentType(tcd.documentType)}</td>
                    </tr>)}
                    </>
                }
            } />
        </div>
    </MainContainer>
}