import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 3000,
});

export const getOrganizationTree = function () {

    const companyId = sessionStorage.getItem('companyId');

    return instance.get(`/api/organizations/companies/${companyId}`)
            .then(res => res)
            .catch(err => err)
}