import { Header } from "../../components/layout/Header";
import Page from "../../components/layout/Page";
import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css"
import "../../css/Input.css"
import { getConfirmDocumentForm } from "../../api/confirmApi";
import ConfirmDocumentModalV2 from "../document/CostDocument";
import Button from "../../components/button/Button";

export default function Schedule() {
  const [modalOpen, setModalOpen] = useState(false);

  const call = async () => {
    const response = await getConfirmDocumentForm();
    console.log('response', response);
  }
  
  const handleModalOpen = () => {
    setModalOpen(true);
  }

  useEffect(() => {
    call();
  })


  return (
    <Page header={<Header />} sidebar={<div>사이드바</div>}>
      <h2>test</h2>
      <Button name="모달 창 열기 버튼" onClick={handleModalOpen} />
      <ConfirmDocumentModalV2
        modalOpen={modalOpen}
        setModalOpen={setModalOpen} />
    </Page>
  );
}
