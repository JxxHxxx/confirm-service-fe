export const convertVacationType = (vacation) => {
    return vacationTypeConst[vacation.vacationType] || '그외휴가';
}

export const convertVacationStatus = (vacation) => {
    return vacationStatusConst[vacation.vacationStatus] || '';
}

const vacationTypeConst = {
    MORE_DAY: '유급휴가',
    HALF_MORNING: '유급반차',
    COMMON_VACATION: '공동연차'
}

const vacationStatusConst = {
    CREATE: '생성',
    REQUEST: '상신',
    APPROVED: '승인',
    REJECT: '반려',
    ONGOING: '휴가 중',
    COMPLETED: '휴가 종료',
    NON_REQUIRED: '승인'
}
