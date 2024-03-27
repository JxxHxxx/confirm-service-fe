import { Fragment } from "react";

export function ConfirmSearch({ onHandleSearch, onHandleInputValue }) {

    return (
        <Fragment>
            <h2>search vacation</h2>
            <input onChange={onHandleInputValue} />
            <button onClick={onHandleSearch}>검색</button>
        </Fragment>
    )
}