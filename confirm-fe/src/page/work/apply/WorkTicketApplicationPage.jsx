import { Header } from "../../../components/layout/Header";
import Page from "../../../components/layout/Page";
import WorkSidebar from "../WorkSidebar";
import WorkTicketApplicationContent from "./WorkTicketApplicationContent";


export default function WorkTicketApplicationPage() {
    return <Page
        header={<Header />}
        sidebar={<WorkSidebar />}
    >
        <WorkTicketApplicationContent />
    </Page>

}