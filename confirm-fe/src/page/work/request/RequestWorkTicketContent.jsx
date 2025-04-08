import { useEffect, useState } from "react";
import Title from "../../document/Title";
import WorkApi from "../../../api/workApi";
import MainContainer from "../../../components/layout/container/MainContainer";
import WorkTicketTable from "../WorkTicketTable";
import { useNavigate } from "react-router-dom";


export default function RequestWorkTicketContent() {
    const nav = useNavigate();
    
    const [requestWorkTickets, setRequestWorkTickets] = useState({
        content : []
    });

    const callIRequestWorkTicket = async () => {
        try {
            const params = {
                memberId: sessionStorage.getItem('memberId')
            }
            const { status, data } = await WorkApi.searchWorkTicket(params);

            if (status === 200) {
                setRequestWorkTickets(data.data);
            }
        }
        catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
        callIRequestWorkTicket();
    }, [])

    return <>
        <MainContainer profile='dev'>
            <div id="requestWorkTicketContainer" 
            style={{ border: '1px dashed blue', width: '900px', margin: '0px 0px 50px 0px', padding: '20px' }}>
                <Title className="basicTitle" name="요청한 티켓" />
                <div id="infoMessage" style={{ marginBottom: '10px' }}>
                    <p style={{
                        marginTop: '5px',
                        fontWeight: "normal",
                        cursor: "pointer"
                    }}
                        className="basicDesc"
                        onClick={() => nav('/work/search')}>
                        요청한 티켓은 자신이 요청한 티켓만 조회가 가능합니다. 
                        <br />티켓 조회가 필요할 시 클릭하세요. 티켓 조회 페이지로 이동합니다
                    </p>
                </div>
                {requestWorkTickets.content.length > 0 ? <WorkTicketTable workTickets={requestWorkTickets.content} readType='REQUEST'/> :
                    <p style={{ marginTop: '20px' }} className="basicDesc">요청한 티켓이 없습니다</p>}
            </div>
        </MainContainer>
    </>
}