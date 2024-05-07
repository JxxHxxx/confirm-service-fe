import { VacationApplyForm } from "./VacationApplyForm";
import VacationSidebar from "../../layout/VacationSidebar";
import { Header } from "../../components/layout/Header";
import Page from "../Page";

export function VacationApply() {

    return (
        <Page
            header={<Header />}
            sidebar={<VacationSidebar />}>
            <VacationApplyForm />
        </Page>
    )
}