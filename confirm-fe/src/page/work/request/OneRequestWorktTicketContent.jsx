import { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import MainContainer from "../../../components/layout/container/MainContainer";
import WorkConverter from "../../../converter/work/WorkConverter";
import Title from "../../document/Title";
import WorkApi from "../../../api/workApi";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";


export default function OneRequestWorktTicketContent() {
    const location = useLocation();
    const [contentPresent, setContentPresent] = useState({
        reqContent: true,
        analContent: true,
        planContent: true

    });

    const [oneWork, setOneWork] = useState({
        workTicket: {
            workStatus: '',
            workRequester: {
                name: ''
            },
        },

        workDetail: {

        }
    });

    const fetchOneWorkTicket = async () => {
        try {
            const { data, status } = await WorkApi.getOneWorkTicket(location.state.pk);

            if (status === 200) {
                setOneWork(data.data)
            }
        } catch (e) {
            alert(e);
        }
    }

    const analysisContentRenderCondition = () => {
        return !['CREATE', 'RECEIVE'].includes(workTicket.workStatus)
    }

    const planContentRenderCondition = () => {
        return !['CREATE', 'RECEIVE', 'ANALYZE_BEGIN', 'ANALYZE_COMPLETE'].includes(workTicket.workStatus);
    }

    const { workTicket, workDetail } = oneWork;

    useEffect(() => {
        fetchOneWorkTicket();
    }, [])

    return <MainContainer>
        <div id="oneRequestWorkTicketContainer"
            style={{ border: '1px dashed blue', width: '900px', margin: '0px 0px 50px 0px', padding: '20px' }}>
            <div id="ticketMetaInformation"
                style={{ border: '1px solid gray', margin: '10px 0px 10px 0px', padding: '5px' }}>
                <Title className="titleLeft" name="티켓 정보" />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button cn="btnTicket" style={{ cursor: 'default' }}
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
                            <td>{workTicket.chargeDepartmentName}</td>
                            <td>{workDetail && workDetail.receiverName}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <Button cn="btn_normal" name={contentPresent.reqContent ? "요청 정보 접기" : "요청 정보 열기"}
                    onClick={() => setContentPresent((prev) => ({
                        ...prev,
                        reqContent: !contentPresent.reqContent
                    }))} />
            </div>
            {contentPresent.reqContent &&
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
                    <Button cn="btn_normal" name={contentPresent.analContent ? "분석 내용 접기" : "분석 내용 열기"}
                        onClick={() => setContentPresent((prev) => ({
                            ...prev,
                            analContent: !contentPresent.analContent
                        }))} />
                </div>}
            {(contentPresent.analContent && analysisContentRenderCondition()) &&
                <div id="workDetailAnalysisContent" style={{
                    border: '1px solid gray',
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
                    <Button cn="btn_normal" name={contentPresent.planContent ? "계획 내용 접기" : "계획 내용 열기"}
                        onClick={() => setContentPresent((prev) => ({
                            ...prev,
                            planContent: !contentPresent.planContent
                        }))} />
                </div>
            }
            {(contentPresent.planContent && planContentRenderCondition()) &&
                <div id="workDetailPlanContent" style={{
                    border: '1px solid gray',
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