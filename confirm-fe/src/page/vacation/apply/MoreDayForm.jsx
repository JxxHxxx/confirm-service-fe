
import { Fragment, useEffect, useRef, useState } from "react";
import VacationApi from "../../../api/vacationApi";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import { NOW_DATE } from "../../../constant/timeConst";
import { convertDate } from "../../../converter/DateTimeConvert";
import { format } from "date-fns";
import VacationReason from "./VacationReason";
import Button from "../../../components/button/Button";
import { IoIosSearch } from "react-icons/io";
import MemberSearchModal from "./MemberSearchModal";
import ApplyVacationFormLayout from "./ApplyVacationFormLayout";

export default function MoreDayForm({ vacationType }) {
    const [vacationForm, setVacationForm] = useState({
        duration: {
            startDateTime: NOW_DATE,
            endDateTime: NOW_DATE
        }
    });

    const reasonRef = useRef();
    const [memberSearchModalOpen, setMemberSearchModalOpen] = useState(false);

    const [delegator, setDelegator] = useState({
        delegatorId: '',
        delegatorName: '',
        departmentName: ''
    });

    const [vacationId, setVactionId] = useState('');

    const navigate = useNavigate();

    const handleOnSubmmit = async () => {
        const duration = {
            startDateTime: vacationForm.duration.startDateTime + "T00:00",
            endDateTime: vacationForm.duration.endDateTime + "T00:00"
        }

        const requestVacationForm = {
            requesterId: sessionStorage.getItem('memberId'),
            requesterName: sessionStorage.getItem('name'),
            departmentId: sessionStorage.getItem('departmentId'),
            departmentName: sessionStorage.getItem('departmentName'),
            vacationType: vacationType,
            leaveDeduct: 'DEDUCT',
            requestVacationDurations: [
                {
                    startDateTime: duration.startDateTime,
                    endDateTime: duration.endDateTime
                }
            ],
            title: '휴가신청서',
            reason: reasonRef.current,
            delegatorId: delegator.delegatorId,
            delegatorName: delegator.delegatorName,
        }

        const response = await VacationApi.applyVacation(requestVacationForm);

        if (response.status === 200) {
            setVactionId(response.data.vacationId)
        }

        const confirmDocumentId = 'VAC' + sessionStorage.getItem('companyId') + response.data.vacationId
        navigate(`/confirm/${confirmDocumentId}/ApprovalLine`, {
            state: {
                resourceId: response.data.vacationId,
                documentType : 'VAC'
            }
        })
    }

    const handleOnChangeDate = (fieldName, date) => {
        setVacationForm((prev) => ({
            ...prev,
            duration: {
                ...prev.duration,
                [fieldName]: format(date, 'yyyy-MM-dd')
            }
        })
        )
    }

    const onHandleSelectMember = (delegatorId, delgatorName, departmentName) => {
        setDelegator((prev) => ({
            ...prev,
            delegatorId: delegatorId,
            delegatorName: delgatorName,
            departmentName: departmentName
        }))
    }

    useEffect(() => {
    }, [])

    return (
        <Fragment>
            <ApplyVacationFormLayout title="연차 신청서" onApplyVacation={handleOnSubmmit}>
                <div className="basic-dp">
                </div>
                <div className="basic-dp" style={{ 'display': 'inline-block', marginRight: '10px' }}>
                    <label htmlFor="startDateTime" style={{ fontSize: '12px' }}>시작일을 입력해주세요</label>
                    <div>
                        <DatePicker
                            id="startDateTime"
                            required
                            dateFormat="yyyy-MM-dd"
                            minDate={convertDate(new Date())}
                            selected={vacationForm.duration.startDateTime}
                            onChange={(date) => handleOnChangeDate('startDateTime', date)}
                        />
                    </div>
                </div>
                <div className="basic-dp" style={{ 'display': 'inline-block' }}>
                    <label htmlFor="endDateTime" style={{ fontSize: '12px' }}>종료일을 입력해주세요</label>
                    <div>
                        <DatePicker
                            id="endDateTime"
                            required
                            dateFormat="yyyy-MM-dd"
                            minDate={format(new Date(), 'yyyy-MM-dd')}
                            selected={vacationForm.duration.endDateTime}
                            onChange={(date) => handleOnChangeDate('endDateTime', date)}
                        /></div>
                </div>
                <VacationReason onChange={(event) => reasonRef.current = event.target.value} />
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
        </Fragment>

    )
}

