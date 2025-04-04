import { useEffect, useState } from "react";
import MainContainer from "../../../components/layout/container/MainContainer";
import Title from "../../document/Title";
import WorkApi from "../../../api/workApi";
import TableV2 from "../../../components/table/TableV2";

export default function SearchWorkTicketContent() {
    const [searchtickets, setSearchTickets] = useState({
        data : []
    });

    const requestSearchTickets = async () => {

        const params = {
            chargeCompanyId : sessionStorage.getItem('companyId'),
        }

        const {data, status} = await WorkApi.searchWorkTicket(params);
        if(status === 200) {
            setSearchTickets((prev) => ({
                ...prev,
                data : data.data
            }))
        }
    } 

    useEffect(() => {
        requestSearchTickets();
    }, []) 

    return <MainContainer profile='dev'>
        <Title className="basicTitle" name="요청 티켓 조회"/>
        <TableV2 tableProperty={{
            columns : ['123', '456']
        }} />
    </MainContainer>
}