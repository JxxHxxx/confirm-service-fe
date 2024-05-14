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
            window.location.href = '/login'
        }

        return config;
    }
)

export const getVacations = function (addParams) {
    const defaultParams = {
        companyId: sessionStorage.getItem('companyId'),
        departmentId: sessionStorage.getItem('departmentId')
    }

    const params = { ...addParams, ...defaultParams }

    return instance.get(`/api/vacations`, { params })
        .then((res) => res.data)
        .catch((err) => alert(err))
}

export const applyVacation = function (requestVacationForm) {
    return instance.post(`/api/vacations`, requestVacationForm,
        { withCredentials: true }
    )
        .then(res => res)
        .catch(err => err)
}

export const raiseConfirmDoucment = function (vacationId) {
    return instance.post(`/api/vacations/${vacationId}/raise`)
        .then(res => res)
        .catch(err => err)
}