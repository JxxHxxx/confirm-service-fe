
import Modal from "react-modal";
import Searchbar from "../../../components/input/Searchbar";
import { searchCompanyMembers } from "../../../api/memberApi";
import { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";


export default function MemberSearchModal({ modalOpen, setModalOpen, onHandleSelectMember }) {

    const closeModal = () => {
        setModalOpen(false)
    }

    const [searchResult, setSearchResult] = useState({
        members: [],
        selected: '',
        message: ''
    });

    const searchKeywordRef = useRef();

    const handleOnSubmitSearchMember = (event) => {
        event.preventDefault();
        requestSearchCompanyMembers();
    }
    // 사용자 검색 API 서버
    const requestSearchCompanyMembers = async () => {
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
        else if (status === 200 && data.length > 0) {
            setSearchResult(() => ({
                members: data
            }))
        }
        else if (status === 200 && data.length === 0) {
            setSearchResult(() => ({
                message: '조건에 맞는 결과가 존재하지 않습니다.'
            }))
        }
    }

    const handleSelectMember = (event) => {
        const memberId = event.currentTarget.getAttribute("memberId");
        const memberName = event.currentTarget.getAttribute("memberName");
        const departmentName = event.currentTarget.getAttribute("departmentName");
        setSearchResult((prev) => ({
            ...prev,
            selected: memberId
        }))
        onHandleSelectMember(memberId, memberName, departmentName);
        alert(memberName + "/" + departmentName + "을 업무대행자로 설정합니다.")
    }

    useEffect(() => {
        requestSearchCompanyMembers();
    }, [])

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
                    height: "450px",
                    width: "400px",
                },
            }}
            contentLabel="Example Modal"
        >
            <>
                <IoCloseOutline
                    className="IoCloseCircleSharp"
                    size={'1.8em'}
                    onClick={closeModal} />
                <p style={{ fontSize: '20px', textAlign: 'center' }}>사용자 검색</p>
                <Searchbar
                    className={{ input: 'basic-sb', ioIosSearch: 'sb-icon-v2' }}
                    inputProp={{ placeholder: '사용자 이름을 입력해주세요' }}
                    onChange={(event) => searchKeywordRef.current = event.target.value}
                    onSubmit={handleOnSubmitSearchMember}
                ></Searchbar>
                <div style={{ margin: '30px' }}></div>
                {searchResult.members
                    ? <>
                        <ul style={{ padding: '0px 0px 0px 10px' }}>
                            {searchResult.members.map(member =>
                                <div style={{ marginBottom: '5px', border: '1px solid gray' }} key={member.memberId}>
                                    <li style={{
                                        display: 'block',
                                        padding: '5px'
                                    }} className={searchResult.selected === member.memberId ? "gHov gInlineBlock selected-li" : "gHov gInlineBlock"}
                                        memberId={member.memberId}
                                        memberName={member.name}
                                        departmentName={member.departmentName}
                                        onClick={handleSelectMember}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <img src="#" alt="프로필"></img>
                                            <div style={{ textAlign: 'left',paddingLeft: '50px', borderLeft: '1px solid gray' }}>
                                                <p style={{ margin: '0px', fontSize: '12px', color: "gray" }}>이름 : {member.name}</p>
                                                <p style={{ margin: '0px', fontSize: '12px', color: "gray" }}>부서 : {member.departmentName}</p>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            )}
                        </ul>
                    </>
                    : <div style={{ padding: '0px 0px 0px 10px' }}>
                        <p style={{ color: 'red' }}>{searchResult.message}</p>
                    </div>
                }
            </>
        </Modal >
    )
}