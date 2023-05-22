import React from 'react';
import ReactDatePicker from 'react-datepicker';
import InputBoardTitle from '/src/components/InputBoard/InputBoardTitle';
import 'react-datepicker/dist/react-datepicker.css';

import cryptoCoins from '/src/assets/coins_markets.json';

function InputBoard({ values, onChange }) {
  const { selectedDate, investment, cryptoName } = values;

  const handleDateChange = (date) => {
    onChange('selectedDate', date);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    onChange(e.target.name, e.target.value);
  };

  const addTotalInvestment = (e) => {
    e.preventDefault();
    const newInvestment = +investment + +e.target.value;
    onChange('investment', newInvestment);
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
          selected={selectedDate}
          onChange={handleDateChange}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          dateFormat="yyyy년 MM월 dd일"
          dateFormatCalendar="yyyy MMMM"
        />
        <input
          name="investment"
          type="number"
          value={investment}
          onChange={handleInputChange}
        />
        <div className="addButtons">
          <button value={5000} onClick={addTotalInvestment}>
            5,000원
          </button>
          <button value={10000} onClick={addTotalInvestment}>
            10,000원
          </button>
          <button value={50000} onClick={addTotalInvestment}>
            50,000원
          </button>
          <button value={100000} onClick={addTotalInvestment}>
            100,000원
          </button>
        </div>
        <select
          name="cryptoName"
          value={cryptoName}
          onChange={handleInputChange}
        >
          {cryptoCoins.map((item) => {
            const { id, name, image } = item;
            return (
              <option key={id} value={name}>
                {name}
              </option>
            );
          })}
        </select>
        <button type="submit">오늘 얼마가 되었을까?</button>
      </form>
    </div>
  );
}

export default InputBoard;
