const approveStatusConst = {
    PENDING: '미결',
    REJECT: '반려',
    ACCEPT: '승인'
}

const confirmStatusConst = {
    RAISE: '상신',
    REJECT: '반려',
    ACCEPT: '승인'
}

const documentTypeConst = {
    VAC: '휴가',
    COST:'지출내역서'
}

export const convertApproveStatus = (approveStatus) => {
    return approveStatusConst[approveStatus] || ''
}

export const convertConfirmStatus = (confirmStatus) => {
    return confirmStatusConst[confirmStatus] || ''
}

export const convertDocumentType = (documentType) => {
    return documentTypeConst[documentType] || ''
}