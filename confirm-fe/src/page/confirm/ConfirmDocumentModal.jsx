import { Fragment, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { acceptConfirmDocument, getConfirmDocumentContent, rejectConfirmDocument } from '../../api/confirmApi';
import { convertDocumentType } from '../../converter/DocumentConverter';
import Button from '../../components/button/Button';
import ButtonGroup from '../../components/button/ButtonGroup';
import Table from '../../components/table/Table';

export function ConfirmDocumentModal({ modalOpen, setModalOpen, documentContentPk }) {
    const [confirmDocumentContent, setConfirmDocumentContent] = useState({});

    const callApi = async () => {
        const result = await getConfirmDocumentContent(documentContentPk);
        setConfirmDocumentContent(result.data);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function closeModal() {
        setConfirmDocumentContent({});
        setModalOpen(false);
    }

    useEffect(() => {
        if (modalOpen) {
            callApi();
        }
    }, [modalOpen]);

    const handleOnClickAccept = async (confirmDocumentId) => {
        const approvalForm = {
            companyId: sessionStorage.getItem('companyId'),
            departmentId: sessionStorage.getItem('departmentId'),
            approvalLineId: sessionStorage.getItem('memberId'),
        }

        const response = await acceptConfirmDocument(confirmDocumentId, approvalForm);
        console.log('response', response);
        if (response.status !== 200) {
            alert(response.data.message);
        }

        if (response.status === 200) {
            closeModal();
        }
    }

    const handleOnClickReject = async (confirmDocumentId) => {
        const rejectForm = {
            companyId: sessionStorage.getItem('companyId'),
            departmentId: sessionStorage.getItem('departmentId'),
            approvalLineId: sessionStorage.getItem('memberId'),
        }

        const response = await rejectConfirmDocument(confirmDocumentId, rejectForm);
        console.log('response', response);
        if (response.status !== 200) {
            alert(response.data.message);
        }

        if (response.status === 200) {
            closeModal();
        }
    }

    const contentTable = () => {
        return <Fragment id={confirmDocumentContent.confirmDocument.pk}>
            <div style={{ textAlign: 'right' }}>결재선 표현</div>
            <Table
                title='결재선'
                style={{ textAlign: 'right' }} />
            <h2>{confirmDocumentContent.contents.title}</h2>
            <p>문서 유형:{convertDocumentType(confirmDocumentContent.confirmDocument.documentType)}</p>
            <table className='confirm-document-table'>
                <thead>
                </thead>
                <tbody>
                    <h3>요청 내용</h3>
                    <tr>
                        <th>요청자</th>
                        <td>{confirmDocumentContent.contents.requester_name}</td>
                    </tr>
                    <tr>
                        <th>요청자 부서</th>
                        <td>{confirmDocumentContent.contents.department_name}</td>
                    </tr>
                    <tr>
                        <th>사유</th>
                        <td>{confirmDocumentContent.contents.reason}</td>
                    </tr>
                    <tr>
                        <th>휴가 기간</th>
                    </tr>
                    <tr>
                        {confirmDocumentContent.contents.vacation_durations.map((duration, index) => {
                            return (<div>
                                <td>{index + 1}</td>
                                <th>시작일</th>
                                <td>{duration.startDateTime}</td>
                                <th>종료일</th>
                                <td>{duration.endDateTime}</td>
                            </div>)
                        })}
                    </tr>
                    <h3>그 외</h3>
                    <div>
                        <tr>
                            <th>직무 대행자</th>
                            <td>{confirmDocumentContent.contents.delegator_id}</td>
                        </tr>
                    </div>
                </tbody>
            </table>
            <ButtonGroup cn='basic-button-group'>
                <Button
                    cn='basic-button'
                    name='상신'
                    onClick={() => handleOnClickAccept(confirmDocumentContent.confirmDocument.confirmDocumentId)} />
                <Button
                    cn='basic-button-reverse'
                    name='반려'
                    onClick={() => handleOnClickReject(confirmDocumentContent.confirmDocument.confirmDocumentId)} />

                <Button
                    cn='basic-button-reverse'
                    name='닫기'
                    onClick={closeModal}
                    style={{ marginLeft: '350px' }} />
            </ButtonGroup>
        </Fragment>
    }

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            {confirmDocumentContent.contentPk && contentTable()}
        </Modal>
    );
}