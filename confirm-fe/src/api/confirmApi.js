import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000,
});

export const getConfirmDocumentOne = function () {
  const params = {
    approvalId: sessionStorage.getItem('memberId')
  }

  return instance.get(`/api/confirm-documents/approval`, { params })
    .then((res) => res.data)
    .catch((err) => err)
}

export const postApprovalLines = function (confirmDocumentId, approvalLineForm) {

  return instance.post(`/api/confirm-documents/${confirmDocumentId}/approval-lines`, approvalLineForm)
    .then((res) => res)
    .catch((err) => err)
}