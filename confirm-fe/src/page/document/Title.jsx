import { Fragment } from "react";

export default function Title({
    name = '',
    className = 'titlt_b',
    desc = ''
}) {

    return (
        <Fragment>
            <p className={className} title={desc}>{name}</p>
        </Fragment>
    )
}