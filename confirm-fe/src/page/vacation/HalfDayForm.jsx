import { Fragment } from "react";
import '../../css/layout/Form.css';
import Button from '../../components/button/Button';

export default function HalfDayForm() {

    return (<Fragment>
        <div className="basic-f">
            {/* <h3>반차 신청 폼</h3> */}
            <p>일자</p>
            <p>오전/오후</p>
            <p>시간 지정</p>
            <Button cn="basic-button" name="생성"></Button>
        </div>
    </Fragment>)
}