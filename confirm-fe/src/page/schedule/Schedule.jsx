import { Header } from "../../components/layout/Header";
import DatePicker from 'react-datepicker';
import ReactSelect from 'react-select';
import Page from "../../components/layout/Page";
import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css"
import "../../css/Input.css"
import { convertDate } from "../../converter/DateTimeConvert";

export default function Schedule() {
  const [time, setTime] = useState();
  const [vacationDate, setVacationDate] = useState(convertDate(new Date()));

  // API 로 대체
  const options = [
    { startTime: '09:00', endTime: '13:00', label: '09:00 ~ 13:00' },
    { startTime: '10:00', endTime: '14:00', label: '10:00 ~ 14:00' },
    { startTime: '11:00', endTime: '15:00', label: '11:00 ~ 15:00' },
    { startTime: '11:00', endTime: '17:00', label: '13:00 ~ 17:00' },
    { startTime: '11:00', endTime: '18:00', label: '14:00 ~ 18:00' }
  ]
  // API 로 대체

  return (
    <Page header={<Header />} sidebar={<div>사이드바</div>}>
      <div style={{ display: 'grid', gridTemplateColumns: '4fr 4fr' }}>
        <div>
          <p style={{ 'color': 'grey', 'fontSize': '13px' }}>날짜를 지정해주세요</p>
          <div>
            <DatePicker
              className="basic-dp"
              // showIcon
              required
              selected={vacationDate}
              onChange={(value) => setVacationDate(convertDate(value))}
            />
          </div>
        </div>
        <div>
          <p style={{ 'color': 'grey', 'fontSize': '13px' }}>시간을 지정해주세요</p>
          <ReactSelect
            className="basic-slnr"
            options={options}
            onChange={setTime}
            placeholder={'반차 시간을 지정해주세요'}
            noOptionsMessage={() => alert('없음')} />
        </div>
      </div>
    </Page>
  );
}
