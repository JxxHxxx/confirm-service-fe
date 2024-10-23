import createAxiosInstance from './GlobalApiConfiguration';

const instance = createAxiosInstance('http://localhost:8000', true)

const getConfirmDocumentsWrittenSelf = function (params) {

  return instance.get(`/api/confirm-documents/written-self`, { params })
    .then((res) => res)
    .catch((err) => err)
}

const getDepartmentConfirmDocuments = function () {
  const params = {
    companyId: sessionStorage.getItem('companyId'),
    departmentId: sessionStorage.getItem('departmentId')
  }

  return instance.get(`/api/confirm-documents/search-my-department`, { params })
    .then((res) => res)
    .catch((err) => err)
}

const getApprovalPendingDocuments = function () {
  const params = {
    approvalId: sessionStorage.getItem('memberId'),
    approvalStatus: 'PENDING',
    confirmStatus: 'RAISE'
  }

  return instance.get(`/api/confirm-documents/search`, { params })
    .then((res) => res)
    .catch((err) => err)
}

const searchConfirmDocuments = function (params) {

  return instance.get(`/api/confirm-documents/search`, { params })
    .then((res) => res)
    .catch((err) => err)
}

const getApprovalLines = function (confirmDocumentId) {
  const params = {
    companyId : sessionStorage.getItem('companyId')
  }
  return instance.get(`/api/confirm-documents/${confirmDocumentId}/approval-lines`, {params})
    .then((res) => res)
    .catch((err) => err)
}

const postApprovalLines = function (confirmDocumentId, approvalLineForm) {

  return instance.post(`/api/confirm-documents/${confirmDocumentId}/approval-lines`, approvalLineForm)
    .then((res) => res)
    .catch((err) => err)
}

const acceptConfirmDocument = function (confirmDocumentPk, approvalForm) {
  return instance.patch(`/api/confirm-documents/${confirmDocumentPk}/accept`, approvalForm)
    .then((res) => res)
    .catch((err) => err.response)
}

const rejectConfirmDocument = function (confirmDocumentPk, approvalForm) {
  return instance.patch(`/api/confirm-documents/${confirmDocumentPk}/reject`, approvalForm)
    .then((res) => res)
    .catch((err) => err.response)
}

const getConfirmDocumentContent = function (confirmDocumentContentPk) {
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

const getConfirmDocumentElements = function (confirmDocumentFormId) {
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

const ConfirmApi = {
  getConfirmDocumentsWrittenSelf,
  getDepartmentConfirmDocuments,
  getApprovalPendingDocuments,
  searchConfirmDocuments,
  getApprovalLines,
  postApprovalLines,
  raiseConfirmDocument,
  acceptConfirmDocument,
  rejectConfirmDocument,
  getConfirmDocumentContent,
  getConfirmDocumentElements
}

export default ConfirmApi;