import { useEffect, useState } from "react";
import WorkApi from "../../../api/workApi";
import MainContainer from "../../../components/layout/container/MainContainer";
import Title from "../../document/Title";
import { useNavigate } from "react-router-dom";
import WorkTicketTable from "../WorkTicketTable";


export default function ReceiveWorkTicketContent() {
    const [workTickets, setWorkTickets] = useState([]);

    const requestReadWorkTickets = async () => {
        try {
            const params = {
                chargeCompanyId: sessionStorage.getItem('companyId'),
                chargeDepartmentId: sessionStorage.getItem('departmentId'),
                workStatus : 'CREATE,RECEIVE,ANALYZE_BEGIN,ANALYZE_COMPLETE,MAKE_PLAN_BEGIN,MAKE_PLAN_COMPLETE,REQUEST_CONFIRM,ACCEPT,WORKING',
            }

            const { data } = await WorkApi.searchWorkTicket(params);

            if (data.status === 200) {
                setWorkTickets(data.data);
            }
            else {
                // 조회 결과 없음 처리
            }

        }
        catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
        requestReadWorkTickets();
    }, [])

    return <>
        <MainContainer profile='dev'>
            <div id="receiveWorkTicketContainer" style={{ border: '1px dashed blue', width: '900px', margin: '0px 0px 50px 0px', padding: '20px' }}>
                <Title className="basicTitle" name="요청받은 티켓" />
                <p style={{marginTop : '5px'}} className="basicDesc">작업이 완료됐거나 반려된 티켓을 확인하려면 티켓 조회 기능을 이용하세요</p>
                {workTickets.length > 0 ?
                    <WorkTicketTable workTickets={workTickets} readType='RECEIVE' /> :
                    <p style={{ marginTop: '20px' }} className="basicDesc">요청받은 티켓이 없습니다</p>}
            </div>
        </MainContainer>
    </>
}