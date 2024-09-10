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
    const [renderFlag, setRenderFlag] = useState(0);

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

    // 티켓 정보 하위 버튼 이름 랜더링 및 기능
    const handleWorkTicketButton = async (workTicket) => {
        const { workStatus, workTicketId } = workTicket;

        if (workStatus === 'CREATE') {
            await WorkApi.receiveWorkTicket(workTicketId);
            setRenderFlag((prev) => prev + 1);
            alert('티켓이 접수되었습니다.')
        }
        else if (workStatus === 'RECEIVE') {
            await WorkApi.beginAnalysisWorkTicket(workTicketId);
            alert('티켓 분석을 시작합니다.')
            setRenderFlag((prev) => prev + 1);
        }
        else {
            alert('미구현')
        }
    }

    const analysisContentRenderCondition = () => {
        return workTicket.workStatus === 'CREATE' || workTicket.workStatus === 'RECEIVE' ? false : true
    }

    const { workTicket, workDetail } = oneWork;

    useEffect(() => {
        fetchOneWorkTicket();
    }, [renderFlag])


    return <MainContainer>
        <div id="oneReceiveWorkTicketContainer" style={{ border: '1px dashed blue', width: '900px', margin: '0px 0px 50px 0px', padding: '20px' }}>
            <div id="ticketMetaInformation">
                <Title className="titleTicket" name="티켓 정보" />
                <Button cn="btn_normal"
                    name={WorkConverter.convertReceiveButtonName(workTicket.workStatus)}
                    onClick={() => handleWorkTicketButton(workTicket)} />
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
            <div id="ticketReqInformation" style={{border : '1px solid gray', margin : '10px 0px 10px 0px'}}>
                <Title className="titleTicket" name="요청 정보"/>
                <p style={{fontFamily : 'Maruburi', margin :'0px' , marginBottom : '5px'}}>요청 제목 : {workTicket.requestTitle}</p>
                <p style={{fontFamily : 'Maruburi', margin :'0px'}}>요청 내용 <br /></p>
                <p style={{fontFamily : 'Maruburi', margin :'0px' , fontWeight: 'normal'}}>{workTicket.requestContent}</p>
            </div>
            {analysisContentRenderCondition() &&
                <div id="idanalysisWorkTicket" style={{border : '1px solid gray', margin : '10px 0px 10px 0px'}}>
                    <Title className="titleTicket" name="분석 내용" />
                </div>
            }
        </div>
    </MainContainer>
}