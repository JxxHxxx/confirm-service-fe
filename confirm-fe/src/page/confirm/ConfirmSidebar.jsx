import '../../css/layout/Page.css'
import Sidebar from "../../components/layout/Sidebar";

export default function ConfirmSidebar() {
    return <Sidebar menu={[
        { url: '/confirm', name: '부서 결재함' },
        { url: '/confirm/my-confirm', name: '내 결재함' },
        { url: '/confirm/draft', name: '결재 문서 작성하기' },
    ]} />
}