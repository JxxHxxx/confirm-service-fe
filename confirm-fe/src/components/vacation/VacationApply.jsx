import { Fragment } from "react";
import { VacationApplyForm } from "./VacationApplyForm";
import VacationSidebar from "../../layout/VacationSidebar";

export function VacationApply() {

    return (
        <Fragment>
            <VacationSidebar>
                <VacationApplyForm />
            </VacationSidebar>
        </Fragment>
    )
}