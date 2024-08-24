import { Link } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";


export default function WorkSidebar() {

    return <Sidebar menu={[
        { url: '/work/search', name: '요청받은 업무' },
        { url: '/work/request', name: '업무 요청하기' },
        { url: '#', name: '요청 티켓 조회' }
    ]} />
}