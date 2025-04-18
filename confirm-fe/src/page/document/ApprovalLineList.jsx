import { Fragment, useState, useEffect } from "react";
import { convertApproveStatus } from "../../converter/DocumentConverter";
import { convertMonthTime } from "../../converter/DateTimeConvert";
import ConfirmApi from "../../api/confirmApi";

export default function ApprovalLineList({ confirmDocument }) {
    const [approvalLines, setApprovalLines] = useState([]);

    const handleAmount = async () => {
        const response = await ConfirmApi.getApprovalLines(confirmDocument.confirmDocumentId);
        const orderedApprovalLines = response.data.data.sort((now, next) => (now.approvalOrder - next.approvalOrder))
        setApprovalLines(orderedApprovalLines);
    };

    useEffect(() => {
        handleAmount();
    }, [])
    return (
        <Fragment>
            {approvalLines.length > 0 ?
                <div className="aph_table_ct">
                    <table className="aph_table">
                        <thead>
                            <tr className="aph_tr_col">
                                <td>기안</td>
                                {approvalLines.map((al, index) => {
                                    if (index !== approvalLines.length - 1) {
                                        return <td id={al.approvalLinePk}>검토</td>
                                    } else {
                                        return <td id={al.approvalLinePk}>결정</td>
                                    }
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="aph_tr_mn">
                                <td>{confirmDocument.requesterName}</td>
                                {approvalLines.map(al => <td>{al.approvalName}</td>)}
                            </tr>
                            <tr className="aph_tr_sub"
                                id="approval_status">
                                <td>{"기안"}</td>
                                {approvalLines.map(al => <td>{convertApproveStatus(al.approveStatus)}</td>)}
                            </tr>
                            <tr className="aph_tr_sub"
                                id="decide_date_time" style={{ fontSize: '9px' }}>
                                <td>{convertMonthTime(confirmDocument.createTime)}</td>
                                {approvalLines.map(al => <td>{convertMonthTime(al.approveTime)}</td>)}
                            </tr>
                        </tbody>
                    </table>
                </div>
                : <p style={{
                    fontFamily: 'Maruburi',
                    fontSize : '14px',
                    color: 'gray',
                    textAlign : 'right'
                }}>결재선이 지정되지 않았습니다</p>
            }
        </Fragment>
    )
}