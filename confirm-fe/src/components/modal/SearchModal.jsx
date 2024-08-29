import Modal from "react-modal";
import { IoCloseSharp } from "react-icons/io5";
import Searchbar from "../input/Searchbar";

export default function SearchModal({
    modalOpen,
    setModalOpen,
    inputPlaceholder,
    handleSearchKeywordChange,
    handleSearchKeywordSubmit,
    children }) {

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <Modal
            isOpen={modalOpen}
            // onRequestClose={closeModal} 모달 바깥 영역 클릭시.. 닫힘
            style={{
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    height: "450px",
                    width: "400px",
                },
            }}>
            <IoCloseSharp
                size={'1.2em'}
                className="ModalIoCloseSharp"
                onClick={closeModal} />
            <div id="orgSearchSbDiv" style={{ marginTop: '10px' }}>
                <Searchbar className={{ input: 'orgSearchSb', ioIosSearch: 'sb-icon-v2' }}
                    inputProp={{ placeholder: inputPlaceholder }}
                    onChange={handleSearchKeywordChange}
                    onSubmit={handleSearchKeywordSubmit} />
            </div>
            <div id="orgSearchResultDiv" style={{ marginTop: '20px', marginLeft: '13px' }}>
                {children}
            </div>
        </Modal>

    )
}