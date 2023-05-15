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

  const handleAmountChange = (e) => {
    handleChange(e.target.name, e.target.value);
  };

  const handleCryptoChange = (e) => {
    handleChange('crypto', e.target.value);
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
          <span>{values.amount}원</span>으로
          <br />
          <span>{values.crypto}</span>을 샀다면,
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
      <input
        name="amount"
        type="number"
        value={values.amount}
        onChange={handleAmountChange}
      />
      <select name="crypto" value={values.crypto} onChange={handleCryptoChange}>
        <option value="Bitcoin">BitCoin</option>
        <option value="Ethereum">Ethereum</option>
        <option value="Tether">Tether</option>
        <option value="Dogecoin">Dogecoin</option>
      </select>
    </div>
  );
}

export default InputBoard;
