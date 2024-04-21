import { Fragment, useContext } from 'react'
import '../css/header.css'
import { Link, Outlet } from 'react-router-dom'
import { LoginButton } from '../components/login/LoginButton'
import { CommonContext } from '../context/CommonProvider'


export function Header() {
    const { login } = useContext(CommonContext);

    return (
        <Fragment>
            <div className='header-container'>
                <div className='header-menu'>
                    <Link to={'confirm'}>
                        <button className='menu-confirm-document'>결재함</button>
                    </Link>
                    <Link to={'vacation'}>
                        <button className='menu-vacation'>휴가</button>
                    </Link>
                    <Link to={'schedule'}>
                        <button className='menu-schedule'>일정</button>
                    </Link>
                </div>
                {login && <div>{sessionStorage.getItem('companyName') + "/" + sessionStorage.getItem('departmentName') + "/" + sessionStorage.getItem('name')}</div>}
                <div className='login-button'>
                    <Link to={'login'}>
                        <LoginButton />
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}