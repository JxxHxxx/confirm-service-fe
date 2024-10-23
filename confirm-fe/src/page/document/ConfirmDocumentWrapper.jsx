import { useEffect, useState } from "react";
import { ConfirmApi, getConfirmDocumentContent, getConfirmDocumentElementsV2 } from "../../api/confirmApi";
import ConfirmDocumentModalV2 from "./ConfirmDocumentModalV2";
import DocumentContentV2 from "./DocumentContentV2";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

const approvalLineButtonDisplayStatus = ['CREATED', 'BEFORE_CREATE']
const raiseButtonDisplayStatus = ['CREATE', 'UPDATE']

export default function ConfirmDocumentWrapper({
    modalOpen,
    setModalOpen,
    confirmDocument = { confirmDocumentId: '', contentPk: '', contents: { title: '' } },
    setConfirmDocument }) {

    const nav = useNavigate();

    const [documentContents, setDocumentContents] = useState({});
    const [documentElements, setDocumentElements] = useState([{ elementGroupName: '', elements: [] }]);
    const requestToServer = async () => {
        if (confirmDocument.contentPk) {
            const contentsResponse = await getConfirmDocumentContent(confirmDocument.contentPk);
            const elementsResponse = await getConfirmDocumentElementsV2(confirmDocument.documentType);

            setDocumentContents(contentsResponse.data.contents);

            // 요소값 정렬
            const sortedElements = elementsResponse.data.data
                .sort((e1, e2) => e1.elementGroupOrder - e2.elementGroupOrder);
            setDocumentElements(sortedElements);
        }
    }

    const handleOnClickConfirmDocumentRaise = async () => {
        const result = await ConfirmApi.raiseConfirmDocument(confirmDocument.confirmDocumentId);

        if (result.status === 200) {
            alert('상신 완료')
            return;
        }
        else {
            alert(result.response.data.message);
            return;
        }
    }


const handleNavApprovalLine = (confirmDocumentId) => {
    nav(`/confirm/${confirmDocumentId}/ApprovalLine`)
}


useEffect(() => {
    requestToServer();
}, [confirmDocument])


return (
    <ConfirmDocumentModalV2
        confirmDocument={confirmDocument}
        setConfirmDocument={setConfirmDocument}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}>
        {/* 기안자일 경우에 결재선 지정, 상신 버튼 표시 */}
        {confirmDocument.requesterId === sessionStorage.getItem('memberId') &&
            <div id="approvalLineAndRaiseDiv"
                style={{ display: 'flex', paddingBottom: '5px' }}>
                {raiseButtonDisplayStatus.includes(confirmDocument.confirmStatus) &&
                    <Button cn="btnInsideConfirmDocument"
                        name="상신"
                        onClick={handleOnClickConfirmDocumentRaise}
                        style={{ marginRight: '5px' }} />
                }
                {approvalLineButtonDisplayStatus.includes(confirmDocument.approvalLineLifecycle) &&
                    <Button cn="btnInsideConfirmDocument"
                        name="결재선 지정"
                        onClick={() => handleNavApprovalLine(confirmDocument.confirmDocumentId)} />
                }
            </div>
        }
        <DocumentContentV2 documentElements={documentElements} contents={documentContents} />
    </ConfirmDocumentModalV2>
);
}