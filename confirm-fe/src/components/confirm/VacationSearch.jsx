import { Fragment } from "react";

export function VacationSearch({ onHandleSearch, onHandleInputValue }) {

    return (
        <Fragment>
            <h2>휴가 조회</h2>
            <input onChange={onHandleInputValue} />
            <button onClick={onHandleSearch}>검색</button>
        </Fragment>
    )
}