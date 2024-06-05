import { Fragment } from "react";
import Modal from "react-modal";
import { IoCloseCircleSharp } from "react-icons/io5";
import Button from "../../components/button/Button";
import "../../css/Icon.css";
import "../../css/Button.css";
import ApprovalLineList from "./ApprovalLineList";
import Title from "./Title";
import { acceptConfirmDocument, rejectConfirmDocument } from "../../api/confirmApi";

export default function ConfirmDocumentModal({ modalOpen, setModalOpen, children, confirmDocument }) {
    function closeModal() {
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
                    <Button name="상신"
                        onClick={() => handleAccept(confirmDocument.confirmDocumentId)} />
                    <Button cn="basic-button-reverse" name="반려"
                        onClick={() => handleReject(confirmDocument.confirmDocumentId)} />
                </div>
                <Title name="휴가신청서" />
                {/* 결재 라인 */}
                <ApprovalLineList confirmDocument={confirmDocument} />
                <div style={{ 'padding': '15px' }}></div>
                {children}
            </Fragment>
        </Modal>
    )
}