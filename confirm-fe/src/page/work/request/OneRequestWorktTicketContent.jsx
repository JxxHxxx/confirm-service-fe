import { useState } from "react";
import Button from "../../../components/button/Button";
import MainContainer from "../../../components/layout/container/MainContainer";
import WorkConverter from "../../../converter/work/WorkConverter";
import Title from "../../document/Title";


export default function OneRequestWorktTicketContent() {
    const [oneWork, setOneWork] = useState({
        workTicket: {
            workStatus: '',
            workRequester: {
                name: ''
            },
        },

        workDetail : {
            
        }
    });

    const {workTicket, workDetail} = oneWork;

    return <MainContainer>
        <div id="oneRequestWorkTicketContainer"
            style={{ border: '1px dashed blue', width: '900px', margin: '0px 0px 50px 0px', padding: '20px' }}>
            <div id="ticketMetaInformation"
                style={{ border: '1px solid gray', margin: '10px 0px 10px 0px', padding: '5px' }}>
                <Title className="titleLeft" name="티켓 정보" />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button cn="btnTicket"
                        name={WorkConverter.convertReceiveButtonName(workTicket.workStatus)}
                    />
                </div>
                <div style={{ marginBottom: '5px' }}></div>
                <table style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <td style={{ width: '200px' }}>티켓 식별자</td>
                            <td style={{ width: '150px' }}>처리 단계</td>
                            <td style={{ width: '150px' }}>요청자</td>
                            <td style={{ width: '250px' }}>담담 부서</td>
                            <td style={{ width: '150px' }}>접수자</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ textAlign: 'center', fontWeight: 'normal' }}>
                            <td value={workTicket.workTicketId}>{workTicket.workTicketPk}</td>
                            <td>{WorkConverter.convertWorkStatus(workTicket.workStatus)}</td>
                            <td>{workTicket.workRequester.name}</td>
                            <td>{workTicket.chargeDepartmentId}</td>
                            <td>{workDetail && workDetail.receiverName}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </MainContainer>
}