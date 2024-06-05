
import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css"
import "../../css/Input.css"
import { getConfirmDocumentContent, getConfirmDocumentElements } from "../../api/confirmApi";
import DocumentContent from "../document/DocumentContent";
import ConfirmDocumentModal from "../document/ConfirmDocumentModal";

export default function ConfirmDocument({ modalOpen, setModalOpen, confirmDocumentContentPk, confirmDocument = { confirmDocumentId: '' } }) {

    const [documentContent, setDocumentContent] = useState({});
    const [documentElements, setDocumentElements] = useState([]);
    const requestToServer = async () => {
        const response = await getConfirmDocumentContent(confirmDocumentContentPk);
        const elements = await getConfirmDocumentElements('vac');
        setDocumentContent(response.data.contents);

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

    useEffect(() => {
        requestToServer();
    }, [confirmDocumentContentPk, confirmDocument])


    return (
        <ConfirmDocumentModal
            confirmDocument={confirmDocument}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}>
            {documentElements.map(documentElement => <DocumentContent
                documentElement={documentElement}
                documentValue={documentContent} />)}
        </ConfirmDocumentModal>
    );
}