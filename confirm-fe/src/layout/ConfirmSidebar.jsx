import { Link } from "react-router-dom";
import '../css/layout/Sidebar.css';

export default function ConfirmSidebar({ children }) {
    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <div className="white-space"></div>
                <Link to={'/confirm'}
                    className="menu-item-wrapper">
                    <div className="menu-item-wrapper">
                        <a>부서 결재함</a>
                    </div>
                </Link>
                <Link to={'/confirm'}
                    className="menu-item-wrapper">
                    <div className="menu-item-wrapper">
                        <a>내 결재함</a>
                    </div>
                </Link>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    )
}