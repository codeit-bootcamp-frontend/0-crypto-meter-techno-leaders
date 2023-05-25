import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMediaQuery } from 'react-responsive';
import dropdown from '/src/assets/images/dropdownWhite.svg';
import InputBoardTitle from '/src/components/InputBoard/InputBoardTitle';
import InvestmentInput from '/src/components/InputBoard/InvestmentInput';
import styles from '/src/components/InputBoard/InputBoard.module.css';
import CoinSelect from '/src/components/InputBoard/CoinSelect';

import 'react-spring-bottom-sheet/dist/style.css';
import { BottomSheet } from 'react-spring-bottom-sheet';

function InputBoard({ values, onChange }) {
  const isMobile = useMediaQuery({ query: '(max-width: 1199px)' });
  const [open, setOpen] = useState(false);
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

  const openBottomSheet = () => {
    setOpen(true);
  };

  return (
    <div className={styles.inputBoardWrapper} onClick={openBottomSheet}>
      <InputBoardTitle values={values} />

      {isMobile ? (
        <BottomSheet open={open}>
          <img className={styles.dropdown} src={dropdown} />
          <ReactDatePicker
            className={styles.datePicker}
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
        </BottomSheet>
      ) : (
        <div className={styles.inputContainer}>
          <img className={styles.dropdown} src={dropdown} />
          <ReactDatePicker
            className={styles.datePicker}
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
          <div className={styles.investmentWrapper}>
            <InvestmentInput
              investment={investment}
              onChange={handleInvestmentChange}
            />
          </div>
          <div className={styles.coinSelectWrapper}>
            <CoinSelect coinInfo={coinInfo} onChange={handleCoinInfoChange} />
          </div>
          <button className={styles.submitButton} onClick={handleSubmit}>
            오늘 얼마가 되었을까?
          </button>
        </div>
      )}
    </div>
  );
}

export default InputBoard;
