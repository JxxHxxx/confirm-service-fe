import { useState } from "react";
import Button from "../../../components/button/Button";

export default function WorkRequestContent() {

    const [workTicket, setWorkTicket] = useState({
        chargeDepartmentName: '',
        chargeDepartmentId: '',
    });

    // API 적용 전 임시
    const handleSelectDepartment = () => {
        setWorkTicket({
            chargeDepartmentId : 'SPY00001',
            chargeDepartmentName : '임시부서'
        })
    }

    return <>
        <div style={{ border: '1px dashed red', margin: '50px 0px 50px 0px', padding: '20px' }}>
            <p style={{ fontSize: '22px' }}>업무 요청</p>

            <table style={{ borderCollapse: 'collapse' }}>
                <tr>
                    <td style={
                        {
                            height: '30px',
                            width: '500px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}><span>{workTicket.chargeDepartmentName ? workTicket.chargeDepartmentName : ' '}</span>
                        <Button
                            cn="btn_normal"
                            name="부서 검색"
                            onClick={handleSelectDepartment} />
                    </td>
                </tr>
            </table>
        </div>
    </>
}