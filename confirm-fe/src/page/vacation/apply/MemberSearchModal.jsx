
import Modal from "react-modal";
import Searchbar from "../../../components/input/Searchbar";


export default function MemberSearchModal({modalOpen, setModalOpen}) {

    const closeModal = () => {
        setModalOpen(false)
    }

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
            <>
            <p style={{fontSize : '20px'}}>사용자 검색</p>
            <Searchbar></Searchbar>
            </>
        </Modal>
    )
}