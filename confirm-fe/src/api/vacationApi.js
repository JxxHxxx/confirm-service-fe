import createAxiosInstance from "./GlobalApiConfiguration"

const instance = createAxiosInstance('http://localhost:8080', true)

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

export const getVacationTypePolicy = function () {
    const params = {
        companyId: sessionStorage.getItem('companyId')
    }
    return instance.get(`/api/vacations/type-policies`, { params })
        .then(res => res)
        .catch(err => err)
}