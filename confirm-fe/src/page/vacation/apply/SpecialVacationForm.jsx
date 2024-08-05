import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MemberSearchModal from "./MemberSearchModal";
import ApplyVacationFormLayout from "./ApplyVacationFormLayout";
import DatePicker from 'react-datepicker';
import { IoIosSearch } from "react-icons/io";
import { applyVacation, getVacationTypePolicy } from "../../../api/vacationApi";
import { ApplyVacationTransfer } from "../../../transfer/ApplyVacationTransfer";
import Select from 'react-select';
import { useEffect } from "react";
import { addDays, format } from "date-fns";



export default function SpecialVacationForm() {
    const [delegator, setDelegator] = useState({
        delegatorId: '',
        delegatorName: '',
        departmentName: ''
    });

    const [vacationForm, setVacationForm] = useState({
        startDateTime: format(new Date(), 'yyyy-MM-dd'),
        reason: '',
        delegatorId: delegator.delegatorId,
        delegatorName: delegator.delegatorName,
        vacationType: undefined,
        vacationDay: undefined
    })

    const [specialVacation, setSpecialVacation] = useState({
        show: false,
        vacationTypePolicies: [],
        emptyMessage: ''
    })

    const [memberSearchModalOpen, setMemberSearchModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSetStartDate = (date) => {
        setVacationForm(prev => ({
            ...prev,
            startDateTime: format(date, 'yyyy-MM-dd')
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
    const handleSelectVacationType = (option) => {
        setVacationForm((prev) => ({
            ...prev,
            vacationType: option.vacationType,
            vacationDay: option.vacationDay
        }))
    }

    const handleApplyVacation = async () => {
        if (vacationForm.vacationType === undefined) {
            alert('경조 유형을 지정해주세요');
            return;
        }

        const vacationDuration = {
            startDateTime: vacationForm.startDateTime + "T00:00",
            endDateTime: format(addDays(vacationForm.startDateTime, vacationForm.vacationDay - 1), 'yyyy-MM-dd') + "T23:59",
        }

        // 임시
        const delegator = { delegatorId: '', delegatorName: '' }
        const requestVacationForm = new ApplyVacationTransfer(vacationForm.vacationType, 'NOT_DEDUCT', vacationDuration, vacationForm.reason, delegator);

        const response = await applyVacation(requestVacationForm);

        navigate(`/vacation/${response.data.vacationId}/ApprovalLine`)
    }

    const handleShowVacationPolicyInformation = async () => {
        const { data } = await getVacationTypePolicy();
        if (data.data.length > 0) {
            setSpecialVacation((prev) => ({
                ...prev,
                vacationTypePolicies: data.data
            }))
        } else {
            setSpecialVacation((prev) => ({
                ...prev,
                emptyMessage: sessionStorage.getItem('companyName') + '에는 휴가 정책이 아직 존재하지 않아요'
            }))
        }
    }

    const companyName = sessionStorage.getItem('companyName');

    const vacationTypeOptions = specialVacation.vacationTypePolicies.map(vtp => ({
        vacationType: vtp.vacationType,
        vacationDay: vtp.vacationDay,
        label: vtp.vacationTypeName + "/(" + vtp.vacationDay + "일)"
    }))

    useEffect(() => {
        handleShowVacationPolicyInformation();
    }, [])

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
        }} onClick={() => setSpecialVacation((prev) => ({
            ...prev,
            show: true
        }))}>{companyName} 경조사 휴가 정책 알아보기</p>
        {specialVacation.show &&
            <>
                <div style={{ fontFamily: 'MaruBuri', fontWeight: 'normal' }}>
                    {specialVacation.vacationTypePolicies.length > 0 ?
                        <>
                            <p style={{ fontSize: '12px' }}>경조사 시작일은 휴무와 관계 없이, <span style={{ fontWeight: 'bold' }}>경조사 시작일</span>로 지정바랍니다.
                                <br />경조사 휴가 기간 내 휴일이 포함되어 있을 시 자동으로 연장됩니다.(기능 구현 중)</p>
                            <ul style={{ listStyleType: 'none', fontSize: '12px', paddingLeft: '0px' }}>
                                {specialVacation.vacationTypePolicies.map(vtp => <li key={vtp.vacationType}>{vtp.vacationTypeName} : {vtp.vacationDay}일</li>)}
                            </ul>
                        </>
                        : <p style={{ fontSize: '12px' }}>{specialVacation.emptyMessage}</p>
                    }
                    <p style={{ fontSize: '12px', color: 'gray', textDecoration: 'underLine', cursor: 'pointer' }} onClick={() => setSpecialVacation((prev) => ({
                        ...prev,
                        show: false
                    }))}>접기</p>
                </div>
            </>
        }
        <ApplyVacationFormLayout title="경조사 신청서" onApplyVacation={handleApplyVacation}>
            <div>
                <div style={{ display: 'inline-block' }}>
                    <label htmlFor="vacationType" style={{ fontSize: '12px' }}>경조사 유형을 선택해주세요</label>
                    <Select
                        id="vacationType"
                        placeholder="경조사 유형을 지정해주세요"
                        onChange={handleSelectVacationType}
                        options={vacationTypeOptions} />
                </div>
            </div>
            <div className="basic-dp gInlineBlock">
                <label htmlFor="vacationDate" style={{ fontSize: '12px' }}>시작일을 선택해주세요</label>
                <div>
                    <DatePicker
                        required
                        id="vacationDate"
                        dateFormat="yyyy-MM-dd"
                        minDate={format(new Date(), 'yyyy-MM-dd')}
                        selected={vacationForm.startDateTime}
                        onChange={(date) => handleSetStartDate(date)}
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