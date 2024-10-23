import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 3000,
    withCredentials: true
});

export const signIn = function (loginForm) {

    const requestBody = {
        memberId: loginForm.id,
        password: loginForm.password
    };

    return instance.post(`/api/auth/login`, requestBody, {})
        .then((res) => res.data)
        .catch(err => err.response);
}

export const logout = function () {
    return instance.post(`/api/auth/logout`, {})
        .then((res) => res.data);
}

export const checkMemberAuthentication = function () {

    const requestBody = {
        memberId: sessionStorage.getItem('memberId'),
        companyId: sessionStorage.getItem('companyId'),
        departmentId: sessionStorage.getItem('departmentId'),
        name: sessionStorage.getItem('name'),
        companyName: sessionStorage.getItem('companyName'),
        departmentName: sessionStorage.getItem('departmentName')

    };

    return instance.post(`/api/auth/check-authentication`, requestBody)
        .then((res) => res.data)
        .catch(err => err);
}

const AuthApi = {
    signIn,
    logout,
    checkMemberAuthentication,
}

export default AuthApi;