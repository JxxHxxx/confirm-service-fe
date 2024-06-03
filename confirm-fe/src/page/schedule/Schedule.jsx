import { Header } from "../../components/layout/Header";
import Page from "../../components/layout/Page";
import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css"
import "../../css/Input.css"
import { getConfirmDocumentForm } from "../../api/confirmApi";
import DocumentContent from "../document/DocumentContent";
import DocumentContentContainer from "../document/DocumentContentContainer";
import Button from "../../components/button/Button";
import ConfirmDocument from "../document/ConfirmDocument";


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

  const contentData = [
    {
      'subTitle': '요청 정보',
      'colSpan': 1,
      'body': [
        { 'key': '요청자', 'value': '이재헌' },
        { 'key': '요청부서', 'value': '플랫폼사업팀' },
      ]
    },
    {
      'subTitle': '휴가 기간',
      'colSpan': 2,
      'body': [
        { 'key': '시작일', 'value': '2024-06-05' },
        { 'key': '종료일', 'value': '2024-06-05' },
        { 'key': '시작일', 'value': '2024-06-07' },
        { 'key': '종료일', 'value': '2024-06-07' }
      ]
    }
  ]

  return (
    <Page header={<Header />} sidebar={<div>사이드바</div>}>
      <h2>test</h2>
      <Button name="모달 창 열기 버튼" onClick={handleModalOpen} />
      <ConfirmDocument
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}>
        <DocumentContentContainer>
          <DocumentContent content={contentData[0]} />
          <DocumentContent content={contentData[1]} />
        </DocumentContentContainer>
      </ConfirmDocument>
    </Page>
  );
}

