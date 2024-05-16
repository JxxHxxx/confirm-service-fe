import { Fragment, useEffect, useState } from "react";
import Searchbar from "../../components/input/Searchbar";
import Select from "../../components/select/Select";
import '../../css/Select.css'
import List from './../../components/list/List';
import { searchCompanyMembers } from "../../api/memberApi";

export default function MemberSearch() {
    const [keyword, setKeyword] = useState({
        option: 'memberName',
        value: ''
    });
    const [selectOption, setSelectOption] = useState('사용자 이름을 입력해주세요');

    const handleOnChangeInputValue = (event) => {
        setKeyword({ ...keyword, value: event.target.value });
    }

    const handleOnSubmmit = async (event) => {
        // TODO
        event.preventDefault();
        const searchConditionForm = {
            [keyword.option]: keyword.value
        }
        const response = await searchCompanyMembers(searchConditionForm);
        setSearchMembersResult(response.data);
    }

    const handleOnChangeOption = (event) => {
        setKeyword({...keyword, option : event.currentTarget.value})

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

    const [searchMembersResult, setSearchMembersResult] = useState([]);

    const callApi = async () => {

    }

    useEffect(() => {
        callApi();
    }, [])

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
                onSubmit={handleOnSubmmit}
                onClickIcon={handleOnSubmmit} />
        </div>
        <div>
            <List
                title='직원 조회'
                showCondition={true}
                cn={{ ul: "member-list", li: "item" }}
                listProperty={{
                    items: searchMembersResult,
                    itemKey: searchMembersResult.memberPk,
                    itemValue: 'name',
                    itemContent: (item) => (
                        <Fragment>
                            {item.memberName}/{item.departmentName}
                        </Fragment>
                    )
                }} />
        </div>
    </Fragment>
}