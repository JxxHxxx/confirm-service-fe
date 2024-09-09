import { useEffect, useState } from "react";
import WorkApi from "../../../api/workApi"
import { useParams } from "react-router-dom";
import MainContainer from "../../../components/layout/container/MainContainer";
import Title from "../../document/Title";
import Table from "../../../components/table/Table";
import WorkConverter from "../../../converter/work/WorkConverter";
import Button from "../../../components/button/Button";


export default function OneReceiveWorkTicketContent() {
    const params = useParams();
    console.log('params', params);
    const [oneWork, setOneWork] = useState({
        workTicket: {
            workTicketId: '',
            workRequester: {
                name: ''
            },
        },
        workDetail: {
            receiverName: ''
        }
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

    const { workTicket, workDetail } = oneWork;

    useEffect(() => {
        fetchOneWorkTicket();
    }, [])


    return <MainContainer>
        <div id="oneReceiveWorkTicketContainer" style={{ border: '1px dashed blue', width: '900px', margin: '0px 0px 50px 0px', padding: '20px' }}>
            <Title name={'티켓 :' + workTicket.workTicketId} />
            <Table tableProperty={
                {
                    columns: ['티켓 식별자', '처리 단계', '요청자', '담당 부서', '접수자'],
                    data: <tr>
                        <td value={workTicket.workTicketId}>{workTicket.workTicketPk}</td>
                        <td>{WorkConverter.convertWorkStatus(workTicket.workStatus)}</td>
                        <td>{workTicket.workRequester.name}</td>
                        <td>{workTicket.chargeDepartmentId}</td>
                        <td>{workDetail && workDetail.receiverName}</td>
                    </tr>
                }
            } />
            <Button cn="btn_normal"
                name={WorkConverter.convertReceiveButtonName(workTicket.workStatus)} />
        </div>
    </MainContainer>
}