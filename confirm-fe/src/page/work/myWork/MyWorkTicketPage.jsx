import { Header } from "../../../components/layout/Header";
import Page from "../../../components/layout/Page";
import WorkSidebar from "../WorkSidebar";
import MyWorkTicketContent from "./MyWorkTicketContent";


export default function MyWorkTicketPage() {

    return <Page
        header={<Header />}
        sidebar={<WorkSidebar />}>
        <MyWorkTicketContent />
    </Page>
}