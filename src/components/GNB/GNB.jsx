import { useCallback } from 'react';
import restoreIcon from '/src/assets/images/restore.svg';
import Button from '/src/components/GNB/Button';
import Logo from '/src/components/GNB/Logo';
import HistoryPopover from '/src/components/GNB/HistoryPopover';
import { useCurrency, useSetCurrency } from '/src/contexts/CurrencyContext';
import { useMediaQuery } from 'react-responsive';
import { Mobile, TabletAbove } from '/src/components/GNB/MediaQuery';
import styles from '/src/components/GNB/GNB.module.css';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

function GNB({ onRestore, data }) {
  const currency = useCurrency();
  const setCurrency = useSetCurrency();

  const handleRestoreClick = useCallback(() => {
    onRestore();
  }, []);

  const handleCurrencyChange = useCallback((e) => {
    setCurrency(e.target.value);
  }, []);

  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return (
    <div className={cn('gnb-container')}>
      <Logo />
      <div className={cn('button-container')}>
        <Button
          handleClick={handleRestoreClick}
          imageSource={restoreIcon}
          propStyle={isMobile && { width: '50px' }}
        >
          다시 계산하기
        </Button>
        <select
          className={cn('select-currency')}
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
        <HistoryPopover data={data} />
      </div>
    </div>
  );
}

export default GNB;
