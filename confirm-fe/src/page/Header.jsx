import { Fragment, useContext } from 'react'
import '../css/header.css'
import { Link, Outlet } from 'react-router-dom'
import { LoginLogout } from '../components/login/LoginLogout'
import { CommonContext } from '../context/CommonProvider'


export function Header({ children }) {
    const { login } = useContext(CommonContext);

    const userInfo = sessionStorage.getItem('companyName') + "/" + sessionStorage.getItem('departmentName') + "/" + sessionStorage.getItem('name');
    return (
        <Fragment>
            <div className='header-container'>
                <div className='header-menu'>
                    <Link to={'/confirm'}>
                        <a className='menu-item-left'>결재함</a>
                    </Link>
                    <Link to={'/vacation'}>
                        <a className='menu-item'>휴가</a>
                    </Link>
                    <Link to={'/schedule'}>
                        <a className='menu-item'>일정</a>
                    </Link>
                </div>
                {login && <div>{userInfo}</div>}
                <div className='header-menu'>
                    <Link to={'/login'}>
                        <LoginLogout />
                    </Link>
                </div>
            </div>
            {children}
            <Outlet />
        </Fragment>
    )
}