import { Header } from "../../components/layout/Header";
import Page from "../../components/layout/Page";
import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css"
import "../../css/Input.css"
import { getConfirmDocumentContent, getConfirmDocumentForm } from "../../api/confirmApi";
import DocumentContent from "../document/DocumentContent";
import Button from "../../components/button/Button";
import ConfirmDocument from "../document/ConfirmDocument";


export default function Schedule() {
  const [modalOpen, setModalOpen] = useState(false);

  const call = async () => {
    const response = await getConfirmDocumentContent(2);
    console.log('response', response.data);
  }

  const handleModalOpen = () => {
    setModalOpen(true);
  }

  useEffect(() => {
    call();
  })

  const contents = [
    {
      'subTitle': '요청 정보',
      'body': [
        { 'key': '요청자', 'value': '이재헌' },
        { 'key': '요청부서', 'value': '플랫폼사업팀' },
      ]
    },
    {
      'subTitle': '휴가 기간',
      'body': [
        { 'startDateKey': '시작일', 'startDateValue': '2024-06-05', 'endDateKey': '종료일', 'endDateValue': '2024-06-05' },
        { 'startDateKey': '시작일', 'startDateValue': '2024-06-07', 'endDateKey': '종료일', 'endDateValue': '2024-06-07' },

      ]
    },
    {
      'subTitle': '그 외',
      'body': [
        { 'delegatorNameKey': '직무대행자', 'delegatorNameValue':'유니'}
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
        {contents.map(content => <DocumentContent content={content} />)}
      </ConfirmDocument>
    </Page>
  );
}

