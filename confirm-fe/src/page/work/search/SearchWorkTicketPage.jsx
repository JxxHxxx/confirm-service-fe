import { Header } from "../../../components/layout/Header";
import Page from "../../../components/layout/Page";
import WorkSidebar from "../WorkSidebar";
import SearchWorkTicketContent from "./SearchWorkTicketContent";

export default function SearchWorkTicketPage() {

    return <Page
        header={<Header />}
        sidebar={<WorkSidebar />}>
            <SearchWorkTicketContent />
    </Page>
}