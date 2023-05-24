import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InputBoardTitle from '/src/components/InputBoard/InputBoardTitle';
import InvestmentInput from '/src/components/InputBoard/InvestmentInput';
import styles from '/src/components/InputBoard/InputBoard.module.css';
import CoinSelect from './CoinSelect';

function InputBoard({ values, onChange }) {
  const { selectedDate, investment, coinInfo } = values;

  const handleDateChange = (date) => {
    onChange('selectedDate', date);
  };

  const handleInvestmentChange = (value) => {
    onChange('investment', value);
  };

  const handleCoinInfoChange = (value) => {
    onChange('coinInfo', value);
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
      <CoinSelect coinInfo={coinInfo} onChange={handleCoinInfoChange} />
      <button className={styles.submitButton} onClick={handleSubmit}>
        오늘 얼마가 되었을까?
      </button>
    </div>
  );
}

export default InputBoard;
