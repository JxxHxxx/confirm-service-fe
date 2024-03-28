import '../css/header.css'


export function Header() {

    return (
        <div className='header-container'>
            <div className='header-menu'>
                <button className='menu-confirm-document'>confirm-document</button>
                <button className='menu-vacation'>vacation</button>
                <button className='menu-schedule'>schedule</button>
            </div>
            <div className='login-button'>
                <button>login/logout</button>
            </div>
        </div>
    )
}