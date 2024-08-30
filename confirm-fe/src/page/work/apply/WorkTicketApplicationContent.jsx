import { useRef, useState } from "react";
import Button from "../../../components/button/Button";
import SearchModal from "../../../components/modal/SearchModal";
import OrgSearchModal from "./OrgSearchModal";
import WorkApi from "../../../api/workApi";

export default function WorkTicketApplicationContent() {

    const [workTicket, setWorkTicket] = useState({
        chargeDepartmentName: '',
        chargeCompanyId: '',
        chargeDepartmentId: '',
    });

    const requestTitleRef = useRef('');
    const requestContentRef = useRef('');

    const handleOnChangeTextarea = (ref, event) => {
        ref.current = event.target.value;
    }

    const handleOnclickApplyWorkTicket = async () => {
        if (workTicket.chargeCompanyId === '' || workTicket.chargeDepartmentId === '') {
            alert("업무를 요청할 부서를 선택해주세요")
            throw new Error("요청 부서가 지정되지 않았습니다");
        }

        if (requestTitleRef.current.length <= 1) {
            alert("2자 이상의 요청 제목을 입력해주세요");
            throw new Error("요청 제목은 2자 이상이여야 합니다.");
        }

        try {
            const requestBody = {
                chargeCompanyId: workTicket.chargeCompanyId,
                chargeDepartmentId: workTicket.chargeDepartmentId,
                requestTitle: requestTitleRef.current,
                requestContent: requestContentRef.current,
                workRequester: {
                    companyId: sessionStorage.getItem('companyId'),
                    id: sessionStorage.getItem('memberId'),
                    name: sessionStorage.getItem('name')
                }
            }
            // 응답 실패, 성공 케이스 처리해야함
            const response = await WorkApi.createWorkTicket(requestBody);

        } catch (e) {
            alert(e);
        }
    }
    return <>
        <div style={{ border: '1px dashed red', margin: '50px 0px 50px 0px', padding: '20px' }}>
            <div style={{ border: '1px dashed blue', width: '500px', margin: '0px 0px 50px 0px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', marginBottom: '10px' }}>
                    <p style={{ fontSize: '22px', margin: '0px' }}>업무 요청</p>
                    <Button cn="btn_normal"
                        name="요청"
                        onClick={handleOnclickApplyWorkTicket} />
                </div>
                <div id="chargeDepartmentDiv">
                    <p style={{
                        margin: '0px',
                        fontSize: '12px',
                        color: 'gray',
                        fontFamily: 'MaruBuri'
                    }}>업무를 요청할 부서를 선택해주세요</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{
                            margin: '0px',
                        }}>
                            {workTicket.chargeDepartmentName ? workTicket.chargeDepartmentName : ' '}
                        </span>
                        <OrgSearchModal setWorkTicket={setWorkTicket} />
                    </div>
                    <div style={{ marginBottom: '10px' }}></div>
                    <p id='requestTitleDesc'
                        style={{
                            margin: '0px',
                            fontSize: '12px',
                            color: 'gray',
                            fontFamily: 'MaruBuri'
                        }}>요청 제목</p>
                    <textarea style={{ width: '495px', height: '21px', resize: 'none' }}
                        onChange={(event) => handleOnChangeTextarea(requestTitleRef, event)} />
                    <div style={{ marginBottom: '10px' }}></div>
                    <p id='requestContentDesc'
                        style={{
                            margin: '0px',
                            fontSize: '12px',
                            color: 'gray',
                            fontFamily: 'MaruBuri'
                        }}>요청 내용</p>
                    <textarea style={{ width: '495px', height: '315px', resize: 'none' }}
                        onChange={(event) => handleOnChangeTextarea(requestContentRef, event)} />
                </div>
            </div>
        </div>
    </>
}