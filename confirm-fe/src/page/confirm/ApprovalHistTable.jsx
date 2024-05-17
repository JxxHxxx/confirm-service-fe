import { Fragment } from "react";

export default function ApprovalHistTable({ approvalLines }) {

    return (
        <Fragment>
            <div className="aph_table_ct">
                <table className="aph_table">
                    <thead>
                        <tr className="aph_tr_col">
                            <td>기안</td>
                            <td>검토</td>
                            <td>검토</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="aph_tr_mn">
                            <td>이재헌</td>
                            <td>결재자1</td>
                            <td>결재자2</td>
                        </tr>
                        <tr className="aph_tr_sub"
                            id="approval_status">
                            <td>상신</td>
                            <td>승인</td>
                            <td>승인</td>
                        </tr>
                        <tr className="aph_tr_sub"
                            id="decide_date_time" style={{ fontSize: '11px' }}>
                            <td>05-16 16:02</td>
                            <td>05-16 16:35</td>
                            <td>05-16 17:56</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}