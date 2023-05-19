import { useCallback, useState } from 'react';
import restoreIcon from '/src/assets/images/restore.svg';
import Button from '/src/components/GNB/Button';
import Logo from '/src/components/GNB/Logo';
import HistoryModal from '/src/components/GNB/HistoryModal';
import { useCurrency, useSetCurrency } from '../../contexts/CurrencyContext';

function GNB() {
  const [isSearchLogVisible, setisSearchLogVisible] = useState(false);
  const currency = useCurrency();
  const setCurrency = useSetCurrency();

  const handleRestoreClick = useCallback(() => {
    console.log('다시 계산하기 버튼 클릭');
    // inputBoard, mainBoard 초기화 로직 들어갈 곳
  }, []);

  const handleCurrencyChange = useCallback((e) => {
    setCurrency(e.target.value);
  }, []);

  const handleHistoryClick = useCallback(() => {
    setisSearchLogVisible(true);
  }, []);

  console.log(currency); // currency state가 잘 변화하는지 확인하려고 잠시 넣었고, 이후 변경 예정입니다.

  return (
    <div
      style={{
        backgroundColor: '#F5F8F9',
        padding: '0 57px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100px',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0,
      }}
    >
      <Logo />
      <div
        className="button-container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '329px',
        }}
      >
        <Button
          handleClick={handleRestoreClick}
          source={restoreIcon}
          name="다시 계산하기"
        />
        <select
          value={currency}
          onChange={handleCurrencyChange}
          style={{
            height: '40px',
            width: '90px',
            backgroundColor: 'transparent',
            border: '1px solid #CED2DD',
            borderRadius: '15px',
            paddingLeft: '15px',
          }}
        >
          <option value="krw">원 (₩)</option>
          <option value="usd">USD ($)</option>
        </select>
        <Button
          handleClick={handleHistoryClick}
          propStyle={{ width: '81px' }}
          isSearchLogVisible={isSearchLogVisible}
          name="검색 기록"
        />
        <HistoryModal
          isOpen={isSearchLogVisible}
          handleModalOpen={setisSearchLogVisible}
        />
      </div>
    </div>
  );
}

export default GNB;
