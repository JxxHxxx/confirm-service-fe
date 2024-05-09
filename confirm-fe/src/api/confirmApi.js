import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000,
});

export const getConfirmDocument = function (params) {

  return instance.get(`/api/confirm-documents`, { params })
    .then((res) => res)
    .catch((err) => err)
}

export const getDepartmentConfirmDocuments = function () {
  const params = {
    companyId: sessionStorage.getItem('companyId'),
    departmentId: sessionStorage.getItem('departmentId')
  }
  
  return instance.get(`/api/confirm-documents/search-my-department`, { params })
    .then((res) => res)
    .catch((err) => err)
}

export const getConfirmDocumentIncludeApproval = function () {
  const defaultParams = {
    approvalId: sessionStorage.getItem('memberId')
  }

  return instance.get(`/api/confirm-documents`, { params: defaultParams })
    .then((res) => res.data)
    .catch((err) => err)
}

// back 에 구현 안되어있음
export const getApprovalLines = function (confirmDocumentId) {
  return instance.get(`/api/confirm-documents/${confirmDocumentId}/approval-lines`)
    .then((res) => res)
    .catch((err) => err)
}

export const postApprovalLines = function (confirmDocumentId, approvalLineForm) {

  return instance.post(`/api/confirm-documents/${confirmDocumentId}/approval-lines`, approvalLineForm)
    .then((res) => res)
    .catch((err) => err)
}

export const acceptConfirmDocument = function (confirmDocumentPk, approvalForm) {
  return instance.patch(`/api/confirm-documents/${confirmDocumentPk}/accept`, approvalForm)
    .then((res) => res)
    .catch((err) => err.response)
}

export const rejectConfirmDocument = function (confirmDocumentPk, approvalForm) {
  return instance.patch(`/api/confirm-documents/${confirmDocumentPk}/reject`, approvalForm)
    .then((res) => res)
    .catch((err) => err.response)
}

export const getConfirmDocumentContent = function (confirmDocumentContentPk) {
  return instance.get(`/api/confirm-documents/contents/${confirmDocumentContentPk}`)
    .then((res) => res)
    .catch((err) => err)
}