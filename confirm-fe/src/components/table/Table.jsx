import { Fragment } from "react";

export default function Table({ cn = {}, title = '', tableProperty = {}}) {
    const { table = 'vacation_table', thr = '', thd = '', tbr = '', tbd = '' } = cn;
    const { columns = [], data, showCondition = true } = tableProperty;

    return (
        <Fragment>
            <p style={{fontSize : '22px'}}>{title}</p>
            <table className={table}>
                <thead>
                    <tr key={"confirm-table-columns"}>
                        {columns.map((col) => (<td>{col}</td>))}
                    </tr>
                </thead>
                <tbody>{showCondition && data}</tbody>
            </table>
        </Fragment>
    )
}