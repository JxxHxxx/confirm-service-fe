import { useEffect, useState } from "react";
import WorkApi from "../../../api/workApi";
import Table from "../../../components/table/Table";
import { format } from "date-fns";
import WorkConverter from "../../../converter/work/WorkConverter";
import MainContainer from "../../../components/layout/container/MainContainer";
import Title from "../../document/Title";
import { useNavigate } from "react-router-dom";
import { URL_WORKTICKET_RECEIVE } from "../../../constant/pageURL";


export default function ReceiveWorkTicketContent() {
    const nav = useNavigate();
    const [workTickets, setWorkTickets] = useState([]);

    const requestReadWorkTickets = async () => {
        try {
            const params = {
                chargeCompanyId: sessionStorage.getItem('companyId'),
                chargeDepartmentId: sessionStorage.getItem('departmentId'),
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
                {workTickets.length > 0 ?
                    <Table tableProperty={{
                        columns: ['요청일', '요청자', '제목', '티켓 상태'],
                        data: workTickets.map(wt => <tr key={wt.workTicketPk} onClick={() => nav(URL_WORKTICKET_RECEIVE + "/" + wt.workTicketPk)}>
                            <td>{format(wt.createdTime, 'yyyy-MM-dd')}</td>
                            <td>{wt.workRequester.name}</td>
                            <td>{wt.requestTitle}</td>
                            <td>{WorkConverter.convertWorkStatus(wt.workStatus)}</td>
                        </tr>)
                    }
                    } /> :
                    <p style={{ marginTop: '20px' }} className="basicDesc">요청받은 티켓이 없습니다</p>}
            </div>
        </MainContainer>
    </>
}