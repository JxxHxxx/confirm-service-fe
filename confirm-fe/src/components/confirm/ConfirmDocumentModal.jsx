import { Fragment, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getConfirmDocumentContent } from '../../api/confirmApi';
import { convertDocumentType } from '../../converter/DocumentConverter';

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
        setModalOpen(false);
    }

    useEffect(() => {
        if (modalOpen) {
            callApi();
        }
    }, [modalOpen]);

    const handleOnClickAccept = () => {
        console.log('상신')
    }

    const handleOnClickReject = () => {
        console.log('반려')
    }

    const contentTable = () => {
        return <div id={confirmDocumentContent.confirmDocument.pk}>
            <button onClick={handleOnClickAccept}>
                상신
            </button>
            <button style={{ marginLeft: '5px' }}
                onClick={handleOnClickReject}>
                반려
            </button>
            <button style={{ marginLeft: '300px' }}
                onClick={closeModal}>
                닫기
            </button>
            <div style={{ textAlign: 'right' }}>결재선 표현</div>
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
        </div>
    }

    return (
        <div>
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {confirmDocumentContent.contentPk && contentTable()}
            </Modal>
        </div>
    );
}