import { useState } from "react";
import { getConfirmDocumentContent, getConfirmDocumentElements } from "../../api/confirmApi";
import ConfirmDocumentModalV2 from "./ConfirmDocumentModalV2";


export default function ConfirmDocumentWrapper({
    modalOpen,
    setModalOpen,
    confirmDocument = { confirmDocumentId: '', contentPk: '', contents: { title: '' } },
    setConfirmDocument
}) {

    const [documentContents, setDocumentContents] = useState({});
    const [documentElements, setDocumentElements] = useState([]);
    const requestToServer = async () => {
        if (confirmDocument.contentPk) {
            const response = await getConfirmDocumentContent(confirmDocument.contentPk);
            const elements = await getConfirmDocumentElements(confirmDocument.documentType);
            setDocumentContents(response.data.contents);

            const groupedElements = {};
            elements.data.data.forEach(element => {
                if (!groupedElements[element.elementGroup]) {
                    groupedElements[element.elementGroup] = [];
                }
                groupedElements[element.elementGroup].push(element);
            });

            const result = Object.keys(groupedElements).map(group => ({
                elementGroup: group,
                elements: groupedElements[group]
            }));

            setDocumentElements(result);
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
        </ConfirmDocumentModalV2>
    );
}