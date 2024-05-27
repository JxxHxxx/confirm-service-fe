import { Fragment, useState, useEffect } from "react";
import { convertApproveStatus, convertConfirmStatus } from "../../converter/DocumentConverter";
import { convertDateTime, convertMonthTime } from "../../converter/DateTimeConvert";
import { getApprovalLines } from "../../api/confirmApi";


export default function ApprovalHistTable({ confirmDocument }) {
    const [approvalLines, setApprovalLines] = useState([]);

    const handleAmount = async () => {
        const response = await getApprovalLines(confirmDocument.confirmDocumentId);
        const orderedApprovalLines = response.data.data.sort((now, next) => (now.approvalOrder - next.approvalOrder))
        setApprovalLines(orderedApprovalLines);
    };

    useEffect(() => {
        handleAmount();
    }, [])

    return (
        <Fragment>
            {approvalLines.length > 0 && <div className="aph_table_ct">
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
                            <td>{convertConfirmStatus(confirmDocument.confirmStatus)}</td>
                            {approvalLines.map(al => <td>{convertApproveStatus(al.approveStatus)}</td>)}
                        </tr>
                        <tr className="aph_tr_sub"
                            id="decide_date_time" style={{ fontSize: '9px' }}>
                            <td>{convertMonthTime(confirmDocument.createTime)}</td>
                            {approvalLines.map(al => <td>{convertMonthTime(al.approveTime)}</td>)}
                        </tr>
                    </tbody>
                </table>
            </div>}

        </Fragment>
    )
}