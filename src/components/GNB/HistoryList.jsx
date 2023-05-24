import HistoryListItem from '/src/components/GNB/HistoryListItem';
import classNames from 'classnames/bind';
import styles from '/src/components/GNB/HistoryListComponents.module.css';

const cn = classNames.bind(styles);

const data = [
  {
    id: 1,
    purchaseDate: '2022.02.01',
    investment: 15000,
    coinName: 'Bitcoin',
    coinLogoURL:
      'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
    currentDate: '2023.05.24',
    currentValue: 30000,
  },
  {
    id: 2,
    purchaseDate: '2022.02.01',
    investment: 15000,
    coinName: 'Bitcoin',
    coinLogoURL:
      'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
    currentDate: '2023.05.24',
    currentValue: 30000,
  },
]; // ListItem 렌더링 확인용입니다. 디자인 확인 부탁드려요.

function HistoryList() {
  return (
    <ul className={cn('history-list')}>
      {data.map((item) => (
        <HistoryListItem key={item.id} datas={item} />
      ))}
    </ul>
  );
}

export default HistoryList;
