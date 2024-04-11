import { Fragment, useEffect, useState } from "react";
import { getConfirmDocumentOne } from "../api/confirmApi";
import { VacationSearch } from "../components/confirm/VacationSearch";
import { VacationSearchResult } from "../components/confirm/VacationSearchResult";
import { getVacations } from "../api/vacationApi";


export function Vacation() {
    const [vacationId, setVacationId] = useState(0);
    const [vacations, setVacations] = useState([]);

    const handleInputValue = (event) => {
        const value = event.target.value;
        setVacationId(value);
    }

    const handleSearch =  async () => {
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
            {/* <VacationSearch onHandleSearch={handleSearch} onHandleInputValue={handleInputValue}/> */}
            <VacationSearchResult vacations={vacations} />
        </Fragment>
    )
}