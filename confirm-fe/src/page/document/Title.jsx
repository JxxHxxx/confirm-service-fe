import { Fragment } from "react";

export default function Title({
    name = '',
    className = 'titlt_b'
}) {

    return (
        <Fragment>
            <h3 className={className}>{name}</h3>
        </Fragment>
    )
}