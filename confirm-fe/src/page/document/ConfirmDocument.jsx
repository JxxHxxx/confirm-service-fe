
import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css"
import "../../css/Input.css"
import { getConfirmDocumentContent, getConfirmDocumentElements } from "../../api/confirmApi";
import DocumentContent from "../document/DocumentContent";
import ConfirmDocumentModal from "../document/ConfirmDocumentModal";

export default function ConfirmDocument({
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
        <ConfirmDocumentModal
            confirmDocument={confirmDocument}
            setConfirmDocument={setConfirmDocument}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}>
            {documentElements.map(documentElement => <DocumentContent
                modalOpen={modalOpen}
                documentElement={documentElement}
                setDocumentElements={setDocumentElements}
                documentValue={documentContents}
                setDocumentContents={setDocumentContents} />)}
        </ConfirmDocumentModal>
    );
}