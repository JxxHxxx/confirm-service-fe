import { Header } from "../../../components/layout/Header";
import Page from "../../../components/layout/Page";
import WorkSidebar from "../WorkSidebar";
import OneReceiveWorkTicketContent from "./OneReceiveWorkTicketContent";


export default function OneReceiveWorkTicketPage() {

    return <Page
        header={<Header />}
        sidebar={<WorkSidebar />}>
        <OneReceiveWorkTicketContent />
    </Page>
}