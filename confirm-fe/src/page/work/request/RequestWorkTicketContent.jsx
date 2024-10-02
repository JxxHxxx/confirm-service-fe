import { useEffect, useState } from "react";
import Title from "../../document/Title";
import WorkApi from "../../../api/workApi";
import MainContainer from "../../../components/layout/container/MainContainer";
import WorkTicketTable from "../WorkTicketTable";


export default function RequestWorkTicketContent() {

    const [requestWorkTickets, setRequestWorkTickets] = useState([]);

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
            <div id="requestWorkTicketContainer" style={{ border: '1px dashed blue', width: '900px', margin: '0px 0px 50px 0px', padding: '20px' }}>
                <Title className="basicTitle" name="요청한 티켓" />
                {requestWorkTickets.length > 0 ? <WorkTicketTable workTickets={requestWorkTickets} readType='REQUEST'/> :
                    <p style={{ marginTop: '20px' }} className="basicDesc">요청한 티켓이 없습니다</p>}
            </div>
        </MainContainer>
    </>
}