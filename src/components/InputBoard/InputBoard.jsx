import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMediaQuery } from 'react-responsive';
import InputBoardTitle from '/src/components/InputBoard/InputBoardTitle';
import InvestmentInput from '/src/components/InputBoard/InvestmentInput';
import styles from '/src/components/InputBoard/InputBoard.module.css';
import CoinSelect from '/src/components/InputBoard/CoinSelect';

function InputBoard({ values, onChange }) {
  const isMobile = useMediaQuery({ query: '(max-width: 1199px)' });
  const { selectedDate, investment, coinInfo } = values;

  const handleDateChange = (date) => {
    onChange('selectedDate', date);
  };

  const handleInvestmentChange = (value) => {
    onChange('investment', value);
  };

  const handleCoinInfoChange = (selectedOption) => {
    onChange('coinInfo', selectedOption);
  };

  const handleSubmit = (e) => {
    console.log(values);
  };

  return (
    <div className={styles.inputBoardWrapper}>
      <InputBoardTitle values={values} />
      {isMobile ? null : (
        <>
          <ReactDatePicker
            name="selectedDate"
            locale={'ko'}
            selected={selectedDate}
            onChange={handleDateChange}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="yyyy년 M월 d일"
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
        </>
      )}
    </div>
  );
}

export default InputBoard;
