import { useEffect, useState } from "react";
import { ConfirmSearchResult } from "../components/confirm/ConfirmSearchResult";
import { getConfirmDocumentIncludeApproval } from "../api/confirmApi";
import Page from "./Page";
import ConfirmSidebar from "../layout/ConfirmSidebar";
import { Header } from "./Header";

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
        <Page header={<Header />} sidebar={<ConfirmSidebar />}>
            <ConfirmSearchResult confirms={confirms} />
        </Page>
    )
}