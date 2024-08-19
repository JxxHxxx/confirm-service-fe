import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export default function Sidebar({ menu = [{ url: '', name: '' }] }) {
    return <div className="sidebar">
        <div className="white-space"></div>
        {menu.map(m =>
            <Link to={m.url} className="menu-item-wrapper">
                <div className="menu-item-wrapper">
                    <a>{m.name}</a>
                </div>
            </Link>)}
    </div>
}

Sidebar.propTypes = {
    menu: PropTypes.array
}