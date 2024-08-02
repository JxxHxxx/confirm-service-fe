import { useState } from "react";
import { convertDate } from "../../../converter/DateTimeConvert";
import { useNavigate } from "react-router-dom";
import MemberSearchModal from "./MemberSearchModal";
import ApplyVacationFormLayout from "./ApplyVacationFormLayout";
import DatePicker from 'react-datepicker';
import { IoIosSearch } from "react-icons/io";
import { getVacationTypePolicy } from "../../../api/vacationApi";



export default function SpecialVacationForm({ vacationType }) {
    const [delegator, setDelegator] = useState({
        delegatorId: '',
        delegatorName: '',
        departmentName: ''
    });

    const [vacationForm, setVacationForm] = useState({
        date: convertDate(new Date()),
        startTime: undefined,
        endTime: undefined,
        reason: '',
        delegatorId: delegator.delegatorId,
        delegatorName: delegator.delegatorName
    })

    const [specialVacation, setSpecialVacation] = useState({
        show: false,
        vacationTypePolicies: []
    })

    const [memberSearchModalOpen, setMemberSearchModalOpen] = useState(false);
    const navigate = useNavigate();
    const handleSetDate = (date) => {
        setVacationForm(prev => ({
            ...prev,
            date: convertDate(date, false)
        }))
    }

    const onHandleSelectMember = (delegatorId, delgatorName, departmentName) => {
        setDelegator((prev) => ({
            ...prev,
            delegatorId: delegatorId,
            delegatorName: delgatorName,
            departmentName: departmentName
        }))
    }

    const handleApplyVacation = async () => {
        if (vacationForm.startTime === undefined || vacationForm.endTime === undefined) {
        }

        const vacationDuration = {
            startDateTime: vacationForm.date + 'T' + vacationForm.startTime,
            endDateTime: vacationForm.date + 'T' + vacationForm.endTime
        }

        // 임시
        const delegator = { delegatorId: '', delegatorName: '' }
        const requestVacationForm = new ApplyVacationTransfer(vacationType, 'NOT_DEDUCT', vacationDuration, vacationForm.reason, delegator);

        const response = await applyVacation(requestVacationForm);

        navigate(`/vacation/${response.data.vacationId}/ApprovalLine`)
    }

    const handleShowVacationPolicyInformation = async () => {
        if (specialVacation.show === false) {
            const { data } = await getVacationTypePolicy();
            setSpecialVacation((prev) => ({
                ...prev,
                show: true,
                vacationTypePolicies: data.data
            }))
        }
    }

    const companyName = sessionStorage.getItem('companyName');

    return (<>
        <p style={{
            display: 'inline-block',
            fontSize: '12px',
            marginBottom: '0px',
            color: 'gray',
            fontFamily: 'MaruBuri',
            fontWeight: 'normal',
            textDecoration: 'underLine',
            cursor: 'pointer'
        }} onClick={handleShowVacationPolicyInformation}>{companyName} 경조사 휴가 정책 알아보기</p>
        {specialVacation.show && <>
            <div style={{ fontFamily: 'MaruBuri', fontWeight: 'normal' }}>
                <ul style={{ listStyleType: 'none', fontSize: '12px', paddingLeft: '0px' }}>
                    {specialVacation.vacationTypePolicies.map(vtp => <li>{vtp.vacationType} : {vtp.vacationDay}일</li>)}
                </ul>
                <p style={{ fontSize: '12px', color: 'gray', textDecoration: 'underLine', cursor: 'pointer' }} onClick={() => setSpecialVacation((prev) => ({
                    ...prev,
                    show: false
                }))}>접기</p>
            </div>
        </>}
        <ApplyVacationFormLayout title="경조사 신청서" onApplyVacation={handleApplyVacation}>
            <div className="basic-dp gInlineBlock">
                <label htmlFor="vacationDate" style={{ fontSize: '12px' }}>시작일을 지정해주세요</label>
                <div>
                    <DatePicker
                        required
                        id="vacationDate"
                        dateFormat="yyyy-MM-dd"
                        minDate={convertDate(new Date())}
                        selected={vacationForm.date}
                        onChange={(date) => handleSetDate(date)}
                    />
                </div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <p style={{ fontSize: '12px', margin: '0px' }}>직무대행자</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ul style={{ display: 'flex', alignItems: 'center', width: '211px', height: '36px', margin: '0px', padding: '0px', border: '1px solid black' }}>
                        <li style={{ listStyleType: 'none' }}>{delegator.delegatorId && <>{delegator.delegatorName}/{delegator.departmentName}</>}</li>
                    </ul>
                    <IoIosSearch className="hov"
                        size={25}
                        onClick={() => setMemberSearchModalOpen(true)} />
                    <MemberSearchModal
                        modalOpen={memberSearchModalOpen}
                        setModalOpen={setMemberSearchModalOpen}
                        onHandleSelectMember={(memberId, memberName, departmentName) => onHandleSelectMember(memberId, memberName, departmentName)} />
                </div>
            </div>
        </ApplyVacationFormLayout>
    </>)
}