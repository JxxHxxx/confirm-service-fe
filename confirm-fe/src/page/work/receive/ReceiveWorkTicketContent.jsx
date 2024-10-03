import { useEffect, useState } from "react";
import WorkApi from "../../../api/workApi";
import MainContainer from "../../../components/layout/container/MainContainer";
import Title from "../../document/Title";
import WorkTicketTable from "../WorkTicketTable";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";
import ButtonGroup from "../../../components/button/ButtonGroup";


export default function ReceiveWorkTicketContent() {
    const [workTickets, setWorkTickets] = useState([]);
    const nav = useNavigate();

    const requestReadWorkTickets = async () => {
        try {
            const params = {
                chargeCompanyId: sessionStorage.getItem('companyId'),
                chargeDepartmentId: sessionStorage.getItem('departmentId'),
                workStatus: 'CREATE,RECEIVE,ANALYZE_BEGIN,ANALYZE_COMPLETE,MAKE_PLAN_BEGIN,MAKE_PLAN_COMPLETE,REQUEST_CONFIRM,ACCEPT,WORKING',
            }

            const { data } = await WorkApi.searchWorkTicket(params);

            if (data.status === 200) {
                setWorkTickets(data.data);
            }
            else {
                // 조회 결과 없음 처리
            }

        }
        catch (e) {
            alert(e);
        }
    }

    const [onlyMy, setOnlyMy] = useState(false);

    // 조건에 맞는 작업 티켓을 랜더링하는 함수, 즉시 실행 함수.
    const renderMeetTheCondWorkTickets = () => {
        if (onlyMy) {
            return workTickets.filter(wt => wt.receiverId === sessionStorage.getItem('memberId'));
        }
        else {
            return workTickets;
        }
    }


    useEffect(() => {
        requestReadWorkTickets();
    }, [])

    useEffect(() => {
    }, [onlyMy])

    return <>
        <MainContainer profile='dev'>
            <div id="receiveWorkTicketContainer" style={{ border: '1px dashed blue', width: '900px', margin: '0px 0px 50px 0px', padding: '20px' }}>
                <Title className="basicTitle" name="요청받은 티켓" />
                <div id="infoMessage" style={{ marginBottom: '10px' }}>
                    <p style={{
                        marginTop: '5px',
                        fontWeight: "normal",
                        cursor: "pointer"
                    }}
                        className="basicDesc"
                        onClick={() => nav('/work/search')}>
                        작업이 완료됐거나 반려된 티켓을 확인하려면 티켓 조회 기능을 이용하세요. <br />클릭 시 티켓 조회 페이지로 이동합니다
                    </p>
                </div>
                <ButtonGroup style={{ marginBottom: '10px' }}>
                    <Button name="내가 접수한 티켓만 보기" cn={onlyMy ? 'chip-clicked' : 'chip-unclicked'} onClick={() => setOnlyMy(!onlyMy)} />
                </ButtonGroup>
                {renderMeetTheCondWorkTickets().length > 0 ?
                    <div>
                        <WorkTicketTable workTickets={renderMeetTheCondWorkTickets()} readType='RECEIVE' />
                    </div> :
                    <div>
                        <p style={{ marginTop: '20px' }} className="basicDesc">요청받은 티켓이 없습니다</p>
                    </div>
                }
            </div>
        </MainContainer>
    </>
}