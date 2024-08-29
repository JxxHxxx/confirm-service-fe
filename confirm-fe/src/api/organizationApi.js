import createAxiosInstance from "./GlobalApiConfiguration";

const instance = createAxiosInstance('http://localhost:8080', true)

export const getOrganizationTree = function () {

    const companyId = sessionStorage.getItem('companyId');

    return instance.get(`/api/organizations/companies/${companyId}/tree`)
        .then(res => res)
        .catch(err => err)
}

export const searchOrganization = function (params) {
    return instance.get(`/api/organizations`, { params })
}