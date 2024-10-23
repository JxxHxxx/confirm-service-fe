import createAxiosInstance from "./GlobalApiConfiguration";

const instance = createAxiosInstance('http://localhost:8080', true)

const getOrganizationTree = function () {

    const companyId = sessionStorage.getItem('companyId');

    return instance.get(`/api/organizations/companies/${companyId}/tree`)
        .then(res => res)
        .catch(err => err)
}

const searchOrganization = function (params) {
    return instance.get(`/api/organizations`, { params })
}

const OrganizationApi = {
    getOrganizationTree,
    searchOrganization
}

export default OrganizationApi;