export const APPROVE_LEAVE_REQUEST = 'APPROVE_LEAVE_REQUEST';

interface ApproveLeaveRequestAction {
  type: typeof APPROVE_LEAVE_REQUEST;
  payload: number;
}

export type LeaveActionTypes = ApproveLeaveRequestAction;

export const approveLeaveRequest = (days: number): LeaveActionTypes => ({
  type: APPROVE_LEAVE_REQUEST,
  payload: days,
});
