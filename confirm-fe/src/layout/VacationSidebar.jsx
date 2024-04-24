import { Link } from "react-router-dom";

export default function VacationSidebar({ children }) {

    return (
        <div className="container">
            <div className="sidebar">
                <ul>
                    <Link to={'/vacation'}>
                        <div className='menu'>
                            <ui>휴가 조회</ui>
                        </div>
                    </Link>
                    <Link to={'/vacation/apply'}>
                        <div className='menu'>
                            <ui>휴가 신청</ui>
                        </div>
                    </Link>
                    <Link to={'/vacation/MyVacation'}>
                        <div className="menu">
                            <ui>작성중인 휴가</ui>
                        </div>
                    </Link>
                </ul>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    )
}