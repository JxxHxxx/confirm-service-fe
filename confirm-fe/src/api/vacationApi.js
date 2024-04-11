import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 3000,
  });

export const getVacations = function(searchForm) {

    const params = {
        companyId : sessionStorage.getItem('companyId'),
        departmentId : sessionStorage.getItem('departmentId')
    }

    return instance.get(`/api/vacations`, {params})
    .then((res) => res.data)
    .catch((err) => err)
}
     