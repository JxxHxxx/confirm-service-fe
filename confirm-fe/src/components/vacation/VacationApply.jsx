import { VacationApplyForm } from "./VacationApplyForm";
import VacationSidebar from "../../layout/VacationSidebar";
import { Header } from "../../page/Header";
import Page from "../../page/Page";

export function VacationApply() {

    return (
        <Page
            header={<Header />}
            sidebar={<VacationSidebar />}>
            <VacationApplyForm />
        </Page>
    )
}