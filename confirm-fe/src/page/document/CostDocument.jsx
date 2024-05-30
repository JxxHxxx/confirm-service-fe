import { Fragment } from "react";
import Modal from "react-modal";
import { IoCloseCircleSharp } from "react-icons/io5";
import ButtonGroup from "../../components/button/ButtonGroup";
import Button from "../../components/button/Button";
import "../../css/Icon.css"
import ApprovalHistTable from "../confirm/ApprovalHistTable";

export default function ConfirmDocumentModalV2({ modalOpen, setModalOpen }) {
    function closeModal() {
        setModalOpen(false);
    }

    const customStyles = {
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
    };

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <Fragment>
                <IoCloseCircleSharp
                    className="IoCloseCircleSharp"
                    size={'1.5em'}
                    onClick={closeModal} />
                <div style={{ 'display': 'inline-block' }}>
                    <Button name="상신" />
                    <Button name="반려" />
                </div>
                <div style={{ 'border': '1px solid gray' }}></div>

                <div style={{ 'display': 'inline-block' }}>
                    <span style={{ 'position': 'relative', 'left': '300px' }}>결재 문서 제목</span>
                </div>
                <div style={{ 'margin': '20px' }}></div>
                <div style={{ 'display': 'inline-block' }}>
                    <span style={{ 'position': 'relative', 'left': '600px' }}>결재선</span>
                </div>
                <div style={{ 'margin': '20px' }}></div>
                <div style={{ 'border': '1px solid gray' }}></div>
                <div style={{ 'display': 'inline-block' }}>
                <span style={{ 'position': 'relative', 'left': '300px' }}>문서 본문</span>
                </div>

            </Fragment>
        </Modal>
    )
}