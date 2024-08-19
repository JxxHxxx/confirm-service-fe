import { Header } from "../../../components/layout/Header";
import Page from "../../../components/layout/Page";
import WorkSidebar from "../WorkSidebar";
import WorkRequestContent from "./WorkRequestContent";


export default function WorkRequestPage() {
    return <Page
        header={<Header />}
        sidebar={<WorkSidebar />}
    >
        <WorkRequestContent />
    </Page>

}