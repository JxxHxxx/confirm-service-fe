import { Header } from "../../../components/layout/Header";
import Page from "../../../components/layout/Page";
import ConfirmSidebar from "../ConfirmSidebar";
import ConfirmDocumentDraftContent from "./ConfirmDocumentDraftContent";


export default function ConfirmDocumentDraftPage() {

    return <Page header={<Header />} sidebar={<ConfirmSidebar />}>
        <ConfirmDocumentDraftContent />
    </Page>
}