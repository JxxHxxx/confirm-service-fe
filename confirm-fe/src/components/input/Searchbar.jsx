import { Fragment } from "react";
import '../../css/Input.css'

export default function Searchbar({ inputProp = {}, onChange, onSubmit }) {

    const { placeholder = '검색어를 입력해주세요' } = inputProp;

    return <Fragment>
        <form>
            <input className="basic-sb"
                placeholder={placeholder}
                onChange={onChange}
                onSubmit={onSubmit} />
        </form>
    </Fragment>
}