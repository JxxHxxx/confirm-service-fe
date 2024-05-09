import Button from "../../components/button/Button";
import { Header } from "../../components/layout/Header";
import Page from "../../components/layout/Page";
export default function Schedule() {

    const handleOnclickButton = () => {
        alert('버튼 누름!')
    }

    return (
        <Page header={<Header />} sidebar={<div>사이드바</div>}>
            <div>스케줄 페이지</div>
            <Button 
            cn="basic-button"
            name={"테스트 버튼"}
            onClick={handleOnclickButton}/>
            <Button />
        </Page>
    )
}