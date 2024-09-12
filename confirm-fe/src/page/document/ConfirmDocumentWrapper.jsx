import { useEffect, useState } from "react";
import { getConfirmDocumentContent, getConfirmDocumentElementsV2 } from "../../api/confirmApi";
import ConfirmDocumentModalV2 from "./ConfirmDocumentModalV2";
import DocumentContentV2 from "./DocumentContentV2";
import Button from "../../components/button/Button";


export default function ConfirmDocumentWrapper({
    modalOpen,
    setModalOpen,
    confirmDocument = { confirmDocumentId: '', contentPk: '', contents: { title: '' } },
    setConfirmDocument
}) {
    const [documentContents, setDocumentContents] = useState({});
    const [documentElements, setDocumentElements] = useState([{ elementGroupName: '' , elements : [] }]);
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

    useEffect(() => {
        requestToServer();
    }, [confirmDocument])


    return (
        <ConfirmDocumentModalV2
            confirmDocument={confirmDocument}
            setConfirmDocument={setConfirmDocument}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}>
                {confirmDocument.approvalLineLifecycle === 'BEFORE_CREATE' && <Button cn="btnInsideConfirmDocument" name="결재선 지정"/>}
            <DocumentContentV2 documentElements={documentElements} contents={documentContents} />
        </ConfirmDocumentModalV2>
    );
}