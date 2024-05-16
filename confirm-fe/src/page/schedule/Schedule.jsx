import { Header } from "../../components/layout/Header";
import Page from "../../components/layout/Page";
import MemberSearch from "../member/MemberSearch";
export default function Schedule() {

    return (
        <Page header={<Header />} sidebar={<div>사이드바</div>}>
            <MemberSearch />
        </Page >

    )
}