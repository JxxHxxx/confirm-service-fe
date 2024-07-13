import { useState } from "react";
import Button from "../button/Button";
import ButtonGroup from "../button/ButtonGroup";

const showButtonAmount = 5;

export default function Pagination({ totalPages, sendPageNumCallback }) {
    const [buttonInfo, setButtonInfo] = useState({
        nowPageNum: 0,
        startPageNum: 0, // 현재 버튼그룹의 시작 인덱스
        endPageNum: 4 // 현재 버튼그룹의 마지막 인덱스
    });

    const handlePageNumCallback = (pageNum) => {
        sendPageNumCallback(pageNum);
        setButtonInfo((prev) => ({
            ...prev,
            nowPageNum: pageNum
        }))
    }
    // '<' 버튼
    const handleOnClickPreviousButton = () => {
        // 1번 버튼 일 때 처리, 더 이상 버튼 숫자가 낮아지지 않도록
        if (buttonInfo.nowPageNum === 0) {
            return;
        }
        // 1번 버튼이 아닌 가장 맨 앞의 버튼을 눌렀을 때
        else if(buttonInfo.startPageNum === buttonInfo.nowPageNum) {
            sendPageNumCallback(buttonInfo.nowPageNum - 1);
            setButtonInfo((prev) => ({
                ...prev,
                startPageNum: prev.nowPageNum - 5,
                nowPageNum: prev.nowPageNum - 1
            }))
        }
        else {
            sendPageNumCallback(buttonInfo.nowPageNum - 1);
            setButtonInfo((prev) => ({
                ...prev,
                nowPageNum: prev.nowPageNum - 1
            }))
        }
    }
    // '>' 버튼
    const handleOnClickNextButton = () => {
        // 전체 버튼 그룹에서 가장 마지막 버튼을 눌렀을 때
        if (buttonInfo.nowPageNum === totalPages - 1) {
            return;
        }
        // 전체 버튼 그룹의 가장 마지막 버튼은 아니지만 한 버튼 그룹에서 가장 마지막 버튼을 눌렀을 때
        else if (buttonInfo.endPageNum === buttonInfo.nowPageNum) {
            sendPageNumCallback(buttonInfo.nowPageNum + 1);
            setButtonInfo((prev) => ({
                ...prev,
                startPageNum: prev.nowPageNum + 1,
                nowPageNum: prev.nowPageNum + 1
            }))
        }
        else {
            sendPageNumCallback(buttonInfo.nowPageNum + 1);
            setButtonInfo((prev) => ({
                ...prev,
                nowPageNum: prev.nowPageNum + 1
            }))
        }
    }

    const renderButtons = () => {
        const buttons = [];
        // 무조건 5개만 나오게..
        const cond = buttonInfo.startPageNum + showButtonAmount < totalPages ? buttonInfo.startPageNum + showButtonAmount : totalPages;
        for (let btnIdx = buttonInfo.startPageNum; btnIdx < cond; btnIdx++) {
            buttons.push(
                <Button cn={buttonInfo.nowPageNum === btnIdx ? 'bt_cl' : 'bt_ucl'}
                    name={btnIdx + 1}
                    onClick={() => handlePageNumCallback(btnIdx)} />
            )
        }

        return buttons;
    }

    return <ButtonGroup cn="btg_a">
        <Button cn="bt_ucl" name="<" onClick={handleOnClickPreviousButton} />
        {totalPages > 0 && renderButtons()}
        <Button cn="bt_ucl" name=">" onClick={handleOnClickNextButton} />
    </ButtonGroup>
}