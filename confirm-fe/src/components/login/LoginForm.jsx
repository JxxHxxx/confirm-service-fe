import { Fragment, useContext, useState } from "react";
import { signIn } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/AuthContext";


export function LoginForm() {
    const { login } = useContext(LoginContext);
    const navigaate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        id: '',
        password: ''
    });

    const handleLogin = async (event) => {
        event.preventDefault();
        const loginResponse = await signIn(loginInfo);

        sessionStorage.setItem('companyId', loginResponse.data.companyId);
        sessionStorage.setItem('companyName', loginResponse.data.companyName);
        sessionStorage.setItem('departmentId', loginResponse.data.departmentId);
        sessionStorage.setItem('departmentName', loginResponse.data.departmentName);
        sessionStorage.setItem('memberId', loginResponse.data.memberId);
        sessionStorage.setItem('name', loginResponse.data.name);

        if (loginResponse.status === 200) {
            navigaate("/confirm");
        }
    }

    const handleIdInput = (event) => {
        setLoginInfo(prev => ({
            ...prev,
            id: event.target.value
        }))
    }

    const handlePasswordInput = (event) => {
        setLoginInfo(prev => ({
            ...prev,
            password: event.target.value
        }))
    }


    return (
        <Fragment>
            <form>
                <div>
                    <label htmlFor='user-id'></label>
                    <input type='text' id='user-id' placeholder="ID" onChange={handleIdInput} />
                </div>
                <div>
                    <label htmlFor='user-pw'></label>
                    <input type='password' id='user-pw' placeholder="pw" autoComplete="off" onChange={handlePasswordInput} />
                </div>
                <button type="submit" onClick={handleLogin}>Sign In</button>
            </form>
        </Fragment>
    )
}