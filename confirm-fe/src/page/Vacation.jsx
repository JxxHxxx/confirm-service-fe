import { Fragment, useEffect, useState } from "react";
import { getConfirmDocumentOne } from "../api/confirmApi";
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
        const findConfirmDocument = await getConfirmDocumentOne(vacationId);
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