import { useEffect, useState } from "react";
import { ConfirmSearchResult } from "./ConfirmSearchResult";
import { getConfirmDocumentIncludeApproval } from "../../api/confirmApi";
import Page from "../../components/layout/Page";
import ConfirmSidebar from "./ConfirmSidebar";
import { Header } from "../../components/layout/Header";

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