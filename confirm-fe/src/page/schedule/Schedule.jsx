import { Header } from "../../components/layout/Header";
import Page from "../../components/layout/Page";
import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css"
import "../../css/Input.css"
import { getConfirmDocumentContent, getConfirmDocumentElements } from "../../api/confirmApi";
import DocumentContent from "../document/DocumentContent";
import Button from "../../components/button/Button";
import ConfirmDocument from "../document/ConfirmDocument";


export default function Schedule() {
  const [modalOpen, setModalOpen] = useState(false);
  const [documentContent, setDocumentContent] = useState({});
  const [documentElements, setDocumentElements] = useState([]);
  const call = async () => {
    const response = await getConfirmDocumentContent(23);
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

  const handleModalOpen = () => {
    setModalOpen(true);
  }

  useEffect(() => {
    call();
  }, [])


  return (
    <Page header={<Header />} sidebar={<div>사이드바</div>}>
      <h2>test</h2>
      <Button name="모달 창 열기 버튼" onClick={handleModalOpen} />
      <ConfirmDocument
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}>
        {documentElements.map(documentElement => <DocumentContent documentElement={documentElement} documentValue={documentContent}/>)}
      </ConfirmDocument>
    </Page>
  );
}

