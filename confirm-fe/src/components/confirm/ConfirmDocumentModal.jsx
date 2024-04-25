import Modal from 'react-modal';

export function ConfirmDocumentModal({ confirmDocumentPk, modalOpen, setModalOpen }) {
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

    let subtitle;

    function closeModal() {
        setModalOpen(false);
    }

    return (
        <div>
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>결재 문서 ID : {confirmDocumentPk}</h2>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
        </div>
    );
}