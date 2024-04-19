import { useEffect, useState } from "react";
import { ConfirmSearchResult } from "../components/confirm/ConfirmSearchResult";
import { getConfirmDocumentOne } from "../api/confirmApi";

export function Confirm() {
    
    const [confirms, setConfirms] = useState([]);
    
    const getDateToServer = async () => {
        const confirmDocumentResponse = await getConfirmDocumentOne();
        setConfirms(confirmDocumentResponse);
    }

    useEffect(() => {
        getDateToServer();
    }, []);

    return (
        <>
            <h1>Confirm Page</h1>
            <ConfirmSearchResult confirms={confirms}/>
        </>
    )
}