import '../../css/layout/Page.css'
import Sidebar from "../../components/layout/Sidebar";
import { URL_VACATION, URL_VACATION_APPLY, URL_VACATION_HIST, URL_VACATION_MY } from '../../constant/pageURL';

export default function VacationSidebar({ }) {

    return <Sidebar menu={[
        { url: URL_VACATION, name: '부서 휴가자 현황' },
        { url: URL_VACATION_HIST, name: '부서 연차 현황' },
        { url: URL_VACATION_APPLY, name: '휴가 신청' },
        { url: URL_VACATION_MY, name: '작성중인 휴가' },
    ]} />

}