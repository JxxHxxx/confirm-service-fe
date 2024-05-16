import { Fragment } from "react";
import '../../css/Input.css'
import { IoIosSearch } from "react-icons/io";

export default function Searchbar({ inputProp = {}, onChange, onSubmit, onClickIcon }) {

    const { placeholder = '검색어를 입력해주세요' } = inputProp;

    return <Fragment>
        <form onSubmit={onSubmit} >
            <div className="search">
                <input className="basic-sb"
                    placeholder={placeholder}
                    onChange={onChange}
                />
                <IoIosSearch className="sb-icon"
                    onClick={onClickIcon} />
            </div>
        </form>
    </Fragment>
}