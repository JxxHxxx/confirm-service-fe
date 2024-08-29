import { useState } from "react";
import Button from "../../../components/button/Button";
import SearchModal from "../../../components/modal/SearchModal";
import OrgSearchModal from "./OrgSearchModal";

export default function WorkTicketApplicationContent() {

    const [workTicket, setWorkTicket] = useState({
        chargeDepartmentName: '',
        chargeDepartmentId: '',
    });

    // API 적용 전 임시
    const handleSelectDepartment = () => {
        setWorkTicket({
            chargeDepartmentId: 'SPY00001',
            chargeDepartmentName: '임시부서'
        })
    }

    return <>
        <div style={{ border: '1px dashed red', margin: '50px 0px 50px 0px', padding: '20px' }}>
            <p style={{ fontSize: '22px' }}>업무 요청</p>

            <div style={{ border: '1px dashed blue', width: '500px', margin: '50px 0px 50px 0px', padding: '20px' }}>
                <div id="chargeDepartmentDiv">
                    <p style={{
                        margin: '0px',
                        fontSize: '12px',
                        color: 'gray',
                        fontFamily: 'MaruBuri'
                    }}>업무를 요청할 부서를 선택해주세요</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ margin: '0px' }}>
                            {workTicket.chargeDepartmentName ? workTicket.chargeDepartmentName : ' '}
                        </span>
                        <OrgSearchModal />
                    </div>
                </div>
            </div>
        </div>
    </>
}