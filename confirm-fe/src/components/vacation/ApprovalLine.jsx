import { Fragment, useState } from "react"


export default function ApprovalLine({ departmentMembers }) {
    const [selectedMembers, setSelectedMemebers] = useState([]);
    console.log('selectedMembers', selectedMembers);

    const handleSelectMember = (event) => {
        console.log('선택했어요.', event.target.value);
        setSelectedMemebers(prev => [...prev, event.target.value])
    }

    return (
        <Fragment>
            <h1>결재선 지정</h1>
            <h3>지정된 멤버</h3>
            <ul className="list">
                {selectedMembers > 0 ? selectedMembers.map(member => {
                    return (
                        <li className="list-item"
                            key={member.memberPk}
                            value={member.memberId}>
                            {member.departmentName}/{member.name}/{member.enteredDate}
                        </li>
                    )
                }) : <div>없습니다</div>}
            </ul>
            <h3>부서원</h3>
            <ul className="list">
                {departmentMembers.length > 0 && departmentMembers.map(member => {
                    return (
                        <li className="list-item"
                            key={member.memberPk}
                            value={member.memberId}
                            onClick={handleSelectMember}>
                            {member.departmentName}/{member.name}/{member.enteredDate}
                        </li>
                    )
                })}
            </ul>
        </Fragment>
    )
}