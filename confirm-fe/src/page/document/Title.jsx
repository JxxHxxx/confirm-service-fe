import { Fragment } from "react";

export default function Title({name = ''}) {

    return (
        <Fragment>
            <h3 style={{'textAlign':'center'}}>{name}</h3>
        </Fragment>
    )
}