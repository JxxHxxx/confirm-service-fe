import { Fragment, useEffect, useState } from "react";
import { getConfirmDocumentIncludeApproval } from "../api/confirmApi";
import { VacationSearchResult } from "../components/vacation/VacationSearchResult";
import { getVacations } from "../api/vacationApi";
import '../css/layout/Grid.css';


export function Vacation() {
    const [vacationId, setVacationId] = useState(0);
    const [vacations, setVacations] = useState([]);

    const handleInputValue = (event) => {
        const value = event.target.value;
        setVacationId(value);
    }

    const handleSearch = async () => {
        const findConfirmDocument = await getConfirmDocumentIncludeApproval(vacationId);
        setVacations(findConfirmDocument);
    }

    const handleVacations = async () => {
        const findVacations = await getVacations();
        setVacations(findVacations);
    }

    useEffect(() => {
        handleVacations();
    }, [])

    return (
        <Fragment>
            <VacationSearchResult vacations={vacations} setVacations={setVacations} />
        </Fragment>
    )
}