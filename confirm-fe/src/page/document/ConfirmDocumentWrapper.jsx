import { useEffect, useState } from "react";
import { ConfirmApi, getConfirmDocumentContent, getConfirmDocumentElementsV2 } from "../../api/confirmApi";
import ConfirmDocumentModalV2 from "./ConfirmDocumentModalV2";
import DocumentContentV2 from "./DocumentContentV2";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { VacationApi } from "../../api/vacationApi";

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

    // const handleOnClickConfirmDocumentRaise = async () => {
    //     try {
    //         const res = await ConfirmApi.raiseConfirmDocument(confirmDocument.confirmDocumentId);

    //         if (res.status === 200) {
    //             alert('상신 완료되었습니다');
    //         }
    //     }
    //     catch (e) {
    //         alert(e);
    //     }
    // }

    const handleOnClickConfirmDocumentRaise = async () => {
        // 휴가 신청서의 경우, 결재 문서를 상신할 때 휴가 서버를 거쳐야 한다.
        const documentType = confirmDocument.documentType;
        console.log('documentType', documentType);
            // 휴가 문서일 경우, resourceId 를 보냄, 휴가 서버로 통신
            if (documentType === 'VAC') {
                let resourceId = confirmDocument.confirmDocumentId;
                resourceId = resourceId.replace(documentType, "");
                resourceId = resourceId.replace(confirmDocument.companyId, "");

            const result = await VacationApi.raiseConfirmDoucment(resourceId);

            if (result.status === 200) {
                alert('상신 완료')
                return;
            }
            else {
                alert(result.response.data.message);
                return;
            }

        } else {
            try {
                const result = await ConfirmApi.raiseConfirmDocument(confirmDocument.confirmDocumentId);
                if (result.status === 200) {
                    alert('상신 완료');
                    return;
                }
            } 
            catch(e) {
                alert(e);
            }
        }
    }

    const handleOnClickSetApprovalLineBtn = () => {
        const documentType = confirmDocument.documentType;
        // 휴가 문서일 경우, resourceId 를 보냄, 휴가 서버로 통신
        if (documentType === 'VAC') {
            let resourceId = confirmDocument.confirmDocumentId;
            resourceId = resourceId.replace(documentType, "");
            resourceId = resourceId.replace(confirmDocument.companyId, "");

            nav(`/confirm/${confirmDocument.confirmDocumentId}/ApprovalLine`, {
                state: {
                    documentType: documentType,
                    resourceId: resourceId
                }
            })
        }
        // 그 외 경우에는 결재 서버로 통신 
        else {
            nav(`/confirm/${confirmDocument.confirmDocumentId}/ApprovalLine`, {
                state: {
                    documentType: documentType,
                    confirmDocumentId: confirmDocument.confirmDocumentId,

                }
            })
        }

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
                            onClick={handleOnClickSetApprovalLineBtn} />
                    }
                </div>
            }
            <DocumentContentV2 documentElements={documentElements} contents={documentContents} />
        </ConfirmDocumentModalV2>
    );
}