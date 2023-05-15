import React, { useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import { formatDate } from '/src/formatDate';

// react-datepicker 캘린더 드롭다운 기본 css 모듈
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

const TODAY = new Date();
const ONE_YEAR_AGO = new Date(
  TODAY.getFullYear() - 1,
  TODAY.getMonth(),
  TODAY.getDate()
);

const DEFAULT_VALUES = {
  selectedDate: ONE_YEAR_AGO,
  amount: 15000,
  crypto: 'Bitcoin',
};

function InputBoard() {
  const [values, setValues] = useState(DEFAULT_VALUES);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleDateChange = (date) => {
    handleChange('selectedDate', date);
  };

  return (
    <div className="inputBoardContainer">
      <div className="inputBoardTitle">
        <p>
          내가 만약
          <br />
          <span>{formatDate(values.selectedDate)}</span>에
        </p>
        <p>
          <span>15000원</span>으로
          <br />
          <span>Bitcoin</span>을 샀다면,
        </p>
      </div>
      <ReactDatePicker
        name="selectedDate"
        locale={'ko'}
        selected={values.selectedDate}
        onChange={handleDateChange}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        dateFormat="yyyy년 MM월 dd일"
        dateFormatCalendar="yyyy MMMM"
      />
    </div>
  );
}

export default InputBoard;
