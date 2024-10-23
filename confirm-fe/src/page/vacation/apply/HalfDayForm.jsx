import { Fragment, useRef, useState } from "react";
import { convertDate } from "../../../converter/DateTimeConvert";
import DatePicker from 'react-datepicker';
import ReactSelect from 'react-select';
import "react-datepicker/dist/react-datepicker.css"
import VacationApi from "../../../api/vacationApi";
import { useNavigate } from "react-router-dom";
import ApplyVacationFormLayout from "./ApplyVacationFormLayout";
import VacationReason from "./VacationReason";
import { IoIosSearch } from "react-icons/io";
import MemberSearchModal from "./MemberSearchModal";

export default function HalfDayForm({ vacationType }) {
    const [delegator, setDelegator] = useState({
        delegatorId: '',
        delegatorName: '',
        departmentName: ''
    });

    const [vacationForm, setVacationForm] = useState({
        date: convertDate(new Date()),
        startTime: undefined,
        endTime: undefined,
    })

    const reasonRef = useRef();

    const [memberSearchModalOpen, setMemberSearchModalOpen] = useState(false);

    const [placeHolderColor, setPlaceHolderColor] = useState({
        time: 'gray'
    });

    const navigate = useNavigate();


    const handleSetDate = (date) => {
        setVacationForm(prev => ({
            ...prev,
            date: convertDate(date, false)
        }))
    }

    const handleSetTime = (time) => {
        setVacationForm(prev => ({
            ...prev,
            startTime: time.startTime,
            endTime: time.endTime
        }))

        setPlaceHolderColor(prev => ({
            ...prev,
            time: 'gray'
        }));
    }

    const onHandleSelectMember = (delegatorId, delgatorName, departmentName) => {
        setDelegator((prev) => ({
            ...prev,
            delegatorId: delegatorId,
            delegatorName: delgatorName,
            departmentName: departmentName
        }))
    }

    // API 로 대체
    const options = [
        { startTime: '09:00', endTime: '13:00', label: '09:00 ~ 13:00' },
        { startTime: '10:00', endTime: '14:00', label: '10:00 ~ 14:00' },
        { startTime: '11:00', endTime: '15:00', label: '11:00 ~ 15:00' },
        { startTime: '13:00', endTime: '17:00', label: '13:00 ~ 17:00' },
        { startTime: '14:00', endTime: '18:00', label: '14:00 ~ 18:00' }
    ]

    const handleApplyVacation = async () => {

        if (vacationForm.startTime === undefined || vacationForm.endTime === undefined) {
            setPlaceHolderColor(prev => ({
                ...prev,
                time: 'red'
            }));
            throw new Error('시간을 지정해주세요');
        }

        const duration = {
            startDateTime: vacationForm.date + 'T' + vacationForm.startTime,
            endDateTime: vacationForm.date + 'T' + vacationForm.endTime
        }

        // 임시
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

        const confirmDocumentId = 'VAC' + sessionStorage.getItem('companyId') + response.data.vacationId
        navigate(`/confirm/${confirmDocumentId}/ApprovalLine`, {
            state: {
                resourceId: response.data.vacationId,
                documentType : 'VAC'
            }
        })
    }

    return (<Fragment>
        <ApplyVacationFormLayout title="반차 신청서" onApplyVacation={handleApplyVacation}>
            <div className="basic-dp gInlineBlock">
                <label htmlFor="vacationDate" style={{ fontSize: '12px' }}>날짜를 지정해주세요</label>
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
            <div className="gInlineBlock">
                <label htmlFor="vacationTime" style={{ fontSize: '12px', marginLeft: '10px' }}>시간을 지정해주세요</label>
                <ReactSelect
                    id="vacationTime"
                    className="basic-slnr"
                    options={options}
                    onChange={handleSetTime}
                    placeholder={<div style={{ 'color': placeHolderColor.time }}>시간을 지정해주세요</div>}
                    isSearchable={false} />
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
    </Fragment>)
}