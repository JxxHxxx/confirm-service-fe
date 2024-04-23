import { Fragment, useState } from "react"
import { postApprovalLines } from "../../api/confirmApi";
import { raiseConfirmDoucment } from "../../api/vacationApi";


export default function ApprovalLine({ departmentMembers, vacationId }) {
    const [selectedMembers, setSelectedMemebers] = useState([]);
    const [approvalLineSubmitted, setApprovalLineSubmitted] = useState(false);

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

    console.log('selectedMembers', selectedMembers);

    const handleExceptAprovalLineMember = (event) => {
        const memberId = event.currentTarget.getAttribute("value");
        const updatedMembers = selectedMembers.filter(member => member.memberId !== memberId);
        setSelectedMemebers(updatedMembers)
    }

    const handleOnClickCompleteApprovaLineSet = async () => {
        const confirmDocumentId = "VAC" + sessionStorage.getItem('companyId') + vacationId;
        const approvalLineForm = selectedMembers.map(member => ({
            approvalOrder: member.approvalOrder,
            approvalId: member.memberId
        }));

        const result = await postApprovalLines(confirmDocumentId, approvalLineForm);
        if (result.status === 200) {
            setApprovalLineSubmitted(true);
        }
        else {
            alert('잠시 후 다시 시도해주세요.')
        }

    }

    const handleOnClickRaiseConfirmDocument = async () => {
        const result = await raiseConfirmDoucment(vacationId);
        if (result.status === 200) {
            setApprovalLineSubmitted(false);
            alert('상신 완료')
        }
        else {
            alert('잠시 후 다시 시도해주세요.')
        }

    }

    return (
        <Fragment>
            <h1>결재선 지정</h1>
            <h3>지정된 멤버</h3>
            {approvalLineSubmitted && <button
                type="button"
                onClick={handleOnClickRaiseConfirmDocument}>
                상신
            </button>}
            {(selectedMembers.length > 0 && !approvalLineSubmitted) && <button
                type="button"
                onClick={handleOnClickCompleteApprovaLineSet}>
                결재선 지정 완료
            </button>}
            <ul className="list">
                {(selectedMembers.length > 0 && !approvalLineSubmitted) ? selectedMembers.map(member => {
                    return (
                        <li className="list-item"
                            key={member.memberPk}
                            value={member.memberId}
                            onClick={handleExceptAprovalLineMember}>
                            {member.departmentName}/{member.name}/{member.enteredDate}
                            <span className="list-item-align-right">결재 순서:{member.approvalOrder}</span>
                        </li>
                    )
                }) : <div>없습니다</div>}
            </ul>
            <h3>부서원</h3>
            <ul className="list">
                {(selectedMembers.length > 0 && !approvalLineSubmitted) && departmentMembers.map(member => {
                    return (
                        <li className="list-item"
                            key={member.memberPk}
                            value={member.memberId}
                            onClick={handleAddAprovalLineMember}>
                            {member.departmentName}/{member.name}/{member.enteredDate}
                        </li>
                    )
                })}
            </ul>
        </Fragment>
    )
}