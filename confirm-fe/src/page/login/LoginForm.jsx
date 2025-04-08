import { Fragment, useContext, useEffect, useRef, useState } from "react";
import AuthApi from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { CommonContext } from "../../context/CommonProvider";

import '../../css/page/Login.css'
import '../../css/Text.css'

import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import TextGroup from "../../components/text/TextGroup";
import Text from "../../components/text/Text";
import LinkText from "../../components/text/LinkText";

const whiteSpace = '';

export function LoginForm() {
    const { setLogin } = useContext(CommonContext);
    const navigaate = useNavigate();
    const idInputRef = useRef(null);
    const pwInputRef = useRef(null);

    const [loginInfo, setLoginInfo] = useState({
        id: whiteSpace,
        password: whiteSpace,
        loginLoading: false,
        loginFailMessage: whiteSpace
    });

    const setLoginFailMessage = function (msg) {
        setLoginInfo((prev) => ({
            ...prev,
            loginLoading: false,
            loginFailMessage: msg
        }))
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoginInfo((prev) => ({
            ...prev,
            loginLoading: true
        }))

        if (loginInfo.id === whiteSpace || loginInfo.password === whiteSpace) {
            setLoginFailMessage('아이디/비밀번호를 입력해주세요');
            return;
        }

        const loginResponse = await AuthApi.signIn(loginInfo);

        if (loginResponse === undefined) {
            setLoginFailMessage('해당 서비스를 사용할 수 없습니다. 관리자에 문의하세요');
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
            setLoginFailMessage(['아이디/비밀번호가 올바르지 않습니다.', '입력하신 내용을 확인해주세요.']);
        }
    }

    const handleIdInputEnterDown = (event) => {
        if (loginInfo.id === whiteSpace) {
            setLoginFailMessage('아이디/비밀번호를 입력해주세요');
            return
        }

        if (event.key === 'Enter') {
            pwInputRef.current.focus();
        }
    }

    const handlePWInputEnterDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin(event);
        }
    }

    const handleOnChangeId = (event) => {
        setLoginInfo(prev => ({
            ...prev,
            id: event.target.value,
            loginFailMessage: ''
        }))
    }

    const handleOnChangePassword = (event) => {
        setLoginInfo(prev => ({
            ...prev,
            password: event.target.value,
            loginFailMessage: ''
        }))
    }

    useEffect(() => {
        idInputRef.current?.focus();
    }, []);

    return (
        <Fragment>
            <form className="login_form" id="login_form" method="post">
                <Input className="input_login" style={{ 'marginBottom': '5px' }}
                    id="emp_no"
                    ref={idInputRef}
                    type="text"
                    placeholder="사번을 입력해주세요"
                    onKeyDown={handleIdInputEnterDown}
                    onChange={handleOnChangeId} />
                <Input className="input_login"
                    id="pw"
                    ref={pwInputRef}
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    onKeyDown={handlePWInputEnterDown}
                    onChange={handleOnChangePassword} />
                <TextGroup style={{ 'height': '50px' }} id="lgn_err_msg_gr">
                    {Array.isArray(loginInfo.loginFailMessage) ?
                        loginInfo.loginFailMessage.map(msg => <Text className="lgn_err_msg" msg={msg} />) :
                        <Text className="lgn_err_msg" msg={loginInfo.loginFailMessage} />}
                </TextGroup>
                <Button cn="login_btn"
                    type="submmit"
                    name={loginInfo.loginLoading ? 'please wait...' : 'sign-in'}
                    onClick={handleLogin}
                    disabled={loginInfo.loginLoading}>
                </Button>
            </form>
            <TextGroup className="login_msg_gr" id="lgn_cp_right">
                <Text className="login_msg" msg="Copyright JxxHxxx. All Rights Reserved" />
                <LinkText className="login_msg" href="https://github.com/JxxHxxx" msg="Visit JxxHxx Github" />
            </TextGroup>
        </Fragment >
    )
}