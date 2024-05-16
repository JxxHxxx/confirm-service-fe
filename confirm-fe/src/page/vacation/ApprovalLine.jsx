import { Fragment, useEffect, useState } from "react"
import { getApprovalLines, postApprovalLines } from "../../api/confirmApi";
import { raiseConfirmDoucment } from "../../api/vacationApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import List from "../../components/list/List";
import Tree from "../../components/list/Tree";
import { getOrganizationTree } from "../../api/organizationApi";
import { searchDeparmentMembers } from "../../api/memberApi";

const tag = '[ApprovalLine] COMPONENT'

export default function ApprovalLine({ vacationId }) {
    console.log(tag);
    const params = useParams();
    const navigate = useNavigate();

    if (vacationId === undefined) {
        vacationId = params.vacationId;
    }

    const [selectedMembers, setSelectedMemebers] = useState([]);
    const [organizationTree, setOrganizationTree] = useState([]);
    const [searchResultMembers, setSearchResultMembers] = useState([]);

    const [approvalLines, setApprovalLines] = useState({
        flag: {
            submitted: false
        }
    }) 

    const updateApprovalLinesFlag = (prev, fieldName, fieldValue) => {
        return {
            flag: {
                ...prev.flag,
                [fieldName]: fieldValue
            }
        };
    };

    const handleAddAprovalLineMember = (event) => {
        const memberId = event.currentTarget.getAttribute("value");
        const selectedMember = searchResultMembers.find(member => member.memberId === memberId);

        if (selectedMembers.some(member => member.memberId === selectedMember.memberId)) {
            alert(selectedMember.departmentName + "/" + selectedMember.name + '(은)는 이미 결재선에 지정되어 있습니다.');
        }
        else {
            const approvalOrder = selectedMembers.length + 1;
            setSelectedMemebers(prev => [...prev, { ...selectedMember, approvalOrder: approvalOrder }]);
        }
    }

    const handleExceptAprovalLineMember = (event) => {
        const memberId = event.currentTarget.getAttribute("value");
        const updatedMembers = selectedMembers.filter(member => member.memberId !== memberId);
        setSelectedMemebers(updatedMembers)
    }

    const handleOnClickCompleteApprovaLine = async () => {
        const confirmDocumentId = "VAC" + sessionStorage.getItem('companyId') + vacationId;
        const approvalLineForm = selectedMembers.map(member => ({
            approvalOrder: member.approvalOrder,
            approvalId: member.memberId,
            approvalName: member.name,
            approvalDepartmentId: member.departmentId,
            approvalDepartmentName: member.departmentName
        }));

        const result = await postApprovalLines(confirmDocumentId, approvalLineForm);
        if (result.status === 200) {
            setApprovalLines((prev) => updateApprovalLinesFlag(prev, 'submitted', true))
        }
        else {
            alert('잠시 후 다시 시도해주세요.')
        }

    }

    const handleOnClickRaiseConfirmDocument = async () => {
        const result = await raiseConfirmDoucment(vacationId);
        if (result.status === 200) {
            setApprovalLines((prev) => updateApprovalLinesFlag(prev, 'submitted', true))
            alert('상신 완료')
            navigate('/vacation')
        }
        else {
            alert('잠시 후 다시 시도해주세요.')
        }

    }

    const [savedApprovalLines, setSavedApprovalLines] = useState([]);
    // 랜더링 시 사용
    const handleMount = async () => {
        const confirmDocumentId = "VAC" + sessionStorage.getItem('companyId') + vacationId;
        // TODO 결재선이 이미 등록됐지는 확인 없다면 -> 있다면 상신 버튼 -> 상신 되었다면 -> 완료 페이지로
        const result = await getApprovalLines(confirmDocumentId);
        console.log(result.data.data);
        setSavedApprovalLines(result.data.data);
        if (result.data.data.length > 0) {
            setApprovalLines((prev) => updateApprovalLinesFlag(prev, 'submitted', true));
        }
    }

    const handleAmountOrgTree = async () => {
        const result = await getOrganizationTree();
        setOrganizationTree(result.data.data);
    }

    const handleOnClickOrgItem = async (event) => {
        const departmentId = event.currentTarget.getAttribute('value');
        const result = await searchDeparmentMembers(departmentId);
        setSearchResultMembers(result);
    }

    useEffect(() => {
        handleMount();
        handleAmountOrgTree();
    }, [])

    return (
        <Fragment>
            <h1>결재선 지정</h1>
            {approvalLines.flag.submitted && (
                <Fragment>
                    <List title={"결재선 라인"}
                        cn={{ ul: "member-list", li: "item" }}
                        showCondition={true}
                        listProperty={{
                            items: savedApprovalLines,
                            itemKey: 'approvalLinePk',
                            itemValue: 'approvalLinePk',
                            itemContent: (item) => (
                                <Fragment>
                                    {item.approvalId}/ 결재 순서 : {item.approvalOrder}
                                </Fragment>
                            )
                        }}>
                    </List>
                    <button
                        type="button"
                        onClick={handleOnClickRaiseConfirmDocument}>
                        상신
                    </button>
                </Fragment>)}

            <div className="list-container" style={{ display: 'grid', gridTemplateColumns: '4fr 0.1fr 4fr 0.1fr 4fr' }}>
                {!approvalLines.flag.submitted && (
                    <Fragment>
                        <div>
                            <Tree title='조직도'
                                fullTree={organizationTree}
                                onClickItem={handleOnClickOrgItem} />
                        </div>
                        <div style={{ borderLeft: '1px solid black' }}></div>
                        <div style={{ width: '500px', height: '500px', overflow: 'auto' }}>
                            <List title={"사용자 검색"}
                                cn={{ ul: "member-list", li: "item" }}
                                showCondition={(searchResultMembers.length > 0 && !approvalLines.flag.submitted)}
                                listProperty={{
                                    items: searchResultMembers,
                                    itemKey: 'memberPk',
                                    itemValue: 'memberId',
                                    onClick: handleAddAprovalLineMember,
                                    itemContent: (item) => (
                                        <Fragment>
                                            {item.departmentName}/{item.name}/{item.enteredDate}
                                        </Fragment>
                                    )
                                }}
                            />
                        </div>
                    </Fragment>


                )}
                <div style={{ borderLeft: '1px solid black' }}></div>
                {!approvalLines.flag.submitted && (
                    <List cn={{ ul: "member-list", li: "item", noneli: "item-none" }}
                        title={"결재 라인"}
                        showCondition={(selectedMembers.length > 0 && !approvalLines.flag.submitted)}
                        listProperty={{
                            items: selectedMembers,
                            itemKey: 'memberPk',
                            itemValue: 'memberId',
                            onClick: handleExceptAprovalLineMember,
                            itemContent: (item) => (<>{item.departmentName}/{item.name}/{item.enteredDate}</>),
                            emptyListInfo: '결재 라인을 추가해주세요'
                        }}>
                        <button
                            type="button"
                            onClick={handleOnClickCompleteApprovaLine}>
                            결재선 지정 완료
                        </button>
                    </List>
                )}
                <List cn={{ ul: "member-list", li: "item" }}
                    showCondition={approvalLines.flag.submitted}
                    listProperty={{
                        items: [], // 빈 배열을 전달하여 렌더링 없이 List 컴포넌트만 표시
                        itemContent: () => <Fragment />
                    }}
                />
            </div>
        </Fragment >
    )
}