import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import Button from "../button/Button";

export default function CheckModal({
    modalOpen,
    setModalOpen,
    children,
    negativeBtnName = 'no',
    positiveBtnName = 'yes',
    onClickNegativeBtn,
    onClickPositiveBtn
}) {

    const closeModal = () => {
        setModalOpen(false)
    }

    return <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal} // 모달 바깥 영역 클릭시.. 닫힘
        style={{
            content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                height: "120px",
                width: "200px",
            },
        }}>
        <IoCloseSharp
            size={'1.2em'}
            className="ModalIoCloseSharp"
            onClick={closeModal} />
        {children}

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Button id="negativeBtn"
                cn="btn_normal"
                style={{ marginRight: '20px' }}
                name={negativeBtnName} 
                onClick={onClickNegativeBtn}/>
            <Button id="positiveBtn"
                cn="btn_normal"
                name={positiveBtnName}
                onClick={onClickPositiveBtn} />
        </div>
    </Modal>
}