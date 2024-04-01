import { Fragment, useContext } from 'react'
import '../css/header.css'
import { Link, Outlet } from 'react-router-dom'
import { logout } from '../api/authApi'
import { LoginButtion } from '../components/login/LoginButton'
import { LoginContext } from '../context/AuthContext'


export function Header() {
    const { login } = useContext(LoginContext);

    const handleLogout = async () => {
        await logout();
    }

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
                <LoginContext.Provider value={login}>
                    <div className='login-button'>
                        <Link to={'login'} >
                            <LoginButtion />
                        </Link>
                    </div>
                </LoginContext.Provider>

                {/* <div className='login-button'>
                    <Link to={'login'} >
                        <button>login</button>
                    </Link>
                </div>
                <div className='logout-button'>
                    <button onClick={handleLogout}>logout</button>
                </div> */}
            </div>
            <Outlet />
        </Fragment>
    )
}