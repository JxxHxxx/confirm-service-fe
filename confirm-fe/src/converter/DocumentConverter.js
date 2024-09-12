import { format } from "date-fns"

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
    VAC: '휴가 신청서',
    COST:'지출 내역서',
    WRK: '작업 요청서'
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

export const convertCompletedTime = (completedTime) => {
    return completedTime !== null ? format(completedTime, 'yyyy-MM-dd HH:mm') : '결재 진행중' 
}

export const DocumentConverter = {
    convertApproveStatus,
    convertConfirmStatus,
    convertDocumentType,
    convertCompletedTime,
}