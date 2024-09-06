import '../../css/layout/Page.css'
import Sidebar from "../../components/layout/Sidebar";
import { URL_CONFIRM_DEPARTMENT, URL_CONFIRM_DRAFT, URL_CONFIRM_MY } from '../../constant/pageURL';

export default function ConfirmSidebar() {
    return <Sidebar menu={[
        { url: URL_CONFIRM_DEPARTMENT, name: '부서 결재함' },
        { url: URL_CONFIRM_MY, name: '내 결재함' },
        { url: URL_CONFIRM_DRAFT, name: '결재 문서 작성하기' },
    ]} />
}