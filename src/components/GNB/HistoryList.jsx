import HistoryListItem from '/src/components/GNB/HistoryListItem';

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
