export class ApplyVacationTransfer {
    constructor(
        vacationType = '',
        leaveDeduct = 'DEDUCT',
        vacationDuration = {},
        reason = '',
        delegator = { delegatorId: '', delegatorName : ''}) {
        this.requesterId = sessionStorage.getItem('memberId');
        this.requesterName = sessionStorage.getItem('name');
        this.departmentId = sessionStorage.getItem('departmentId');
        this.departmentName = sessionStorage.getItem('departmentName');

        this.vacationType = vacationType;
        this.leaveDeduct = leaveDeduct;
        this.requestVacationDurations = [
            {
                startDateTime: vacationDuration.startDateTime,
                endDateTime: vacationDuration.endDateTime
            }
        ],
        this.title = '휴가신청서';
        this.reason = reason;
        this.delegatorId = delegator.delegatorId;
        this.delegatorName = delegator.delegatorName;
    }
}