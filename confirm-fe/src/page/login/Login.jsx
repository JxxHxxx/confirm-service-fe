import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { useEffect } from "react";
import { checkMemberAuthentication } from "../../api/authApi";

const tag = '[Login] COMPONENT'

export function Login( { props } ) {
    console.log(tag);

    const navigate = useNavigate();

    // 인증 로직 - 현재는 테스트
    const checkAuth = async () => {
        const authForm = {
            memberId : sessionStorage.getItem('memberId'),
            companyId : sessionStorage.getItem('companyId'),
            departmentId : sessionStorage.getItem('departmentId')
        }

        const responseStatusCode = await checkMemberAuthentication(authForm);
        if(responseStatusCode === 200) {

            navigate("/confirm");
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])

    return (
        <LoginForm />
    )
}