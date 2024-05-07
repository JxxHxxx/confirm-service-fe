import { Fragment } from "react";

export default function Table({ cn = {}, title = '', tableProperty = {} }) {
    const { table = '', thr = '', thd = '', tbr = '', tbd = '' } = cn;
    const { columns = () => [], data = () => [], showCondition = false } = tableProperty;

    return (
        <Fragment>
            <h2>{title}</h2>
            <table className={table}>
                <thead>{columns}</thead>
                <tbody>{showCondition && data}</tbody>
            </table>
        </Fragment>
    )
}