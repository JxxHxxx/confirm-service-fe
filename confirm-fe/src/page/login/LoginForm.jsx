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
        password: '',
        loginLoading: false,
        loginFailMessage: ''
    });

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoginInfo((prev) => ({
            ...prev,
            loginLoading: true
        }))
        const loginResponse = await signIn(loginInfo);

        if (loginResponse === undefined) {
            setLoginInfo((prev) => ({
                ...prev,
                loginLoading: false,
                loginFailMessage: '해당 서비스를 사용할 수 없습니다. 관리자에 문의하세요.'
            }))
            return;
        }

        if (loginResponse.status === 200) {
            sessionStorage.setItem('companyId', loginResponse.data.companyId);
            sessionStorage.setItem('companyName', loginResponse.data.companyName);
            sessionStorage.setItem('departmentId', loginResponse.data.departmentId);
            sessionStorage.setItem('departmentName', loginResponse.data.departmentName);
            sessionStorage.setItem('memberId', loginResponse.data.memberId);
            sessionStorage.setItem('name', loginResponse.data.name);
        }

        const httpStatus = loginResponse.status;

        if (httpStatus === 200) {
            navigaate("/vacation");
            setLogin(true);
            setLoginInfo((prev) => ({
                ...prev,
                loginLoading: false,
            }))
        }
        else if (httpStatus === 400) {
            setLoginInfo((prev) => ({
                ...prev,
                loginFailMessage: '아이디/비밀번호가 올바르지 않습니다.',
                loginLoading: false,
            }))
        }
    }

    const handleIdInput = (event) => {
        setLoginInfo(prev => ({
            ...prev,
            id: event.target.value,
            loginFailMessage : ''
        }))
    }

    const handlePasswordInput = (event) => {
        setLoginInfo(prev => ({
            ...prev,
            password: event.target.value,
            loginFailMessage : ''
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
                    <div className="wrapper">
                        {loginInfo.loginFailMessage && <span className="fail-message">{loginInfo.loginFailMessage}</span> }
                    </div>
                    <div className="wrapper-t-5">
                        <button className="login-button" type="submit"
                            onClick={handleLogin}
                            disabled={loginInfo.loginLoading}>
                            {loginInfo.loginLoading ? '로그인 중입니다.' : '로그인'}
                        </button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}