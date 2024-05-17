import { Header } from "../../components/layout/Header";
import Page from "../../components/layout/Page";
import ApprovalHistTable from "../confirm/ApprovalHistTable";
export default function Schedule() {

    return (
        <Page header={<Header />} sidebar={<div>사이드바</div>}>
            <ApprovalHistTable />
        </Page >

    )
}