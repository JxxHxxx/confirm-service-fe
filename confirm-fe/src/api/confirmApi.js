import createAxiosInstance from './GlobalApiConfiguration';

const instance = createAxiosInstance('http://localhost:8000', true)

export const getConfirmDocumentWithApprovalLines = function (params) {

  return instance.get(`/api/confirm-documents/fetch-approval-lines`, { params })
    .then((res) => res)
    .catch((err) => err)
}

export const getConfirmDocumentsWrittenSelf = function (params) {

  return instance.get(`/api/confirm-documents/written-self`, { params })
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

export const getApprovalPendingDocuments = function () {
  const params = {
    approvalId: sessionStorage.getItem('memberId'),
    approvalStatus: 'PENDING',
    confirmStatus: 'RAISE'
  }

  return instance.get(`/api/confirm-documents/search`, { params })
    .then((res) => res)
    .catch((err) => err)
}

export const searchConfirmDocuments = function (params) {

  return instance.get(`/api/confirm-documents/search`, { params })
    .then((res) => res)
    .catch((err) => err)
}

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

// 결재 문서 양식 조회 API
export const getConfirmDocumentForm = function () {
  const defaultParams = {
    companyId: sessionStorage.getItem('companyId')
  }
  return instance.get(`/api/confirm-document-forms`, { params: defaultParams })
}
// 서버단에서 companyId 조건이 IN 을 타도록 만들어야 함
export const getConfirmDocumentElements = function (confirmDocumentFormId) {
  const defaultParams = {
    companyId: 'COM'
  }
  return instance.get(`/api/confirm-document-forms/${confirmDocumentFormId}/elements`, { params: defaultParams })
    .then((res) => res)
    .catch((err) => err)
}

export const getConfirmDocumentElementsV2 = function (confirmDocumentFormId) {
  const defaultParams = {
    companyId: 'COM,' + sessionStorage.getItem('companyId')
  }
  return instance.get(`/api/v2/confirm-document-forms/${confirmDocumentFormId}/elements`, { params: defaultParams })
    .then((res) => res)
    .catch((err) => err)
}

const raiseConfirmDocument = function (confirmDocumentId) {
  const requestBody = {
    companyId : sessionStorage.getItem('companyId'),
    departmentId : sessionStorage.getItem('departmentId'), 
    requesterId : sessionStorage.getItem('memberId')
  }
  return instance.post(`/api/confirm-documents/${confirmDocumentId}/raise`, requestBody)
    .then((res) => res)
    .catch((err) => alert(err.response.data.message))
}

export const ConfirmApi = {
  getApprovalPendingDocuments,
  searchConfirmDocuments,
  raiseConfirmDocument
}