import { format } from "date-fns";
import Table from "../../components/table/Table";
import WorkConverter from "../../converter/work/WorkConverter";
import { URL_WORKTICKET_RECEIVE, URL_WORKTICKET_REQUEST } from "../../constant/pageURL";
import { useNavigate } from "react-router-dom";

// readType : RECEIVE, REQUEST
export default function WorkTicketTable({ workTickets, readType }) {
    const nav = useNavigate();    
    let url_prefix;
    
    if(readType === 'RECEIVE') {
        url_prefix = URL_WORKTICKET_RECEIVE;
    }
    else if(readType === 'REQUEST') {
        url_prefix = URL_WORKTICKET_REQUEST
    } 
    else {
        throw new Error('Hey developer, readType props is invalid');
    }

    return <Table tableProperty={{
        columns: ['요청일', '요청자', '제목', '작업 티켓 상태'],
        data: workTickets.map(wt => <tr key={wt.worktTicketPk} onClick={() => nav(url_prefix + "/" + wt.workTicketPk)}>
            <td style={{ minWidth: '100px' }}>{format(wt.createdTime, 'yyyy-MM-dd')}</td>
            <td style={{ minWidth: '50px' }}>{wt.workRequester.name}</td>
            <td style={{ minWidth: '550px' }}>{wt.requestTitle}</td>
            <td style={{ minWidth: '100px' }}>{WorkConverter.convertWorkStatus(wt.workStatus)}</td>
        </tr>)
    }} />
}