import { Fragment } from "react";

export default function ApprovalLineList() {
    return (
        <Fragment>
            {true && <div className="aph_table_ct">
                <table className="aph_table">
                    <thead>
                        <tr className="aph_tr_col">
                            <td>기안</td>
                            <td>검토</td>
                            <td>결정</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="aph_tr_mn">
                            <td>이재헌</td>
                            <td>이검토</td>
                            <td>이결정</td>
                        </tr>
                        <tr className="aph_tr_sub" id="approval_status">
                            <td>상신</td>
                            <td>승인</td>
                            <td>승인</td>
                        </tr>
                        <tr style={{'fontSize': '9px'}} className="aph_tr_sub">
                            <td>2024-06-03 15:30</td>
                            <td>2024-06-03 15:30</td>
                            <td>2024-06-03 15:30</td>
                        </tr>
                    </tbody>
                </table>
            </div>}
        </Fragment>
    )
}