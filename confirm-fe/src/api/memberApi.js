import axios from 'axios'
import { checkMemberAuthentication } from './authApi';


const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 3000,
});

instance.interceptors.request.use(
    async (config) => {

        const authForm = {
            memberId: sessionStorage.getItem('memberId'),
            companyId: sessionStorage.getItem('companyId'),
            departmentId: sessionStorage.getItem('departmentId')
        }

        const statusCode = await checkMemberAuthentication(authForm)
        console.log('call')
        if (statusCode !== 200) {

        }

        return config;
    }
)

export const getDeparmentMembers = function () {
    
    const departmentId = sessionStorage.getItem('departmentId');

    const params = {
        cid: sessionStorage.getItem('companyId')
    }

    return instance.get(`/api/departments/${departmentId}/member-leaves`, {params})
        .then((res) => res.data)
        .catch((err) => alert(err))
}

export const searchDeparmentMembers = function (departmentId) {
    
    const params = {
        cid: sessionStorage.getItem('companyId')
    }

    return instance.get(`/api/departments/${departmentId}/member-leaves`, {params})
        .then((res) => res.data)
        .catch((err) => alert(err))
}