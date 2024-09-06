import Sidebar from "../../components/layout/Sidebar";
import { URL_WORKTICKET_APPLY, URL_WORKTICKET_RECEIVE, URL_WORKTICKET_REQUEST } from "../../constant/pageURL";


export default function WorkSidebar() {

    return <Sidebar menu={[
        { url: URL_WORKTICKET_RECEIVE, name: '요청받은 업무' },
        { url: URL_WORKTICKET_REQUEST, name: '요청한 업무' },
        { url: URL_WORKTICKET_APPLY, name: '업무 요청하기' },
        { url: '#', name: '요청 티켓 조회' },
    ]} />
}