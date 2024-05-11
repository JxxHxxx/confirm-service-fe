import { useState } from "react";
import Button from "../../components/button/Button";
import Searchbar from "../../components/input/Searchbar";
import { Header } from "../../components/layout/Header";
import Page from "../../components/layout/Page";
export default function Schedule() {

    const handleOnclickButton = () => {
        alert('버튼 누름!')
    }

    const [ keyword, setKeyword ] = useState();

    const handleOnChangeInputValue = (event) => {
        setKeyword(event.target.value);
    }


    const handleOnSubmmit = (event) => {
        // TODO
        event.preventDefault();
        console.log('occur submit event')
    }

    return (
        <Page header={<Header />} sidebar={<div>사이드바</div>}>
            <div>스케줄 페이지</div>
            <Searchbar onChange={handleOnChangeInputValue}
            onSubmit={handleOnSubmmit}/>
        </Page>
    )
}