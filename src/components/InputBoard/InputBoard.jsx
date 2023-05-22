import React from 'react';
import ReactDatePicker from 'react-datepicker';
import InputBoardTitle from '/src/components/InputBoard/InputBoardTitle';
import InvestmentInput from '/src/components/InputBoard/InvestmentInput';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '/src/components/InputBoard/InputBoard.module.css';

import cryptoCoins from '/src/assets/coins_markets.json';

function InputBoard({ values, onChange }) {
  const { selectedDate, investment, cryptoName } = values;

  const handleDateChange = (date) => {
    onChange('selectedDate', date);
  };

  const handleInvestmentChange = (value) => {
    onChange('investment', value);
  };

  const handleCryptoChange = (e) => {
    e.preventDefault();
    onChange('cryptoName', e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className={styles.inputBoardWrapper}>
      <InputBoardTitle values={values} />
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
      <InvestmentInput
        investment={investment}
        onChange={handleInvestmentChange}
      />
      <select
        name="cryptoName"
        value={cryptoName}
        onChange={handleCryptoChange}
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
      <button onClick={handleSubmit}>오늘 얼마가 되었을까?</button>
    </div>
  );
}

export default InputBoard;
