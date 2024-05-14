import axios from 'axios'
import { checkMemberAuthentication } from './authApi';

const createAxiosInstance = (baseURL = '', authentication = false) => {
    const instance = axios.create({
        baseURL: baseURL,
        timeout: 3000,
    });

    if (authentication) {
        instance.interceptors.request.use(
            async (config) => {

                const authForm = {
                    memberId: sessionStorage.getItem('memberId'),
                    companyId: sessionStorage.getItem('companyId'),
                    departmentId: sessionStorage.getItem('departmentId'),
                    Name: sessionStorage.getItem('Name'),
                    companyName: sessionStorage.getItem('companyName'),
                    departmentName: sessionStorage.getItem('departmentName')
                }

                const statusCode = await checkMemberAuthentication(authForm)
                if (statusCode !== 200) {
                    window.location.href = '/login'
                }

                return config;
            }
        )
    }

    return instance
}

export default createAxiosInstance;