import { Fragment, useState } from "react";
import Searchbar from "../../components/input/Searchbar";
import Select from "../../components/select/Select";
import '../../css/Select.css'

export default function MemberSearch() {
    const [keyword, setKeyword] = useState();
    const [selectOption, setSelectOption] = useState('사용자 이름을 입력해주세요');

    const handleOnChangeInputValue = (event) => {
        setKeyword(event.target.value);
    }

    const handleOnSubmmit = (event) => {
        // TODO
        event.preventDefault();
        console.log('occur submit event')
    }

    const handleOnChangeOption = (event) => {
        let selectOption;

        switch (event.currentTarget.value) {
            case 'memberName':
                selectOption = '사용자 이름을 입력해주세요'
                break;
            case 'memberId':
                selectOption = '사용자 사번을 입력해주세요'
                break;
            case 'departmentId':
                selectOption = '부서 코드를 입력해주세요'
                break;
        }
        setSelectOption(selectOption);
    }

    return <Fragment>
        <div style={{ display: 'flex' }}>
            <Select
                cn="basic-sl"
                options={
                    <Fragment>
                        <option value="memberName">이름</option>
                        <option value="memberId">사번</option>
                        <option value="departmentId">부서 ID</option>
                    </Fragment>}
                handleOnChangeOption={handleOnChangeOption}
            />
            <Searchbar
                inputProp={{ placeholder: selectOption }}
                onChange={handleOnChangeInputValue}
                onSubmit={handleOnSubmmit} />
        </div>
    </Fragment>
}