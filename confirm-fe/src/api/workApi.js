import createAxiosInstance from './GlobalApiConfiguration';

const instance = createAxiosInstance('http://localhost:8080', true)

// 작업 티켓 요청 API
const createWorkTicket = (requestBody) => {
    return instance.post(`/api/work-tickets`, requestBody)
        .then(res => res)
        .catch(err => alert(err))
}
// 작업 티켓 검색 API
const searchWorkTicket = (params) => {
    return instance.get(`/api/work-tickets/search`, { params })
        .then(res => res)
        .catch(err => alert(err))
}

const getOneWorkTicket = (workTicketPk) => {
    return instance.get(`/api/work-tickets/${workTicketPk}`)
        .then(res => res)
        .catch(err => alert(err))
}

const WorkApi = {
    createWorkTicket,
    searchWorkTicket,
    getOneWorkTicket
}


export default WorkApi;