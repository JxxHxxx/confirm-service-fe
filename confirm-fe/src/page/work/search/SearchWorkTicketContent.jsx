import { useEffect, useState } from "react";
import MainContainer from "../../../components/layout/container/MainContainer";
import Title from "../../document/Title";
import WorkApi from "../../../api/workApi";
import DefaultTable from "../../../components/table/DefaultTable";
import WorkConverter from "../../../converter/work/WorkConverter";
import ReactModal from "react-modal";
import { IoCloseSharp } from "react-icons/io5";
import Select from 'react-select';

export default function SearchWorkTicketContent() {
    const [searchtickets, setSearchTickets] = useState({
        data: []
    });

    const [searchCond, setSearchCond] = useState({
        workStatus: {
            label: '전체',
            value: 'ALL'
        }
    });

    const [selectTicket, setSelectTicket] = useState({
        workTicketPk: undefined,
        workTicketId: undefined,
        workStatus: undefined,
        createdTime: undefined,
        chargeCompanyId: undefined,
        chargeDepartmentId: undefined,
        modifiedTime: undefined,
        requestTitle: undefined,
        requestContent: undefined,
        receiverId: undefined,
        receiverName: undefined,
        workRequester: {
            companyId: undefined,
            id: undefined,
            name: undefined
        }
    });

    const [modalOpen, setModalOpen] = useState(false);

    const requestSearchTickets = async () => {
        const params = {
            chargeCompanyId: sessionStorage.getItem('companyId'),
        }

        const { data, status } = await WorkApi.searchWorkTicket(params);
        if (status === 200) {
            setSearchTickets((prev) => ({
                ...prev,
                data: data.data.content
            }))
        }
    }

    const content = () => {
        if (searchCond.workStatus.value === 'ALL') {
            return searchtickets.data
                .map(({ workTicketPk, workTicketId, requestTitle, workRequester, workStatus, receiverName }) => ({
                    uniqueKey: workTicketPk,
                    workTicketId,
                    requestTitle,
                    reqesterName: workRequester.name,
                    a: null,
                    receiverName,
                    workStatus: WorkConverter.convertWorkStatus(workStatus)
                }))
        }

        if (searchCond.workStatus.value === 'End') {
            return searchtickets.data
                .filter((ticket) => ticket.workStatus === 'DONE')
                .map(({ workTicketPk, workTicketId, requestTitle, workRequester, workStatus, receiverName }) => ({
                    uniqueKey: workTicketPk,
                    workTicketId,
                    requestTitle,
                    reqesterName: workRequester.name,
                    a: null,
                    receiverName,
                    workStatus: WorkConverter.convertWorkStatus(workStatus)
                }))
        }

        if (searchCond.workStatus.value === 'Processing') {
            return searchtickets.data
                .filter((ticket) => !['DONE', 'DELETE'].includes(ticket.workStatus))
                .map(({ workTicketPk, workTicketId, requestTitle, workRequester, workStatus, receiverName }) => ({
                    uniqueKey: workTicketPk,
                    workTicketId,
                    requestTitle,
                    reqesterName: workRequester.name,
                    a: null,
                    receiverName,
                    workStatus: WorkConverter.convertWorkStatus(workStatus)
                }))
        }
    }

    const handleOnClickTableData = (event) => {
        const workTicketPk = event.currentTarget.getAttribute('searchCondition');

        const selectTicket = searchtickets.data.filter(ticket => {
            return ticket.workTicketPk.toString() === workTicketPk;
        });

        if (selectTicket.length > 0) {
            setSelectTicket(selectTicket[0]);
            setModalOpen(true);
        }
    }

    // 페이지 최초 랜더링 시 호출
    useEffect(() => {
        requestSearchTickets();
    }, [])

    // 검색 조건을 변경했을 때 호출
    useEffect(() => {

    }, [searchCond])

    return <MainContainer profile='dev'>
        <div id="requestWorkTicketContainerTitle"
            style={{
                border: '1px dashed blue',
                width: '1100px',
                margin: '0px 0px 50px 0px',
                padding: '20px'
            }}>
            <Title className="basicTitle" name="요청 티켓 조회" />
        </div>
        <div id="requestWorkTicketContainerSearchCond"
            style={{
                border: '1px dashed blue',
                width: '1100px',
                margin: '0px 0px 50px 0px',
                padding: '20px'
            }}>
            <div style={{ display: 'inline-block' }}>
                <div style={{ paddingBottom: '5px', fontSize: '14px' }}>
                    <label htmlFor="searchCondTicketId">티켓 상태</label>
                </div>
                <Select id="searchCondTicketId"
                    styles={{
                        control: (baseStyles) => ({
                            ...baseStyles,
                            width: '250px'
                        })
                    }}
                    placeholder="티켓 진행 상태"
                    onChange={(option) => setSearchCond({
                        ...searchCond,
                        workStatus: option
                    })}
                    defaultValue={{ value: 'ALL', label: '전체' }}
                    options={
                        [
                            { value: 'ALL', label: '전체' },
                            { value: 'Processing', label: '처리중' },
                            { value: 'End', label: '종료' }
                        ]
                    } />
            </div>
        </div>
        <div id="requestWorkTicketContainerTable"
            style={{
                border: '1px dashed blue',
                width: '1100px',
                margin: '0px 0px 50px 0px',
                padding: '20px'
            }}>
            <ReactModal isOpen={modalOpen}
                onRequestClose={() => {
                    // const closeConfirm = confirm('종료하겠습니까?'); 
                    // 현재 불편해서 경고 창 안뜨게 변경해둠
                    if (true) {
                        setModalOpen(false);
                    }
                }}
                style={{
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                        height: "450px",
                        width: "400px",
                    },
                }}
            >
                <IoCloseSharp
                    size={'1.2em'}
                    className="ModalIoCloseSharp"
                    onClick={() => setModalOpen(false)} />
                <div>{selectTicket.workTicketId}</div>
            </ReactModal>
            <div style={{ marginBottom: '20px' }}></div>
            <DefaultTable className={'defaultTable'}
                columnNames={['ID', '제목', '요청자', '요청부서', '접수자', '티켓 진행 상태']}
                items={content()}
                onClick={(event) => handleOnClickTableData(event)}
            />

        </div>

    </MainContainer>
}