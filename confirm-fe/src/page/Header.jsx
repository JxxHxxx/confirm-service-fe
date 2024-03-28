import { Fragment } from 'react'
import '../css/header.css'
import { Link, Outlet } from 'react-router-dom'


export function Header() {

    return (
        <Fragment>
            <div className='header-container'>
                <div className='header-menu'>
                    <Link to={'confirm'}>
                        <button className='menu-confirm-document'>confirm-document</button>
                    </Link>
                    <Link to={'vacation'}>
                        <button className='menu-vacation'>vacation</button>
                    </Link>
                    <Link to={'schedule'}>
                        <button className='menu-schedule'>schedule</button>
                    </Link>
                </div>
                <div className='login-button'>
                    <Link to={'login'} >
                        <button>login/logout</button>
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}