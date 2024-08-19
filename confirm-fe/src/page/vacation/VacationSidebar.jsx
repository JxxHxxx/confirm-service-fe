import '../../css/layout/Page.css'
import Sidebar from "../../components/layout/Sidebar";

export default function VacationSidebar({ }) {

    return <Sidebar menu={[
        { url: '/vacation', name: '부서 휴가자 현황' },
        { url: '/vacation/leave-hist', name: '부서 연차 현황' },
        { url: '/vacation/apply', name: '휴가 신청' },
        { url: '/vacation/MyVacation', name: '작성중인 휴가' },
    ]} />

}