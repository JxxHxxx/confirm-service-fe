import { Link } from "react-router-dom";
import '../../css/layout/Page.css'

export default function ConfirmSidebar({}) {
    return (
            <div className="sidebar">
                <div className="white-space"></div>
                <Link to={'/confirm'}
                    className="menu-item-wrapper">
                    <div className="menu-item-wrapper">
                        <a>부서 결재함</a>
                    </div>
                </Link>
                <Link to={'/confirm/my-confirm'}
                    className="menu-item-wrapper">
                    <div className="menu-item-wrapper">
                        <a>내 결재함</a>
                    </div>
                </Link>
                <Link to={'/confirm/draft'}
                    className="menu-item-wrapper">
                    <div className="menu-item-wrapper">
                        <a>결재 문서 작성하기</a>
                    </div>
                </Link>
            </div>
    )
}