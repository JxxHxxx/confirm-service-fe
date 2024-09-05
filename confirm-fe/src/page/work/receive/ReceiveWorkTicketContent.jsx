import { useEffect, useState } from "react";
import WorkApi from "../../../api/workApi";
import Table from "../../../components/table/Table";
import { format } from "date-fns";
import WorkConverter from "../../../converter/work/WorkConverter";

export default function ReceiveWorkTicketContent() {

    const [workTickets, setWorkTickets] = useState([]);

    const requestReadWorkTickets = async () => {
        try {
            const params = {
                chargeCompanyId: sessionStorage.getItem('companyId'),
                chargeDepartmentId: sessionStorage.getItem('departmentId'),
            }

            const { data } = await WorkApi.readWorkTicket(params);

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
        <div style={{ border: '1px dashed red', margin: '50px 0px 50px 0px', padding: '20px' }}>
            <p style={{ fontSize: '22px' }}>요청받은 업무</p>
            <Table tableProperty={{
                columns: ['요청일시', '요청자', '제목', '티켓 상태'],
                data: workTickets.map(wt => <tr key={wt.workTicketId}>
                    <td>{format(wt.createdTime, 'yyyy-MM-dd HH:mm:ss')}</td>
                    <td>{wt.workRequester.name}</td>
                    <td>{wt.requestTitle}</td>
                    <td>{WorkConverter.convertWorkStatus(wt.workStatus)}</td>
                </tr>)
            }
            } />
        </div>
    </>
}