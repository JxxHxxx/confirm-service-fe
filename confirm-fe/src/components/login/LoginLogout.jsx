import { Fragment, useContext } from "react";
import { logout } from "../../api/authApi";
import { CommonContext } from "../../context/CommonProvider";

const tag = '[LoginLogout] COMPONENT'

export function LoginLogout() {
    console.log(tag);
    const { login, setLogin } = useContext(CommonContext);
    const handleLogout = async () => {
        setLogin(false);
        await logout();
    }

    return (
        <Fragment>
            <a className="menu-item"
                onClick={handleLogout}>
                {login ? '로그아웃' : '로그인'}
            </a>
        </Fragment>
    )
}