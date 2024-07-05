import createAxiosInstance from "./GlobalApiConfiguration";

const instance = createAxiosInstance('http://localhost:8080', true)

export const getDeparmentMemberLeaves = function () {

    const departmentId = sessionStorage.getItem('departmentId');
    const companyId = sessionStorage.getItem('companyId');

    return instance.get(`/api/companies/${companyId}/departments/${departmentId}/member-leaves`)
        .then((res) => res.data)
        .catch((err) => alert(err))
}

export const searchCompanyMembers = function (params) {
    const companyId = sessionStorage.getItem('companyId')

    return instance.get(`/api/companies/${companyId}/members`, { params })
        .then((res) => res.data)
        .catch((err) => alert(err))
}
