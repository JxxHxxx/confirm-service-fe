import { Fragment } from "react";


export function ConfirmSearchResult({ confirms }) {

    const confirmStatusConst = {
        RAISE: '미결',
        REJECT: '반려',
        ACCEPT: '승인',
        CANCEL: '파기'
    }

    const documentTypeConst = {
        VAC: '휴가'
    }

    const convertConfirmStatus = (confirmStatus) => {
        return confirmStatusConst[confirmStatus] || ''
    }

    const convertDocumentType = (documentType) => {
        return documentTypeConst[documentType] || ''
    }

    const convertDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    return (
        <Fragment>
            <table className="vacation_table">
                <thead>
                    <tr>
                        <td>문서 ID</td>
                        <td>상신 일시</td>
                        <td>문서 유형</td>
                        <td>기안자 부서</td>
                        <td>기안자 ID</td>
                        <td>승인/반려</td>
                    </tr>
                </thead>
                <tbody>
                    {confirms.data && confirms.data.map(confirm => (
                        <tr key={confirm.pk}>
                            <td>{confirm.pk}</td>
                            <td>{convertDateTime(confirm.createTime)}</td>
                            <td>{convertDocumentType(confirm.documentType)}</td>
                            <td>{confirm.departmentId}</td>
                            <td>{confirm.requesterId}</td>
                            <td>{convertConfirmStatus(confirm.confirmStatus)}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </Fragment>
    )
}