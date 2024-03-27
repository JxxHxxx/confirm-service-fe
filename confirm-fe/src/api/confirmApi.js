import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 3000,
  });

export const getConfirmDocumentOne = function(confirmDocumentPk) {
    return instance.get(`/api/confirm-documents/${confirmDocumentPk}`)
    .then((res) => res.data)
    .catch((err) => err)
}
     