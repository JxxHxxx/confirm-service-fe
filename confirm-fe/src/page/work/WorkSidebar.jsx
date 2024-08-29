import Sidebar from "../../components/layout/Sidebar";
import { URL_RECEIVE_WORK_TICKET } from "../../constant/pageURL";


export default function WorkSidebar() {

    return <Sidebar menu={[
        { url: URL_RECEIVE_WORK_TICKET, name: '요청받은 업무' },
        { url: '/work/request', name: '요청한 업무' },
        { url: '/work/apply', name: '업무 요청하기' },
        { url: '#', name: '요청 티켓 조회' },
    ]} />
}