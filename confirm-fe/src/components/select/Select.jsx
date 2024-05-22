import { Fragment } from "react";
import '../../css/Select.css'

export default function Select({ cn = 'basic-sl', options, handleOnChangeOption = () => { } }) {

    return (
        <Fragment>
            <label htmlFor="searchOptions"></label>
            <select className={cn}
                id="searchOptions"
                onChange={handleOnChangeOption}>
                {options}
            </select>
        </Fragment>)
}