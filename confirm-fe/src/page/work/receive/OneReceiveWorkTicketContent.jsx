import { useEffect, useState } from "react";
import WorkApi from "../../../api/workApi"
import { useParams } from "react-router-dom";
import MainContainer from "../../../components/layout/container/MainContainer";
import Title from "../../document/Title";


export default function OneReceiveWorkTicketContent() {
    const params = useParams();
    console.log('params', params);
    const [oneWork, setOneWork] = useState({
        workTicket : {},
        workDetail : {}
    });

    const fetchOneWorkTicket = async () => {
        try {
            const { data, status } = await WorkApi.getOneWorkTicket(params.workTicketPk);

            if (status === 200) {
                setOneWork(data.data)
            }
        } catch (e) {
            alert(e);
        }
    }

    const {workTicket, workDetail} = oneWork;


    useEffect(() => {
        fetchOneWorkTicket();
    }, [])


    return <MainContainer>
        <div id="oneReceiveWorkTicketContainer" style={{ border: '1px dashed blue', width: '900px', margin: '0px 0px 50px 0px', padding: '20px' }}>
            <Title name={'티켓 :' + workTicket.workTicketId} />
        </div>
    </MainContainer>
}