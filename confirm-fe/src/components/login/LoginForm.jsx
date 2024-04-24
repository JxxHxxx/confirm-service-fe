import { Fragment, useContext, useState } from "react";
import { signIn } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { CommonContext } from "../../context/CommonProvider";

import '../../css/page/Login.css'

const tag = '[LoginForm] COMPONENT'
export function LoginForm() {
    console.log(tag);
    const { setLogin } = useContext(CommonContext);

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
            setLogin(true);
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
            <div className="login-container">
                <form className="login-form">
                <h3 className="login-title">JXX</h3>
                    <div className="wrapper">
                        <label htmlFor='user-id'></label>
                        <input className="login-input"
                            type='text'
                            id='user-id'
                            placeholder="사번"
                            onChange={handleIdInput} />
                    </div>
                    <div className="wrapper">
                        <label htmlFor='user-pw'></label>
                        <input className="login-input"
                            type='password'
                            id='user-pw'
                            placeholder="비밀번호"
                            autoComplete="off"
                            onChange={handlePasswordInput} />
                    </div>
                    <button className="login-button" type="submit"
                        onClick={handleLogin}>
                        로그인</button>
                </form>
            </div>
        </Fragment>
    )
}