import axios from 'axios';
import createAxiosInstance from './GlobalApiConfiguration';

const instance = createAxiosInstance('http://localhost:8080', true)

// 작업 티켓 요청 API
const createWorkTicket = (requestBody) => {
    return instance.post(`/api/work-tickets`, requestBody)
        .then(res => res)
        .catch(err => err.response)
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

const receiveWorkTicket = (workTicketId) => {
    const requestBody = {
        receiverCompanyId: sessionStorage.getItem('companyId'),
        receiverDepartmentId: sessionStorage.getItem('departmentId'),
        receiverId: sessionStorage.getItem('memberId'),
        receiverName: sessionStorage.getItem('name')
    }

    return instance.post(`/api/work-tickets/${workTicketId}/receive`, requestBody)
        .then(res => res)
        .catch(err => alert(err))
}

const beginAnalysisWorkTicket = (workTicketId) => {
    const requestBody = {
        receiverCompanyId: sessionStorage.getItem('companyId'),
        receiverDepartmentId: sessionStorage.getItem('departmentId'),
        receiverId: sessionStorage.getItem('memberId'),
        receiverName: sessionStorage.getItem('name')
    }

    return instance.patch(`/api/work-tickets/${workTicketId}/begin-analysis`, requestBody)
        .then(res => res)
        .catch(err => err.response)
}

const completeAnalysisWorkTicket = (workTicketId, analyzeContent) => {
    const requestBody = {
        receiverCompanyId: sessionStorage.getItem('companyId'),
        receiverDepartmentId: sessionStorage.getItem('departmentId'),
        receiverId: sessionStorage.getItem('memberId'),
        receiverName: sessionStorage.getItem('name'),
        analyzeContent: analyzeContent
    }

    return instance.patch(`/api/work-tickets/${workTicketId}/complete-analysis`, requestBody)
        .then(res => res)
        .catch(err => err.response)
}

const beginPlanningWorkTicket = (workTicketId) => {
    const requestBody = {
        receiverCompanyId: sessionStorage.getItem('companyId'),
        receiverDepartmentId: sessionStorage.getItem('departmentId'),
        receiverId: sessionStorage.getItem('memberId'),
        receiverName: sessionStorage.getItem('name')
    }

    return instance.patch(`/api/work-tickets/${workTicketId}/begin-plan`, requestBody)
        .then(res => res)
        .catch(err => alert(err))
}

const completePlanningWorkTicket = (workTicketId, workPlanContent) => {
    const requestBody = {
        receiverCompanyId: sessionStorage.getItem('companyId'),
        receiverDepartmentId: sessionStorage.getItem('departmentId'),
        receiverId: sessionStorage.getItem('memberId'),
        receiverName: sessionStorage.getItem('name'),
        workPlanContent: workPlanContent
    }

    return instance.patch(`/api/work-tickets/${workTicketId}/complete-plan`, requestBody)
        .then(res => res)
        .catch(err => err.response)
}

const requestConfirmWorkTicket = (workTicketId) => {
    const requestBody = {
        receiverCompanyId: sessionStorage.getItem('companyId'),
        receiverDepartmentId: sessionStorage.getItem('departmentId'),
        receiverId: sessionStorage.getItem('memberId'),
        receiverName: sessionStorage.getItem('name'),
    }

    return instance.patch(`/api/work-tickets/${workTicketId}/request-confirm`, requestBody)
        .then(res => res)
        .catch(err => alert(err))
}

const rejectTicketFromReceiver = (workTicketId, rejectReason) => {
    const requestBody = {
        ticketReceiver: {
            receiverCompanyId: sessionStorage.getItem('companyId'),
            receiverDepartmentId: sessionStorage.getItem('departmentId'),
            receiverId: sessionStorage.getItem('memberId')
        },
        rejectReason: rejectReason
    }

    return instance.patch(`/api/work-tickets/${workTicketId}/reject-from-receiver`, requestBody)
        .then(res => res)
        .catch(err => err)
}

const beginWork = (workTicketId) => {
    const requestBody = {
        ticketReceiver: {
            receiverCompanyId: sessionStorage.getItem('companyId'),
            receiverDepartmentId: sessionStorage.getItem('departmentId'),
            receiverId: sessionStorage.getItem('memberId')
        }
    }

    return instance.patch(`/api/work-tickets/${workTicketId}/begin-work`, requestBody)
        .then(res => res)
        .catch(err => err.response)
}

const completeWork = (workTicketId) => {
    const requestBody = {
        ticketReceiver: {
            receiverCompanyId: sessionStorage.getItem('companyId'),
            receiverDepartmentId: sessionStorage.getItem('departmentId'),
            receiverId: sessionStorage.getItem('memberId')
        }
    }

    return instance.patch(`/api/work-tickets/${workTicketId}/complete-work`, requestBody)
        .then(res => res)
        .catch(err => err.response)
}

const storeWorkTicketAttachment = (params) => {
    const formData = new FormData();
    formData.append('file', params.file);
    formData.append('workTicketId', params.workTicketId);

    return axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 3000
    }).post(`/api/work-ticket-attachments`, formData, {
        headers: {
            'content-type': 'multipart/form-data' }
    })
}

const WorkApi = {
    createWorkTicket,
    searchWorkTicket,
    getOneWorkTicket,
    receiveWorkTicket,
    beginAnalysisWorkTicket,
    completeAnalysisWorkTicket,
    beginPlanningWorkTicket,
    completePlanningWorkTicket,
    requestConfirmWorkTicket,
    rejectTicketFromReceiver,
    beginWork,
    completeWork,
    storeWorkTicketAttachment
}

export default WorkApi;