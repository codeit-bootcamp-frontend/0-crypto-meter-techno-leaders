import HistoryListItem from '/src/components/GNB/HistoryListItem';
import classNames from 'classnames/bind';
import styles from '/src/components/GNB/HistoryListComponents.module.css';

const cn = classNames.bind(styles);

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
