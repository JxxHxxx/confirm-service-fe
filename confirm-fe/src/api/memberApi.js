import createAxiosInstance from "./GlobalApiConfiguration";

const instance = createAxiosInstance('http://localhost:8080', true)

export const getDeparmentMembers = function () {

    const departmentId = sessionStorage.getItem('departmentId');

    const params = {
        cid: sessionStorage.getItem('companyId')
    }

    return instance.get(`/api/departments/${departmentId}/member-leaves`, { params })
        .then((res) => res.data)
        .catch((err) => alert(err))
}

export const searchDeparmentMembers = function (departmentId) {

    const params = {
        cid: sessionStorage.getItem('companyId')
    }

    return instance.get(`/api/departments/${departmentId}/member-leaves`, { params })
        .then((res) => res.data)
        .catch((err) => alert(err))
}