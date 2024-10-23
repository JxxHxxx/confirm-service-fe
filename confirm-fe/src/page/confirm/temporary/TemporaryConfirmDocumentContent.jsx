import { useEffect, useState } from "react";
import ConfirmApi from "../../../api/confirmApi"
import MainContainer from "../../../components/layout/container/MainContainer";
import Title from "../../document/Title";
import { DocumentConverter } from "../../../converter/DocumentConverter";
import { format } from "date-fns";
import ConfirmDocumentWrapper from "../../document/ConfirmDocumentWrapper";

export default function TemporaryConfirmDocumentContent() {

    const [tempConfirmDocument, setTempConfirmDocument] = useState([]);
    const [selectedTempConfirmDocument, setSelectedTempConfirmDocument] = useState({
        title: ''
    });

    const requestConfirmDocuments = async () => {
        try {
            const params = {
                requesterId: sessionStorage.getItem('memberId'),
                confirmStatus: 'CREATE',
            }
            const { data, status } = await ConfirmApi.searchConfirmDocuments(params);

            if (status === 200) {
                setTempConfirmDocument(data.data);
            }
        } catch (e) {
            alert(e);
        }
    }

    const [modalOpen, setModalOpen] = useState(false);

    const handleOnclickTempConfirmRow = (confirmDocument) => {
        setSelectedTempConfirmDocument(confirmDocument);
        setModalOpen(true);
    }

    // 임시
    useEffect(() => {
        requestConfirmDocuments();
    }, [])

    return <MainContainer>
        <div id="temporaryConfirmContainer" style={{ border: '1px dashed blue', width: '900px', margin: '0px 0px 50px 0px', padding: '20px' }}>
            <Title className="titleLeft" name="임시보관함" desc="상신 전의 결재 문서를 보관합니다" />
            {tempConfirmDocument.length > 0
                ? <table style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr >
                            <td style={{ width: '175px' }} >문서 ID</td>
                            <td style={{ width: '175px' }}>생성일시</td>
                            <td style={{ padding: '3px' }}>기안자</td>
                            <td style={{ width: '200px' }}>기안자 부서</td>
                            <td style={{ width: '100px', textAlign: 'center' }}>문서 유형</td>
                        </tr>
                    </thead>
                    <tbody className="tempConfirmBody">
                        {tempConfirmDocument.map(tcd => <tr onClick={() => handleOnclickTempConfirmRow(tcd)}>
                            <td>{tcd.confirmDocumentId}</td>
                            <td>{format(tcd.createTime, 'yyyy-MM-dd HH:mm:ss')}</td>
                            <td style={{ textAlign: 'center' }}>{tcd.requesterName}</td>
                            <td>{tcd.departmentName}</td>
                            <td style={{ textAlign: 'center' }}>{DocumentConverter.convertDocumentType(tcd.documentType)}</td>
                        </tr>)}
                    </tbody>
                </table>
                : <p style={{
                    padding: '0px',
                    color: 'gray',
                    fontFamily: 'Maruburi',
                    fontSize: '13px',
                }}>임시 보관함이 비어있습니다.</p>
            }
            <ConfirmDocumentWrapper
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                confirmDocument={selectedTempConfirmDocument}
                setConfirmDocument={setSelectedTempConfirmDocument} />
        </div>
    </MainContainer >
}