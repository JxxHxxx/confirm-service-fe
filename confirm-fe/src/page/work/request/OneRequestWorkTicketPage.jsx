import { Header } from "../../../components/layout/Header";
import Page from "../../../components/layout/Page";
import WorkSidebar from "../WorkSidebar";
import OneRequestWorktTicketContent from "./OneRequestWorktTicketContent";

export default function OneRequestWorktTicketPage() {

    return <Page
        header={<Header />}
        sidebar={<WorkSidebar />}>
        <OneRequestWorktTicketContent />
    </Page>
}