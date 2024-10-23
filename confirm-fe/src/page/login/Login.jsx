import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { useEffect } from "react";
import AuthApi from "../../api/authApi";

const tag = '[Login] COMPONENT'

export function Login({ props }) {
    console.log(tag);

    const navigate = useNavigate();

    // 인증 로직 - 현재는 테스트
    const checkAuth = async () => {
        const responseStatusCode = await AuthApi.checkMemberAuthentication();
    
        if (responseStatusCode === 200) {
            navigate("/confirm");
        }
        else if (responseStatusCode === 401) {
            navigate("/login")
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])

    return (
        <LoginForm />
    )
}