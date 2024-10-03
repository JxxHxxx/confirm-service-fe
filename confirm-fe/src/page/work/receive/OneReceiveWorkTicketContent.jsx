import { useEffect, useState } from "react";
import WorkApi from "../../../api/workApi"
import { useParams } from "react-router-dom";
import MainContainer from "../../../components/layout/container/MainContainer";
import Title from "../../document/Title";
import WorkConverter from "../../../converter/work/WorkConverter";
import Button from "../../../components/button/Button";
import { format } from "date-fns";

export default function OneReceiveWorkTicketContent() {
    const params = useParams();
    const [renderFlag, setRenderFlag] = useState(0);
    const [valid, setValid] = useState({
        workDetailAnalyze: true,
        workDetailPlan: true
    });

    const [oneWork, setOneWork] = useState({
        workTicket: {
            workTicketId: '',
            workRequester: {
                name: ''
            },
        },
        workDetail: {
            analyzeContent: '',
            receiverName: '',
        },
        rejectReason: '',
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

    const handleWorkTicketRejectFromRecevier = async (workTicket) => {
        const { workTicketId } = workTicket;

        const { status } = WorkApi.rejectTicketFromReceiver(workTicketId, oneWork.rejectReason);
        console.log('status', status);
        if (status === 200) {
            setRenderFlag((prev) => prev + 1);
            alert('작업 티켓이 반려되었습니다.')
        }
    }

    // 티켓 정보 하위 버튼 이름 랜더링 및 기능
    const handleWorkTicketButton = async (workTicket) => {
        const { workStatus, workTicketId } = workTicket;

        if (workStatus === 'CREATE') {
            await WorkApi.receiveWorkTicket(workTicketId);
            setRenderFlag((prev) => prev + 1);
            alert('티켓이 접수되었습니다.');
        }
        else if (workStatus === 'RECEIVE') {
            const { data, status } = await WorkApi.beginAnalysisWorkTicket(workTicketId);

            if (status === 200) {
                setRenderFlag((prev) => prev + 1);
                alert('티켓 분석을 시작합니다.');
            }
            else {
                alert(data.message);
            }

        }
        else if (workStatus === 'ANALYZE_BEGIN') {
            const { data, status } = await WorkApi.completeAnalysisWorkTicket(workTicketId, workDetail.analyzeContent);
            if (status === 200) {
                setRenderFlag((prev) => prev + 1);
                alert('티켓 분석을 완료합니다.');
            }
            else {
                alert(data.message);
                setValid((prev) => ({
                    ...prev,
                    workDetailAnalyze: false
                }))
            }

        }
        else if (workStatus === 'ANALYZE_COMPLETE') {
            await WorkApi.beginPlanningWorkTicket(workTicketId);
            setRenderFlag((prev) => prev + 1);
            alert('작업 계획을 시작합니다.');
        }
        else if (workStatus === 'MAKE_PLAN_BEGIN') {
            const { data, status } = await WorkApi.completePlanningWorkTicket(workTicketId, workDetail.workPlanContent);
            if (status === 200) {
                setRenderFlag((prev) => prev + 1);
                alert('작업 계획을 완료합니다.');
            }
            else {
                alert(data.message);
                setValid((prev) => ({
                    ...prev,
                    workDetailPlan: false
                }))
            }
        }
        else if (workStatus === 'MAKE_PLAN_COMPLETE') {
            await WorkApi.requestConfirmWorkTicket(workTicketId);
            setRenderFlag((prev) => prev + 1);
            alert('요청 부서에 결재를 요청합니다.');
        }
        else if (workStatus === 'REQUEST_CONFIRM') {
            alert('결재 진행중입니다. 승인을 기다려주세요')
        }
        else if (workStatus === 'ACCEPT') {
            const {status, data} = await WorkApi.beginWork(workTicketId);
            if (status === 200) {
                alert('작업을 시작합니다.')
                setRenderFlag((prev) => prev + 1);
            }
            else {
                alert(data.message);
            }

        }
        else if (workStatus === 'WORKING') {
            const {status, data} = await WorkApi.completeWork(workTicketId);
            if (status === 200) {
                alert('작업을 종료합니다.')
                setRenderFlag((prev) => prev + 1);
            }
            else {
                alert(data.message);
            }
        }
        else if (workStatus === 'DONE') {
            alert('이미 종료 처리된 티켓입니다.')
        }
        else {
            alert('서비스 오류입니다. 관리자에게 문의하세요.')
        }
    }

    const analysisContentRenderCondition = () => {
        return !['CREATE', 'RECEIVE'].includes(workTicket.workStatus)
    }

    const planContentRenderCondition = () => {
        return ![ 'CREATE', 'RECEIVE', 'ANALYZE_BEGIN', 'ANALYZE_COMPLETE'].includes(workTicket.workStatus);
    }

    const rejectButtonRenderCondition = () => {
        return ['RECEIVE', 'ANALYZE_BEGIN', 'ANALYZE_COMPLETE'].includes(workTicket.workStatus)
    }

    const handleOnChangeAnalyzeContent = (event) => {
        setOneWork((prev) => ({
            ...prev,
            workDetail: {
                analyzeContent: event.target.value
            }
        }))
        setValid((prev) => ({
            ...prev,
            workDetailAnalyze: true
        }))
    }

    const handleOnChangePlanContent = (event) => {
        setOneWork((prev) => ({
            ...prev,
            workDetail: {
                workPlanContent: event.target.value
            }
        }))

        setValid((prev) => ({
            ...prev,
            workDetailAnalyze: true,
        }))
    }

    const { workTicket, workDetail } = oneWork;

    // 티켓 정보 접기/펴기 상태
    const [reqContent, setReqContent] = useState(true);
    // 티켓 정보 접기/펴기 상태
    const [analContent, setAnalContent] = useState(true);
    const [planContent, setPlanContent] = useState(true);

    useEffect(() => {
        fetchOneWorkTicket();
    }, [renderFlag])


    return <MainContainer>
        <div id="oneReceiveWorkTicketContainer" style={{ border: '1px dashed blue', width: '900px', margin: '0px 0px 50px 0px', padding: '20px' }}>
            <div id="ticketMetaInformation" style={{ border: '1px solid gray', margin: '10px 0px 10px 0px', padding: '5px' }}>
                {/* 요청 내용 컴포넌트 */}
                <Title className="titleLeft" name="티켓 정보" />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button cn="btnTicket"
                        name={WorkConverter.convertReceiveButtonName(workTicket.workStatus)}
                        onClick={() => handleWorkTicketButton(workTicket)} />
                    {/* TODO 버튼을 누르면 모달창 뜨고, 반려 사유를 입력할 수 있도록 변경해야함 */}
                    {rejectButtonRenderCondition() &&
                        <Button cn="btnTicket" name={'티켓 반려'}
                            onClick={() => handleWorkTicketRejectFromRecevier(workTicket)} />
                    }
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
            <div>
                <Button cn="btn_normal" name={reqContent ? "요청 정보 접기" : "요청 정보 열기"}
                    onClick={() => setReqContent(!reqContent)} />
            </div>
            {reqContent &&
                <div id="ticketReqInformation" style={{ border: '1px solid gray', margin: '10px 0px 10px 0px', padding: '5px' }}>
                    <Title className="titleLeft" name="요청 정보" />
                    <p style={{ fontFamily: 'Maruburi', margin: '0px', marginBottom: '5px' }}>요청 제목 : {workTicket.requestTitle}</p>
                    <p style={{ fontFamily: 'Maruburi', margin: '0px' }}>요청 내용 <br /></p>
                    <div>
                        <textarea value={workTicket.requestContent} readOnly={true}
                            style={{
                                fontFamily: 'Maruburi',
                                width: '882px',
                                height: '200px',
                                margin: '0px',
                                fontWeight: 'normal',
                                resize: 'none'
                            }}>
                        </textarea>
                    </div>
                </div>
            }
            {/* 분석 내용 컴포넌트 */}
            {analysisContentRenderCondition() &&
                <div>
                    <Button cn="btn_normal" name={analContent ? "분석 내용 접기" : "분석 내용 열기"}
                        onClick={() => setAnalContent(!analContent)} />
                </div>}
            {(analContent && analysisContentRenderCondition()) &&
                <div id="workDetailAnalysisContent" style={{
                    border: valid.workDetailAnalyze ? '1px solid gray' : '1px solid red',
                    margin: '10px 0px 10px 0px',
                    padding: '5px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Title className="titleLeft" name="티켓 분석 내용" />
                        <p style={{
                            fontFamily: 'Maruburi',
                            fontWeight: 'normal',
                            margin: '0px'
                        }}>
                            {workDetail.analyzeCompletedTime && '완료 시간 : ' + format(workDetail.analyzeCompletedTime, 'yyyy-MM-dd HH:mm:ss')}
                        </p>
                    </div>
                    <textarea style={{
                        fontFamily: 'Maruburi',
                        width: '882px',
                        height: '200px',
                        margin: '0px',
                        fontWeight: 'normal',
                        resize: 'none'
                    }}
                        value={workDetail.analyzeContent}
                        onChange={(event) => handleOnChangeAnalyzeContent(event)}
                        readOnly={workTicket.workStatus === 'ANALYZE_BEGIN' ? false : true}
                    >
                    </textarea>
                </div>
            }
            {/* 계획 내용 컴포넌트 */}
            {planContentRenderCondition() &&
                <div>
                    <Button cn="btn_normal" name={planContent ? "계획 내용 접기" : "계획 내용 열기"}
                        onClick={() => setPlanContent(!planContent)} />
                </div>
            }
            {(planContent && planContentRenderCondition()) &&
                <div id="workDetailPlanContent" style={{
                    border: valid.workDetailPlan ? '1px solid gray' : '1px solid red',
                    margin: '10px 0px 10px 0px',
                    padding: '5px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Title className="titleLeft" name="작업 계획 내용" />
                        <p style={{
                            fontFamily: 'Maruburi',
                            fontWeight: 'normal',
                            margin: '0px'
                        }}>
                            {workDetail.workPlanCompletedTime && '완료 시간 : ' + format(workDetail.workPlanCompletedTime, 'yyyy-MM-dd HH:mm:ss')}
                        </p>
                    </div>
                    <textarea style={{
                        fontFamily: 'Maruburi',
                        width: '882px',
                        height: '200px',
                        margin: '0px',
                        fontWeight: 'normal',
                        resize: 'none'
                    }}
                        value={workDetail.workPlanContent}
                        onChange={(event) => handleOnChangePlanContent(event)}
                        readOnly={workTicket.workStatus === 'MAKE_PLAN_BEGIN' ? false : true}
                    >
                    </textarea>
                </div>
            }
        </div>
    </MainContainer>
}