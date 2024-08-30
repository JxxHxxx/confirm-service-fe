import { Fragment } from "react";

export default function Title({
    name = '',
    className = 'titlt_b'
}) {

    return (
        <Fragment>
            <p className={className}>{name}</p>
        </Fragment>
    )
}