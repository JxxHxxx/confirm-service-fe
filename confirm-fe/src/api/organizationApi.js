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

export const getOrganizationTree = function () {

    const companyId = sessionStorage.getItem('companyId');

    return instance.get(`/api/organizations/companies/${companyId}`)
            .then(res => res)
            .catch(err => err)
}