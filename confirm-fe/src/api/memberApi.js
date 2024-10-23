import createAxiosInstance from "./GlobalApiConfiguration";

const instance = createAxiosInstance('http://localhost:8080', true)

const getDeparmentMemberLeaves = function (params) {

    const departmentId = sessionStorage.getItem('departmentId');
    const companyId = sessionStorage.getItem('companyId');

    return instance.get(`/api/companies/${companyId}/departments/${departmentId}/member-leaves`, { params })
        .then((res) => res.data)
        .catch((err) => alert(err))
}

const searchCompanyMembers = function (params) {
    const companyId = sessionStorage.getItem('companyId')

    return instance.get(`/api/companies/${companyId}/members`, { params })
        .then((res) => res.data)
        .catch((err) => alert(err))
}

const MemberApi = {
    getDeparmentMemberLeaves,
    searchCompanyMembers
}

export default MemberApi;
