import { useEffect, useRef, useState } from "react";
import Button from "../../../components/button/Button";
import OrgSearchModal from "./OrgSearchModal";
import WorkApi from "../../../api/workApi";
import Title from "../../document/Title";
import '../../../css/Division.css';
import MainContainer from "../../../components/layout/container/MainContainer";
import { GrAdd } from "react-icons/gr";
import { IoCheckmarkSharp, IoCloseOutline } from "react-icons/io5";

// 파일 크기 제한 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function WorkTicketApplicationContent() {
    const requestTitleRef = useRef('');
    const requestContentRef = useRef('');
    // 따닥 방지
    const concurrentBlockRef = useRef(false);


    const [workTicket, setWorkTicket] = useState({
        chargeDepartmentName: '',
        chargeCompanyId: '',
        chargeDepartmentId: '',
    });

    const [applyFlag, setApplyFlag] = useState('PENDING');
    const handleOnChangeTextarea = (ref, event) => {
        ref.current = event.target.value;
    }
    // 첨부파일 state
    const [attachments, setAttachments] = useState([]);
    // 첨부파일 input onchange 이벤트 처리리
    const handleOnchangeAttachmentInput = (event) => {
        let files = event.target.files;
        if (files.length > 0) {
            let tmpArr = [];
            for (let i = 0; i < files.length; i++) {
                let tmpFile = files[i];
                if (tmpFile.size > MAX_FILE_SIZE) {
                    alert('10MB가 넘는 파일은 첨부할 수 없습니다. \n첨부 파일 :' + tmpFile.name)
                    break;
                }
                tmpArr.push({
                    name: tmpFile.name,
                    idx: i,
                    file: tmpFile
                });
            }
            setAttachments(prevFiles => prevFiles.concat(tmpArr));
        }
    }
    // 첨부 파일 취소 이벤트 처리
    const handleOnClickAttachRemove = (file) => {
        if (applyFlag === 'SUCCESS') {
            return;
        }

        setAttachments(
            attachments.filter(item => item.file !== file)
        )
    }
    // 작업 티켓 요청 후, 첨부 파일 처리 API
    const handleRequestWorkTicketAttachment = (attachment, workTicketId) => {
        return WorkApi.storeWorkTicketAttachment({
            file: attachment.file,
            workTicketId: workTicketId,
        });
    }

    const handleOnclickApplyWorkTicket = async () => {
        if (workTicket.chargeCompanyId === '' || workTicket.chargeDepartmentId === '') {
            alert("업무를 요청할 부서를 선택해주세요")
            throw new Error("요청 부서가 지정되지 않았습니다");
        }

        if (requestTitleRef.current.length <= 1) {
            alert("2자 이상의 요청 제목을 입력해주세요");
            throw new Error("요청 제목은 2자 이상이여야 합니다.");
        }

        if (concurrentBlockRef.current) {
            alert('이전 요청을 처리중입니다');
            return;
        }

        try {
            const requestBody = {
                chargeCompanyId: workTicket.chargeCompanyId,
                chargeDepartmentId: workTicket.chargeDepartmentId,
                requestTitle: requestTitleRef.current,
                requestContent: requestContentRef.current,
                workRequester: {
                    companyId: sessionStorage.getItem('companyId'),
                    id: sessionStorage.getItem('memberId'),
                    name: sessionStorage.getItem('name')
                }
            }
            // 응답 실패, 성공 케이스 처리해야함
            concurrentBlockRef.current = true;
            const { status, data } = await WorkApi.createWorkTicket(requestBody);
            if (status === 201) {
                setApplyFlag('SUCCESS');
                concurrentBlockRef.current = false;

                // 첨부 파일 처리
                for (let idx = 0; idx < attachments.length; idx++) {
                    const response = await handleRequestWorkTicketAttachment(attachments[idx], data.data.workTicketId);
                    if (response.status !== 201) {
                        alert(response.data.message);
                        return;
                    }
                }
                alert(data.message);
            }
            else {
                alert(data.message);
                concurrentBlockRef.current = false;
            }

        } catch (e) {
            alert(e);
        }
    }
    useEffect(() => {

    }, [applyFlag])
    return <>
        <MainContainer profile='dev'>
            <div id="applyWorkTicketFormContainer" style={{ border: '1px dashed blue', width: '500px', margin: '0px 0px 50px 0px', padding: '20px' }}>
                <div id="applyWorkTicketTitleDiv" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', marginBottom: '10px' }}>
                    <Title className="basicTitle" name="업무 요청" />
                    {applyFlag === 'SUCCESS' ?
                        <Button cn="btn_normal" name="확인 완료" onClick={() => window.location.reload()} /> :
                        <Button cn="btn_normal" name="요청" onClick={handleOnclickApplyWorkTicket} />}
                </div>
                <div id="chargeDepartmentDiv">
                    {applyFlag === 'SUCCESS' ?
                        <p className="basicDesc">요청 부서</p> :
                        <p className="basicDesc">업무를 요청할 부서를 선택해주세요</p>}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ margin: '0px' }}>
                            {workTicket.chargeDepartmentName ? workTicket.chargeDepartmentName : ''}
                        </span>
                        {applyFlag === 'SUCCESS' ? <></> : <OrgSearchModal setWorkTicket={setWorkTicket} />}
                    </div>
                </div>
                <div style={{ marginBottom: '10px' }}></div>
                <div id="requestTitleDiv">
                    <p id='requestTitleDesc' className="basicDesc">요청 제목</p>
                    <textarea style={{ width: '495px', height: '21px', resize: 'none' }}
                        readOnly={applyFlag === 'SUCCESS' ? true : false}
                        onChange={(event) => handleOnChangeTextarea(requestTitleRef, event)} />
                </div>
                <div style={{ marginBottom: '10px' }}></div>
                <div id="requestContentDiv">
                    <p id='requestContentDesc' className="basicDesc">요청 내용</p>
                    <textarea style={{ width: '495px', height: '315px', resize: 'none' }}
                        readOnly={applyFlag === 'SUCCESS' ? true : false}
                        onChange={(event) => handleOnChangeTextarea(requestContentRef, event)} />
                </div>
                <div id="requestAttachMentDiv">
                    <p id='requestContentDesc' className="basicDesc">첨부 파일</p>
                    <div>
                        <div>
                            {attachments.length > 0 &&
                                <div>{attachments.map((item, idx) =>
                                    <div className="attachmentText" key={idx}>
                                        <div className="text-ellipsis" style={{ padding: '5px' }}>{item.name}</div>
                                        <div className={applyFlag === 'SUCCESS' ? '' : 'pointer'}
                                            style={{ padding: '5px' }}
                                            onClick={() => handleOnClickAttachRemove(item.file)}>
                                            {applyFlag === 'SUCCESS' ? <IoCheckmarkSharp size={'14px'} /> : <IoCloseOutline size={'14px'} />}
                                        </div>
                                    </div>)}
                                </div>}
                        </div>
                        {applyFlag === 'SUCCESS' ? <></> : <>
                            <label htmlFor="requestTicketAttachment">
                                <div className="attachmentDiv">
                                    <GrAdd />
                                </div>
                            </label>
                            <input
                                id="requestTicketAttachment"
                                onChange={handleOnchangeAttachmentInput}
                                type="file"
                                multiple
                                style={{ display: 'none' }}
                            />
                        </>}
                    </div>
                </div>
            </div>
        </MainContainer >
    </>
}