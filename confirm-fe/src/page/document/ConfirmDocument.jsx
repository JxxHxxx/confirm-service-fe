import { Fragment } from "react";
import Modal from "react-modal";
import { IoCloseCircleSharp } from "react-icons/io5";
import Button from "../../components/button/Button";
import "../../css/Icon.css"
import ApprovalLineList from "./ApprovalLineList";
import Title from "./Title";

export default function ConfirmDocument({ modalOpen, setModalOpen, children }) {
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
                {/* 취소 버튼 */}
                <IoCloseCircleSharp
                    className="IoCloseCircleSharp"
                    size={'1.5em'}
                    onClick={closeModal} />
                <div style={{ 'display': 'inline-block' }}>
                    <Button name="상신" />
                    <Button name="반려" />
                </div>
                <Title name="휴가신청서" />
                {/* 결재 라인 */}
                <ApprovalLineList />
                <div style={{'padding': '15px'}}></div>
                {children}
            </Fragment>
        </Modal>
    )
}