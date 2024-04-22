import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 3000,
});

export const getDeparmentMembers = function () {
    
    const departmentId = sessionStorage.getItem('departmentId');

    const params = {
        cid: sessionStorage.getItem('companyId')
    }

    return instance.get(`/api/departments/${departmentId}/member-leaves`, {params})
        .then((res) => res.data)
        .catch((err) => alert(err))
}
