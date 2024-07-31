
import Modal from "react-modal";
import Searchbar from "../../../components/input/Searchbar";
import { searchCompanyMembers } from "../../../api/memberApi";
import { useRef, useState } from "react";


export default function MemberSearchModal({ modalOpen, setModalOpen, onHandleSelectMember }) {

    const closeModal = () => {
        setModalOpen(false)
    }

    const [searchResult, setSearchResult] = useState({
        members: [],
        selectedMember: {},
        message: ''
    });

    const searchKeywordRef = useRef();

    const handleOnSubmitSearchMember = async (event) => {
        event.preventDefault();
        const params = {
            departmentId: sessionStorage.getItem('departmentId'),
            memberName: searchKeywordRef.current
        }
        const { status, data } = await searchCompanyMembers(params);

        if (status !== 200) {
            // 결과를 초기화 해야함
            setSearchResult(() => ({
                message: '잘못된 접급입니다.'
            })
            )
        }
        else if (status === 200 && data) {
            setSearchResult(() => ({
                members: data
            }))
        }
        else if (status === 200 && !data) {
            setSearchResult(() => ({
                message: '조건에 맞는 결과가 존재하지 않습니다.'
            }))
        }
    }

    const handleSelectMember = (event) => {
        const memberId = event.currentTarget.getAttribute("memberId");
        const memberName = event.currentTarget.getAttribute("memberName");
        const departmentName = event.currentTarget.getAttribute("departmentName");
        onHandleSelectMember(memberId, memberName, departmentName);
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
                <p style={{ fontSize: '20px', textAlign: 'center' }}>사용자 검색</p>
                <Searchbar
                    onChange={(event) => searchKeywordRef.current = event.target.value}
                    onSubmit={handleOnSubmitSearchMember}
                ></Searchbar>
                {searchResult.members
                    ? <>
                        <ul style={{ padding: '0px 0px 0px 10px' }}>
                            {searchResult.members.map(member =>
                                <div style={{ marginBottom: '5px' }} key={member.memberPk}>
                                    <li style={{ listStyleType: 'none', border: '1px solid gray', display: 'inline-block', padding: '5px' }}
                                    memberId={member.memberId}
                                    memberName={member.name}
                                    departmentName={member.departmentName}
                                    onClick={handleSelectMember}>
                                    {member.name}/{member.departmentName}
                                </li>
                                </div>
                            )}
                    </ul>
            </>
            : <p>{searchResult.message}</p>
                }
        </>
        </Modal >
    )
}