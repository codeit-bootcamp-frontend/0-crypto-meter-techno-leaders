import HistoryListItem from '/src/components/GNB/HistoryListItem';

const dateString = (years, months, days) => {
  const newDate = new Date(years, months, days);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() - 1;
  const day = newDate.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

const data = [];

function HistoryList() {
  return (
    <ul style={{ margin: 0, paddingLeft: '24px' }}>
      {data.map((item) => (
        <HistoryListItem key={item.id} datas={item} />
      ))}
    </ul>
  );
}

export default HistoryList;
