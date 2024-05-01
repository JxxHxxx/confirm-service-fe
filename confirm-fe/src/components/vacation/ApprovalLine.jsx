import { Fragment, useEffect, useState } from "react"
import { getApprovalLines, getConfirmDocument, postApprovalLines } from "../../api/confirmApi";
import { raiseConfirmDoucment } from "../../api/vacationApi";
import { useLocation, useNavigate } from "react-router-dom";

const tag = '[ApprovalLine] COMPONENT'

export default function ApprovalLine({ departmentMembers, vacationId }) {
    console.log(tag);
    const location = useLocation();
    const navigate = useNavigate();

    if (departmentMembers === undefined) {
        departmentMembers = location.state.departmentMembers;
    }

    if (vacationId === undefined) {
        vacationId = location.state.vacationId;
    }

    const [selectedMembers, setSelectedMemebers] = useState([]);
    const [approvalLines, setApprovalLines ] = useState({
        flag : {
            submitted : false,
            saved : false
        }
    })

    const updateApprovalLines = (prev, fieldName, fieldValue) => {
        return {
            ...prev,
            flag: {
                ...prev,
                [fieldName]: fieldValue
            }
        };
    };

    const handleAddAprovalLineMember = (event) => {
        const memberId = event.currentTarget.getAttribute("value");
        const selectedMember = departmentMembers.find(member => member.memberId === memberId);

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
            approvalId: member.memberId
        }));

        const result = await postApprovalLines(confirmDocumentId, approvalLineForm);
        if (result.status === 200) {
            setApprovalLines((prev) => updateApprovalLines(prev, 'submitted', true))
        }
        else {
            alert('잠시 후 다시 시도해주세요.')
        }

    }

    const handleOnClickRaiseConfirmDocument = async () => {
        const result = await raiseConfirmDoucment(vacationId);
        if (result.status === 200) {
            setApprovalLines((prev) => updateApprovalLines(prev, 'submitted', true))
            alert('상신 완료')
            navigate('/vacation')
        }
        else {
            alert('잠시 후 다시 시도해주세요.')
        }

    }

    const handleMount = async () => {
        const confirmDocumentId = "VAC" + sessionStorage.getItem('companyId') + vacationId;
        const params = {
            confirmDocumentId : confirmDocumentId
        }
        const result = await getConfirmDocument(params);
        console.log('result', result.data);
    }

    useEffect(() => (
        handleMount()
    ), [])

    return (
        <Fragment>
            <h1>결재선 지정</h1>
            <h3>지정된 멤버</h3>
            {approvalLines.flag.submitted && <button
                type="button"
                onClick={handleOnClickRaiseConfirmDocument}>
                상신
            </button>}
            <div className="list-container">
                <ul className="member-list">
                    <h3>사용자 검색</h3>
                    {(departmentMembers.length > 0 && !approvalLines.flag.submitted) && departmentMembers.map(member => {
                        return (
                            <li className="item"
                                key={member.memberPk}
                                value={member.memberId}
                                onClick={handleAddAprovalLineMember}>
                                {member.departmentName}/{member.name}/{member.enteredDate}
                            </li>
                        )
                    })}
                </ul>
                <ul className="member-list">
                    <h3>결재 라인</h3>
                    {(selectedMembers.length > 0 && !approvalLines.flag.submitted) && <button
                        type="button"
                        onClick={handleOnClickCompleteApprovaLine}>
                        결재선 지정 완료
                    </button>}
                    {(selectedMembers.length > 0 && !approvalLines.flag.submitted) ? selectedMembers.map(member => {
                        return (
                            <li className="item"
                                key={member.memberPk}
                                value={member.memberId}
                                onClick={handleExceptAprovalLineMember}>
                                {member.departmentName}/{member.name}/{member.enteredDate}
                                <span className="list-item-align-right">결재 순서:{member.approvalOrder}</span>
                            </li>
                        )
                    }) : <li className="item-none">결재 라인을 추가해주세요</li>}
                </ul>
            </div>
        </Fragment>
    )
}