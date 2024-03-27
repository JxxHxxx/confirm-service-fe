import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 3000,
  });

export const signIn = function(loginForm) {

    const requestBody = {
        memberId : loginForm.id,
        password : loginForm.password
    };

    return instance.post(`/api/auth/login`, requestBody ,{
        withCredentials: true
    }).then((res) => res.data);
}

export const checkMemberAuthentication = function(authForm) {

    const requestBody = {
        memberId : authForm.memberId,
        companyId : authForm.companyId,
        departmentId : authForm.departmentId
    };

    return instance.post(`/api/auth/check-authentication`, requestBody ,{
        withCredentials: true
    }).then((res) => res.data);
}