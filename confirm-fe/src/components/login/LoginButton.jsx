import { Fragment, useContext } from "react";
import { logout } from "../../api/authApi";
import { CommonContext } from "../../context/CommonProvider";

const tag = '[LoginButton] COMPONENT'

export function LoginButton() {
    console.log(tag);
    const { login, setLogin } = useContext(CommonContext);
    const handleLogout = async () => {
        setLogin(false);
        await logout();
    }

    return (
        <Fragment>
            <button onClick={handleLogout}>{login ? 'logout' : 'login'}</button>
        </Fragment>
    )
}