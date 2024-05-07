import { Header } from "../../components/layout/Header";
import Page from "../Page";

export default function Schedule() {
    return (
        <Page header={<Header />} sidebar={<div>사이드바</div>}>
            <div>스케줄 페이지</div>
        </Page>
    )
}