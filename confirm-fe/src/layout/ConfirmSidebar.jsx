import { Link } from "react-router-dom";


export default function ConfirmSidebar({children}) {
    return (
        <div className="container">
            <div className="sidebar">
                <ul>
                    <Link to={'/confirm'}>
                        <div className='menu'>
                            <ui>부서 결재함</ui>
                        </div>
                    </Link>
                    <Link to={'/confirm'}>
                        <div className='menu'>
                            <ui>내 결재함</ui>
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