import { Link } from "react-router-dom";
import '../../css/layout/Page.css'

export default function VacationSidebar({}) {

    return (
        <div className="sidebar">
            <div className="white-space"></div>
            <Link className='menu-item-wrapper' to={'/vacation'}>
                <div className="menu-item-wrapper">
                    <a>부서 휴가자 현황</a>
                </div>
            </Link>
            <Link className='menu-item-wrapper' to={'/vacation/leave-hist'}>
                <div className="menu-item-wrapper">
                    <a>부서 연차 현황</a>
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
    )
}