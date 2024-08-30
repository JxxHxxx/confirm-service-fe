import createAxiosInstance from './GlobalApiConfiguration';

const instance = createAxiosInstance('http://localhost:8080', true)

const createWorkTicket = (requestBody) => {
    return instance.post(`/api/work-tickets`, requestBody)
        .then(res => res)
        .catch(err => alert(err))
}

const readWorkTicket = (params) => {
    return instance.get(`/api/work-tickets/search`, { params })
        .then(res => res)
        .catch(err => alert(err))
}

const WorkApi = {
    createWorkTicket,
    readWorkTicket
}


export default WorkApi;