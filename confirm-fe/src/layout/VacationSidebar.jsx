import { Link } from "react-router-dom";
import '../css/layout/Sidebar.css'

export default function VacationSidebar({ children }) {

    return (
        <div className="sidebar-container">
            <div className="sidebar">
            <div className="white-space"></div>
                <Link className='menu-item-wrapper' to={'/vacation'}>
                    <div className="menu-item-wrapper">
                        <a>휴가 조회</a>
                    </div>
                </Link>
                <Link className='menu-item-wrapper' to={'/vacation/apply'}>
                    <div className="menu-item-wrapper">
                        <a>휴가 신청</a>
                    </div>
                </Link>
                <Link className='menu-item-wrapper' to={'/vacation/MyVacation'}>
                    <div className="menu-item-wrapper">
                        <a>작성중인 휴가</a>
                    </div>
                </Link>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    )
}