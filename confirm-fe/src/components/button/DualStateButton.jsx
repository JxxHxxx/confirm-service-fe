import Button from "./Button";

/**
 * 상태(state)에 따라 onClick, name 이 변경 되는 버튼 
 * @param {boolean} props.flag - 어떤 버튼을 표현할지 상태 여부
 */
export default function DualStateButton({ flag, trueButtonOnclick, trueButtonName, falseButtonOnclick, falseButtonName }) {
    return <>
        {flag ? <Button cn="btn_normal" name={trueButtonName} onClick={trueButtonOnclick} /> :
            <Button cn="btn_normal" name={falseButtonName} onClick={falseButtonOnclick} />}
    </>
}