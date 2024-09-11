import { Header } from "../../../components/layout/Header";
import Page from "../../../components/layout/Page";
import ConfirmSidebar from "../ConfirmSidebar";
import TemporaryConfirmDocumentContent from "./TemporaryConfirmDocumentContent";


export default function TemporaryConfirmDocumentPage() {

    return <Page header={<Header />} sidebar={<ConfirmSidebar />}>
        <TemporaryConfirmDocumentContent />
    </Page>
}