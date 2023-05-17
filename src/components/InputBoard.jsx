import React, { useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import InputBoardTitle from '/src/components/InputBoardTitle';

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

  const handleInputChange = (e) => {
    handleChange(e.target.name, e.target.value);
  };

  const addTotalAmount = (e) => {
    e.preventDefault();
    const newAmount = values.amount + +e.target.value;
    handleChange('amount', newAmount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="inputBoardContainer">
      <InputBoardTitle values={values} />
      <form className="boardInput" onSubmit={handleSubmit}>
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
          onChange={handleInputChange}
        />
        <div className="addButtons">
          <button value={5000} onClick={addTotalAmount}>
            5,000원
          </button>
          <button value={10000} onClick={addTotalAmount}>
            10,000원
          </button>
          <button value={50000} onClick={addTotalAmount}>
            50,000원
          </button>
          <button value={100000} onClick={addTotalAmount}>
            100,000원
          </button>
        </div>
        <select
          name="crypto"
          value={values.crypto}
          onChange={handleInputChange}
        >
          <option value="Bitcoin">BitCoin</option>
          <option value="Ethereum">Ethereum</option>
          <option value="Tether">Tether</option>
          <option value="Dogecoin">Dogecoin</option>
        </select>
        <button type="submit">오늘 얼마가 되었을까?</button>
      </form>
    </div>
  );
}

export default InputBoard;
