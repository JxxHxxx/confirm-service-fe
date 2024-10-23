import { Fragment, useContext } from "react";
import AuthApi from "../../api/authApi";
import { CommonContext } from "../../context/CommonProvider";

const tag = '[LoginLogout] COMPONENT'

export function LoginLogout() {
    console.log(tag);
    const { login, setLogin } = useContext(CommonContext);
    const handleLogout = async () => {
        await AuthApi.logout();
        setLogin(false);
        sessionStorage.clear();
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