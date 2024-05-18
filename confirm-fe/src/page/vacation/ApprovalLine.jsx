import { Fragment, useEffect, useState } from "react"
import { getApprovalLines, postApprovalLines } from "../../api/confirmApi";
import { raiseConfirmDoucment } from "../../api/vacationApi";
import { useNavigate, useParams } from "react-router-dom";
import List from "../../components/list/List";
import Tree from "../../components/list/Tree";
import { getOrganizationTree } from "../../api/organizationApi";
import { getDeparmentMembers, searchCompanyMembers } from "../../api/memberApi";
import MemberSearchV2 from "../confirm/MemberSearchV2";
import Button from "../../components/button/Button";

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

    const [keyword, setKeyword] = useState({
        option: 'memberName',
        value: ''
    });

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

    const amountApprovalLines = async () => {
        const confirmDocumentId = "VAC" + sessionStorage.getItem('companyId') + vacationId;
        // 결재선이 이미 등록된 경우 START
        const result = await getApprovalLines(confirmDocumentId);
        setSavedApprovalLines(result.data.data);
        if (result.data.data.length > 0) {
            setApprovalLines((prev) => updateApprovalLinesFlag(prev, 'submitted', true));
            return
        }
        // 결재선이 이미 등록된 경우 END

        const orgResult = await getOrganizationTree();
        setOrganizationTree(orgResult.data.data);

        const departmentMembersReuslt = await getDeparmentMembers(sessionStorage.getItem('departmentId'));
        setSearchResultMembers(departmentMembersReuslt);
    }

    const handleOnClickOrgItem = async (event) => {
        const departmentId = event.currentTarget.getAttribute('value');
        const params = {
            departmentId: departmentId
        }

        const response = await searchCompanyMembers(params);
        setSearchResultMembers(response.data);
    }

    const handleOnChangeInputValue = (event) => {
        setKeyword({ ...keyword, value: event.target.value });
    }

    const handleOnSubmmit = async (event) => {
        event.preventDefault();
        const searchConditionForm = {
            [keyword.option]: keyword.value
        }
        const response = await searchCompanyMembers(searchConditionForm);
        setSearchResultMembers(response.data);
    }


    useEffect(() => {
        amountApprovalLines();
    }, [approvalLines.flag.submitted])

    return (
        <Fragment>
            <h1>결재선 지정</h1>
            {approvalLines.flag.submitted && (
                <Fragment>
                    <List title={"지정된 결재선 라인"}
                        cn={{ ul: "member-list", li: "item" }}
                        showCondition={true}
                        listProperty={{
                            items: savedApprovalLines,
                            itemKey: 'approvalLinePk',
                            itemValue: 'approvalLinePk',
                            itemContent: (item) => (
                                <Fragment>
                                    {item.approvalName}/결재 순서 : {item.approvalOrder}
                                </Fragment>
                            )
                        }}>
                    </List>
                    <Button
                        name="상신"
                        onClick={handleOnClickRaiseConfirmDocument}
                        style={{ width: '100px' }} />
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
                            <h4>사용자 검색</h4>
                            <MemberSearchV2
                                keyword={keyword}
                                setKeyword={setKeyword}
                                onChange={handleOnChangeInputValue}
                                onSubmit={handleOnSubmmit} />
                            <List
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
                {!approvalLines.flag.submitted && (
                    <Fragment>
                        <div style={{ borderLeft: '1px solid black' }}></div>
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
                            <Button name="결재선 지정 완료" onClick={handleOnClickCompleteApprovaLine} />
                        </List>

                    </Fragment>
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