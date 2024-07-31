
import { Fragment, useEffect, useRef, useState } from "react";
import { applyVacation } from "../../api/vacationApi";
import { searchCompanyMembers } from "../../api/memberApi";
import '../../css/List.css'
import { useNavigate } from "react-router-dom";
import { ApplyVacationTransfer } from "../../transfer/ApplyVacationTransfer";
import DatePicker from 'react-datepicker';
import { NOW_DATE } from "../../constant/timeConst";
import { convertDate } from "../../converter/DateTimeConvert";
import { format } from "date-fns";
import Searchbar from "../../components/input/Searchbar";
import VacationReason from "./apply/VacationReason";
import Button from "../../components/button/Button";
import { IoIosSearch } from "react-icons/io";
import MemberSearchModal from "./apply/MemberSearchModal";



export default function MoreDayFormV2({ vacationType }) {
    const [vacationForm, setVacationForm] = useState({
        duration: {
            startDateTime: NOW_DATE,
            endDateTime: NOW_DATE
        }
    });

    const reasonRef = useRef();
    const [memberSearchModalOpen, setMemberSearchModalOpen] = useState(false);

    const [delegator, setDelegator] = useState({
        keyword: '',
        searchResult: [],
        selected: { delegatorId: '', delegatorName: '' }
    });

    const [vacationId, setVactionId] = useState('');

    const navigate = useNavigate();

    const handleOnSubmmit = async () => {
        const duration = {
            startDateTime: vacationForm.duration.startDateTime + "T00:00",
            endDateTime: vacationForm.duration.endDateTime + "T00:00"
        }

        const requestVacationForm = new ApplyVacationTransfer(vacationType, 'DEDUCT', duration, reasonRef.current, delegator.selected);


        const response = await applyVacation(requestVacationForm);

        if (response.status === 200) {
            setVactionId(response.data.vacationId)
        }

        navigate(`/vacation/${response.data.vacationId}/ApprovalLine`)
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

    const handleSearchDelegator = async (event, paramsKey, paramsValue) => {
        if (event !== null) {
            event.preventDefault();
        }
        const params = {
            [paramsKey]: paramsValue
        }
        const response = await searchCompanyMembers(params);
        setDelegator((prev) => ({
            ...prev,
            searchResult: response.data.length > 0 ? response.data : []
        }));
    }

    const handleOnClickSelectDelegator = (event) => {
        const selectedMember = delegator.searchResult.filter(member => member.memberId === event.target.getAttribute('value'));
        alert(event.target.innerHTML + "을 직무 대행자로 지정합니다");

        setDelegator((prev) => ({
            ...prev,
            searchResult: selectedMember,
            selected: {
                delegatorId: selectedMember[0].memberId,
                delegatorName: selectedMember[0].name
            }
        }))
    }

    useEffect(() => {
        handleSearchDelegator(null, 'departmentId', sessionStorage.getItem('departmentId'))
    }, [])

    return (
        <Fragment>
            <div style={{ margin: '30px' }}></div>
            <div style={{ display: 'grid', gridTemplateColumns: '4fr 4fr', gridRowGap: '5px' }}>
                <div style={{ paddingBottom: '3px', borderBottom: '1px solid black', display: 'flex', justifyContent: "space-between" }}>
                    <span style={{
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}>연차 신청서</span>
                    <Button cn="vacation_request_submmit" name='신청' onClick={handleOnSubmmit} />
                </div>
                <div></div>
                <div style={{ border: '1px dashed blue' }}>
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
                                <li style={{ listStyleType: 'none' }}>이재헌</li>
                            </ul>
                            <IoIosSearch
                                size={25}
                                onClick={() => setMemberSearchModalOpen(true)} />
                            <MemberSearchModal
                                modalOpen={memberSearchModalOpen}
                                setModalOpen={setMemberSearchModalOpen} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="empty-div"></div>
        </Fragment>

    )
}

