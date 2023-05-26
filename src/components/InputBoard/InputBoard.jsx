import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMediaQuery } from 'react-responsive';
import dropdownWhite from '/src/assets/images/dropdownWhite.svg';
import dropdownTriangle from '/src/assets/images/dropdownTriangle.svg';
import InputBoardTitle from '/src/components/InputBoard/InputBoardTitle';
import InvestmentInput from '/src/components/InputBoard/InvestmentInput';
import styles from '/src/components/InputBoard/InputBoard.module.css';
import CoinSelect from '/src/components/InputBoard/CoinSelect';

import 'react-spring-bottom-sheet/dist/style.css';
import { BottomSheet } from 'react-spring-bottom-sheet';

function InputBoard({ onChange, defaultValues }) {
  const isMobile = useMediaQuery({ query: '(max-width: 1199px)' });
  const [open, setOpen] = useState(false);
  // const { selectedDate, investment, coinInfo } = values;

  // const DEFAULT_VALUES = {
  //   currentDate: TODAY,
  //   selectedDate: ONE_YEAR_AGO,
  //   investment: 15000,
  //   coinInfo: {
  //     value: 'bitcoin',
  //     label: 'Bitcoin',
  //     image:
  //       'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
  //   },
  // };

  const {
    selectedDate: defaultSelectedDate,
    investment: defaultInvestment,
    coinInfo: defaultCoinInfo,
  } = defaultValues;
  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate);
  const [investment, setInvestment] = useState(defaultInvestment);
  const [coinInfo, setCoinInfo] = useState(defaultCoinInfo);

  const handleDateChange = (date) => {
    // onChange('selectedDate', date);
    setSelectedDate(date);
  };

  const handleInvestmentChange = (value) => {
    // onChange('investment', value);
    setInvestment(value);
  };

  const handleCoinInfoChange = (selectedOption) => {
    // onChange('coinInfo', selectedOption);
    setCoinInfo(selectedOption);
  };

  const handleSubmit = (e) => {
    // console.log(values);
    console.log({
      currentDate: defaultValues.currentDate,
      investment,
      selectedDate,
      coinInfo,
    });
    onChange({
      currentDate: defaultValues.currentDate,
      investment,
      selectedDate,
      coinInfo,
    });
  };

  const openBottomSheet = () => {
    setOpen(true);
  };

  return (
    <div className={styles.inputBoardWrapper} onClick={openBottomSheet}>
      <InputBoardTitle
        selectedDate={selectedDate}
        investment={investment}
        coinInfo={coinInfo}
      />

      {isMobile ? (
        <BottomSheet open={open}>
          <div className={styles.bottomSheetContents}>
            <div className={styles.datepickerContainer}>
              <img className={styles.dropdown} src={dropdownTriangle} />
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
            </div>
            <InvestmentInput
              investment={investment}
              onChange={handleInvestmentChange}
            />
            <CoinSelect coinInfo={coinInfo} onChange={handleCoinInfoChange} />
            <div className={styles.submitWrapper}>
              <button className={styles.submitButton} onClick={handleSubmit}>
                오늘 얼마가 되었을까?
              </button>
            </div>
          </div>
        </BottomSheet>
      ) : (
        <div className={styles.inputContainer}>
          <img className={styles.dropdown} src={dropdownWhite} />
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
          <CoinSelect coinInfo={coinInfo} onChange={handleCoinInfoChange} />
          <div className={styles.submitWrapper}>
            <button className={styles.submitButton} onClick={handleSubmit}>
              오늘 얼마가 되었을까?
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputBoard;
