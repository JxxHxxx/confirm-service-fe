import { Header } from "../../../components/layout/Header";
import Page from "../../../components/layout/Page";
import WorkSidebar from "../WorkSidebar";
import ReceiveWorkTicketContent from "./ReceiveWorkTicketContent";


export default function ReceiveWorkTicketPage() {

    return <Page
        header={<Header />}
        sidebar={<WorkSidebar />}>
        <ReceiveWorkTicketContent />
    </Page>
}