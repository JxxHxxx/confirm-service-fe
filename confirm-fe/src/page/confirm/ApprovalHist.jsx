import { Fragment, useEffect, useState } from "react";
import ApprovalHistTable from "./ApprovalHistTable";
import { getApprovalLines } from "../../api/confirmApi";

export default function ApprovalHist() {
    const [approvalLines, setApprovalLines] = useState([]);

    const handleAmount = async () => {
        const response = await getApprovalLines('VACSPY6');
        console.log('response', response);
    };

    useEffect(() => {
        handleAmount();
    })

    return <Fragment>
        <ApprovalHistTable approvalLines={approvalLines} />
    </Fragment>
}