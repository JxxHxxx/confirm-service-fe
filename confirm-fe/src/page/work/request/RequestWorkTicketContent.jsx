import { useEffect, useState } from "react";
import Title from "../../document/Title";
import Table from "../../../components/table/Table";
import { format } from "date-fns";
import WorkApi from "../../../api/workApi";
import MainContainer from "../../../components/layout/container/MainContainer";
import WorkConverter from "../../../converter/work/WorkConverter";


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
                {requestWorkTickets.length > 0 ?
                    <Table tableProperty={{
                        columns: ['요청일', '요청자', '제목', '작업 티켓 상태'],
                        data: requestWorkTickets.map(wt => <tr key={wt.worktTicketPk}>
                            <td>{format(wt.createdTime, 'yyyy-MM-dd')}</td>
                            <td>{wt.workRequester.name}</td>
                            <td>{wt.requestTitle}</td>
                            <td>{WorkConverter.convertWorkStatus(wt.workStatus)}</td>
                        </tr>)
                    }} /> :
                    <p style={{ marginTop: '20px' }} className="basicDesc">요청한 티켓이 없습니다</p>
                }
            </div>
        </MainContainer>
    </>
}