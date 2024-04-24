import { useEffect, useState } from "react";
import { ConfirmSearchResult } from "../components/confirm/ConfirmSearchResult";
import { getConfirmDocumentIncludeApproval } from "../api/confirmApi";

export function Confirm() {
    
    const [confirms, setConfirms] = useState([]);
    
    const getDateToServer = async () => {
        const confirmDocumentResponse = await getConfirmDocumentIncludeApproval();
        setConfirms(confirmDocumentResponse);
    }

    useEffect(() => {
        getDateToServer();
    }, []);

    return (
        <>
            <ConfirmSearchResult confirms={confirms}/>
        </>
    )
}