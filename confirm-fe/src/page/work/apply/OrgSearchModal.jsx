import { useEffect, useRef, useState } from "react";
import SearchModal from "../../../components/modal/SearchModal";
import Button from "../../../components/button/Button";
import { searchOrganization } from "../../../api/organizationApi";
import CheckModal from "../../../components/modal/CheckModal";


export default function OrgSearchModal({ setWorkTicket }) {
    const [orgSearchModalOpen, setOrgSerachModalOpen] = useState(false);
    const [checkModalOpen, setCheckModalOpen] = useState(false);
    // state
    const [orgSearchResult, setOrgSearchResult] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState({
        organizationPk: undefined
    });
    // ref
    const orgKeywordRef = useRef('');

    const requestSearchOrganization = async () => {
        try {
            const params = {
                companyId: sessionStorage.getItem('companyId'),
                departmentName: orgKeywordRef.current
            }
            const { status, data } = await searchOrganization(params);
            if (status === 200) {
                setOrgSearchResult(data.data);
            }
        }
        catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
    }, [orgSearchResult])

    const handleOnClickSearchModal = () => {
        setOrgSerachModalOpen(true);
        // 부서 검색 결과가 없을 때만 모달 창 열었을 때 검색 API를 호출 하도록 한다.
        if (orgSearchResult.length === 0) {
            requestSearchOrganization();
        }
    }
    // 업무 요청할 부서 Click 시 발생 이벤트
    const handleChoiceOrganization = (org) => {
        setCheckModalOpen(true);
        setSelectedOrg(org);
    }

    // 업무 요청할 부서 Click 시 발생하는 checkModal Negative Button Click 시 발생 이벤트
    const handleOnClickCheckModalNegativeBtn = () => {
        setCheckModalOpen(false);
        setSelectedOrg({
            organizationPk: undefined
        });
    }

    // 업무 요청할 부서 Click 시 발생하는 checkModal Positive Button Click 시 발생 이벤트
    const handleOnClickCheckModalPositiveBtn = () => {
        setCheckModalOpen(false);
        setOrgSerachModalOpen(false);
        setWorkTicket((prev) => ({
            ...prev,
            chargeDepartmentId: selectedOrg.departmentId,
            chargeDepartmentName: selectedOrg.departmentName
        }))
    }



    const handleOrgKeywordSubmit = (event) => {
        event.preventDefault();
        requestSearchOrganization();
    }

    const handleOrgKeywordChange = (event) => {
        orgKeywordRef.current = event.target.value;
    }

    return <>
        <Button style={{ fontSize: '15px' }} cn="btn_normal" name="부서 검색"
            onClick={handleOnClickSearchModal} />
        <SearchModal
            modalOpen={orgSearchModalOpen}
            setModalOpen={setOrgSerachModalOpen}
            handleSearchKeywordChange={handleOrgKeywordChange}
            handleSearchKeywordSubmit={handleOrgKeywordSubmit}
            inputPlaceholder='부서명을 입력해주세요'>
            {orgSearchResult.length > 0 ?
                <ul style={{ padding: '0px', fontFamily: 'MaruBuri' }}>
                    {orgSearchResult.map(org => <li key={org.organizationPk}
                        className={selectedOrg.organizationPk === org.organizationPk ? 'selected-li' : ''}
                        style={{
                            width: '360px',
                            border: '1px solid black',
                            marginBottom: '5px',
                            padding: '5px'
                        }}
                        onClick={() => handleChoiceOrganization(org)}>
                        <p style={{ margin: '0px', fontSize: '15px' }}>{org.departmentName}</p>
                        <p style={{ margin: '0px', fontSize: '11px', color: 'grey', 'paddingBottom': '5px' }}>
                            {org.parentDepartmentName ?
                                '상위 부서:' + org.parentDepartmentName :
                                '최상위 부서'}
                        </p>
                        <p style={{ margin: '0px', fontSize: '11px' }}>
                            대표전화 : 010-0000-0000
                        </p>
                    </li>)}
                </ul>
                : <p style={{
                    fontSize: '13px',
                    color: 'grey',
                    fontFamily: 'MaruBuri'
                }}>{orgKeywordRef.current}(으)로 검색한 결과가 존재하지 않아요</p>
            }
        </SearchModal>
        <CheckModal modalOpen={checkModalOpen}
            setModalOpen={setCheckModalOpen}
            negativeBtnName="취소"
            positiveBtnName="요청"
            onClickNegativeBtn={handleOnClickCheckModalNegativeBtn}
            onClickPositiveBtn={handleOnClickCheckModalPositiveBtn}>
            {selectedOrg &&
                <p style={{ fontSize: '12px', fontFamily: 'MaruBuri', textAlign: 'center' }}>
                    요청부서 : {selectedOrg.departmentName}</p>}
        </CheckModal>
    </>
}