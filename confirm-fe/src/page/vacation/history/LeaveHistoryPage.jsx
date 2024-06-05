import { Header } from "../../../components/layout/Header";
import Page from "../../../components/layout/Page";
import VacationSidebar from "../VacationSidebar";
import LeaveHistory from "./LeaveHistory";

export default function LeaveHistoryPage() {

    return (
        <Page
            header={<Header />}
            sidebar={<VacationSidebar />}>
            <LeaveHistory />
        </Page>
    )
}