import { Fragment, useEffect } from "react";


export function ConfirmSearchList ({ confirmDocument }) {

    return (
        <Fragment>
            {confirmDocument && (
                <table>
                    <tr>
                        <td>{confirmDocument.data.pk}</td>
                        <td>{confirmDocument.data.confirmDocumentId}</td>
                        <td>{confirmDocument.data.confirmStatus}</td>
                        <td>{confirmDocument.data.requesterId}</td>
                    </tr>
                </table>
            )}
        </Fragment>
    )
} 