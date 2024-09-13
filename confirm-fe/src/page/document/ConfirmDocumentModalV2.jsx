import { Fragment } from "react";
import Modal from "react-modal";
import { IoCloseCircleSharp } from "react-icons/io5";
import Button from "../../components/button/Button";
import "../../css/Icon.css";
import "../../css/Button.css";
import ApprovalLineList from "./ApprovalLineList";
import Title from "./Title";
import { acceptConfirmDocument, rejectConfirmDocument } from "../../api/confirmApi";

export default function ConfirmDocumentModalV2({ modalOpen, setModalOpen, children, confirmDocument, setConfirmDocument }) {
    function closeModal() {
        setConfirmDocument({ confirmDocumentId: '', contentPk: '' , contents: { title: '' }})
        setModalOpen(false);
    }

    const handleAccept = async (confirmDocumentId) => {
        const approvalForm = {
            companyId: sessionStorage.getItem("companyId"),
            departmentId: sessionStorage.getItem("departmentId"),
            approvalLineId: sessionStorage.getItem("memberId"),
        };

        const response = await acceptConfirmDocument(
            confirmDocumentId, approvalForm
        );
        if (response.status !== 200) {
            alert(response.data.message);
        }

        if (response.status === 200) {
            closeModal();
        }
    };

    const handleReject = async (confirmDocumentId) => {
        const rejectForm = {
            companyId: sessionStorage.getItem("companyId"),
            departmentId: sessionStorage.getItem("departmentId"),
            approvalLineId: sessionStorage.getItem("memberId"),
        };

        const response = await rejectConfirmDocument(confirmDocumentId, rejectForm);
        if (response.status !== 200) {
            alert(response.data.message);
        }

        if (response.status === 200) {
            closeModal();
        }
    };

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={{
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    height: "650px",
                    width: "700px",
                },
            }}
            contentLabel="Example Modal"
        >
            <Fragment>
                {/* 취소 버튼 */}
                <IoCloseCircleSharp
                    className="IoCloseCircleSharp"
                    size={'1.5em'}
                    onClick={closeModal} />
                <div style={{ 'display': 'inline-block' }}>
                    <Button cn="btnInsideConfirmDocument" name="승인" style={{'marginRight' : '5px'}}
                        onClick={() => handleAccept(confirmDocument.confirmDocumentId)} />
                    <Button cn="btnInsideConfirmDocument" name="반려"
                        onClick={() => handleReject(confirmDocument.confirmDocumentId)} />
                </div>
                <Title name={confirmDocument.contents ? confirmDocument.contents.title : ''} />
                {/* 결재 라인 */}
                <div style={{marginBottom : '20px'}}></div>
                <ApprovalLineList confirmDocument={confirmDocument} />
                <div style={{ 'padding': '15px' }}></div>
                {children}
            </Fragment>
        </Modal>
    )
}