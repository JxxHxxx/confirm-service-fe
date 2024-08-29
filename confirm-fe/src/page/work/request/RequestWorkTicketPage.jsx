import { Header } from "../../../components/layout/Header";
import Page from "../../../components/layout/Page";
import WorkSidebar from "../WorkSidebar";
import RequestWorkTicketContent from "./RequestWorkTicketContent";


export default function RequestWorkTicketPage() {
    return <Page 
    header={<Header />}
    sidebar={<WorkSidebar />}>
        <RequestWorkTicketContent />
    </Page>
}