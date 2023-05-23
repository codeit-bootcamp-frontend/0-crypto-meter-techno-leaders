import { useCallback, useState } from 'react';
import restoreIcon from '/src/assets/images/restore.svg';
import Button from '/src/components/GNB/Button';
import Logo from '/src/components/GNB/Logo';
import HistoryModal from '/src/components/GNB/HistoryModal';
import { useCurrency, useSetCurrency } from '/src/contexts/CurrencyContext';
import { useMediaQuery } from 'react-responsive';
import { Mobile, TabletAbove } from './MediaQuery';
import styles from '/src/components/GNB/GNB.module.css';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

function GNB() {
  const [isSearchLogVisible, setisSearchLogVisible] = useState(false);
  const currency = useCurrency();
  const setCurrency = useSetCurrency();

  const handleRestoreClick = useCallback(() => {
    console.log('다시 계산하기 버튼 클릭');
  }, []);

  const handleCurrencyChange = useCallback((e) => {
    setCurrency(e.target.value);
  }, []);

  const handleHistoryClick = useCallback(() => {
    setisSearchLogVisible(true);
  }, []);

  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return (
    <div className={cn('gnb-container', isMobile && 'gnb-container-mobile')}>
      <Logo />
      <div
        className={cn(
          'button-container',
          isMobile && 'button-container-mobile'
        )}
      >
        <Button
          handleClick={handleRestoreClick}
          source={restoreIcon}
          name="다시 계산하기"
          propStyle={isMobile && { width: '50px' }}
        />
        <select
          className={cn(
            'select-currency',
            isMobile && 'select-currency-mobile'
          )}
          value={currency}
          onChange={handleCurrencyChange}
        >
          <Mobile>
            <option value="krw">₩</option>
            <option value="usd">$</option>
          </Mobile>
          <TabletAbove>
            <option value="krw">원 (₩)</option>
            <option value="usd">USD ($)</option>
          </TabletAbove>
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
