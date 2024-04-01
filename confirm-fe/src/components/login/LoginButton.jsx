import { Fragment, useContext } from "react";
import { LoginContext } from "../../context/AuthContext";


export function LoginButtion() {
    const login = useContext(LoginContext);

    console.log('login context', login);

    return (
        <Fragment>
                <button>{login ? 'logout' : 'login'}</button>
        </Fragment>
    )
}