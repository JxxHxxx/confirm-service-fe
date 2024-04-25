const approveStatusConst = {
    PENDING: '미결',
    REJECT: '반려',
    ACCEPT: '승인'
}

const documentTypeConst = {
    VAC: '휴가'
}

export const convertApproveStatus = (approveStatus) => {
    return approveStatusConst[approveStatus] || ''
}

export const convertDocumentType = (documentType) => {
    return documentTypeConst[documentType] || ''
}