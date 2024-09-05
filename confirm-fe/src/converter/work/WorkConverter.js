
const workStatusEnum = {
    CREATE : '티켓 생성',
    RECEIVE : '티켓 접수',
    ANALYZE_BEGIN : '내용 분석 시작',
    ANALYZE_COMPLETE : '내용 분석 완료',
    MAKE_PLAN_BEGIN : '계획 수립 시작',
    MAKE_PLAN_COMPLETE : '계획 수립 완료',
    REQUEST_CONFIRM : '결재 요청',
    ACCEPT : '요청 부서 승인',
    REJECT_FROM_REQUESTER : '요청 부서 반려',
    REJECT_FROM_CHARGE : '담당 부서 반려',
    WORKING : '작업 진행중',
    DONE : '작업 완료',
    DELETE : '티켓 삭제'
}

const convertWorkStatus = (workStatus) => {
    return workStatusEnum[workStatus] || ''
}

const WorkConverter = {
    convertWorkStatus
}


export default WorkConverter;