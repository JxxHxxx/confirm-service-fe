import { useEffect, useState } from "react";
import { VacationSearchResult } from "./VacationSearchResult";
import { getVacations } from "../../api/vacationApi";
import VacationSidebar from "./VacationSidebar";
import { Header } from "../../components/layout/Header";
import Page from '../../components/layout/Page';

export function Vacation() {
    const [vacations, setVacations] = useState([]);

    const handleVacations = async () => {
        const findVacations = await getVacations();
        setVacations(findVacations);
    }

    useEffect(() => {
        handleVacations();
    }, [])

    return (
        <Page
            header={<Header />}
            sidebar={<VacationSidebar />}>
            <VacationSearchResult vacations={vacations} setVacations={setVacations} />
        </Page>
    )
}