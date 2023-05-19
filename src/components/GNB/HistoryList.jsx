import HistoryListItem from '/src/components/GNB/HistoryListItem';

const dateString = (years, months, days) => {
  const newDate = new Date(years, months, days);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() - 1;
  const day = newDate.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

const data = {
  purchaseDate: dateString(2020, 1, 28),
  investment: 10000,
  coinName: 'bitcoin',
  coinLogoURL:
    'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
  currentDate: dateString(2023, 5, 18),
  currentValue: 30000,
};

function HistoryList() {
  return (
    <ul style={{ margin: 0, paddingLeft: '24px' }}>
      <HistoryListItem datas={data} />
    </ul>
  );
}

export default HistoryList;
