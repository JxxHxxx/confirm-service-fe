import { Fragment, useState } from "react";
import { getConfirmDocumentOne } from "../api/confirmApi";
import { ConfirmSearch } from "../components/confirm/ConfirmSearch";
import { ConfirmSearchList } from "../components/confirm/ConfirmSearchList";


export function Confirm() {
    const [confirmDocumentId, setConfirmDocumentId] = useState(0);
    const [confirmDocument, setConfirmDocument] = useState();

    const handleInputValue = (event) => {
        const value = event.target.value;
        setConfirmDocumentId(value);
    }

    const handleSearch =  async () => {
        const findConfirmDocument = await getConfirmDocumentOne(confirmDocumentId);
        setConfirmDocument(findConfirmDocument);
    }

    return (
        <Fragment>
            <ConfirmSearch onHandleSearch={handleSearch} onHandleInputValue={handleInputValue}/>
            <ConfirmSearchList confirmDocument={confirmDocument} />
        </Fragment>
    )
}