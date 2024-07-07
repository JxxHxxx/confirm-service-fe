import { Fragment } from "react";
import Searchbar from "../../components/input/Searchbar";


export default function DelegatorSearch({ onChange = () => { }, onSubmit = () => { } }) {

    return (
        <Fragment>
            <p style={{ 'fontSize': '13px', 'color': 'gray' , 'marginBottom' : '0px'}}>직무 대행자를 선택해주세요</p>
            <Searchbar
                inputProp={{ 'placeholder': '사용자 이름을 입력해주세요' }}
                onChange={onChange}
                onSubmit={onSubmit}
            />
        </Fragment>
    )
}