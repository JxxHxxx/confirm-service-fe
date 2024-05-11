import { Fragment } from "react";
import '../../css/Input.css'

export default function Searchbar({ onChange, onSubmit }) {

    return <Fragment>
        <form>
            <input className="basic-sb"
                onChange={onChange}
                onSubmit={onSubmit} />
        </form>
    </Fragment>
}