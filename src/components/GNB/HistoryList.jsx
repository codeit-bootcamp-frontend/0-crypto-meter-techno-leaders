import HistoryListItem from '/src/components/GNB/HistoryListItem';
import classNames from 'classnames/bind';
import styles from '/src/components/GNB/HistoryListComponents.module.css';

const cn = classNames.bind(styles);

function HistoryList({ historyData }) {
  return (
    <ul className={cn('history-list')}>
      {historyData && // historyData가 있을 때만 렌더링 하도록 처리해 주었습니다.
        historyData.map((item) => (
          <HistoryListItem key={item.id} datas={item} />
        ))}
    </ul>
  );
}

export default HistoryList;
