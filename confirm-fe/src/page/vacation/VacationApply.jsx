import { VacationApplyForm } from "./VacationApplyForm";
import VacationSidebar from "./VacationSidebar";
import { Header } from "../../components/layout/Header";
import Page from '../../components/layout/Page';

export function VacationApply() {

    return (
        <Page
            header={<Header />}
            sidebar={<VacationSidebar />}>
            <VacationApplyForm />
        </Page>
    )
}