import { Fragment } from "react";
import '../../css/Input.css'
import { IoIosSearch } from "react-icons/io";

export default function Searchbar({ className = { input: "basic-sb circle" , ioIosSearch: "sb-icon"}, inputProp = {}, onChange, onSubmit }) {

    const { placeholder = '검색어를 입력해주세요' } = inputProp;


    return <Fragment>
        <form onSubmit={onSubmit} >
            <div className="search">
                <input className={className.input}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                <IoIosSearch className={className.ioIosSearch}
                    onClick={onSubmit} />
            </div>
        </form>
    </Fragment>
}