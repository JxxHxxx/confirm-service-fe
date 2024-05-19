import { Fragment, useState } from "react";
import Searchbar from "../../components/input/Searchbar";
import Select from "../../components/select/Select";

export default function MemberSearchV2({ keyword, setKeyword, onChange, onSubmit }) {
    const [selectOption, setSelectOption] = useState('사용자 이름을 입력해주세요');

    const handleOnChangeOption = (event) => {
        setKeyword({ ...keyword, option: event.currentTarget.value })

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
            case 'departmentName':
                selectOption = '부서 명을 입력해주세요'
                break;
        }
        setSelectOption(selectOption);
    }

    return (<Fragment>
        <div style={{ display: 'flex' }}>
            <Select
                cn="basic-sl"
                options={
                    <Fragment>
                        <option value="memberName">이름</option>
                        <option value="memberId">사번</option>
                        <option value="departmentId">부서 ID</option>
                        <option value="departmentName">부서 명</option>
                    </Fragment>}
                handleOnChangeOption={handleOnChangeOption}
            />
            <Searchbar
                inputProp={{ placeholder: selectOption }}
                onChange={onChange}
                onSubmit={onSubmit} />
        </div>
    </Fragment>)
}