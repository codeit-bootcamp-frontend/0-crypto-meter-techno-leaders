import Chip from '/src/components/MainBoard/Chip';
import styles from '/src/components/MainBoard/ChipBox.module.css';
import classNames from 'classnames/bind';

function ChipBox({ values, names, activeValue, onChange }) {
  const cn = classNames.bind(styles);

  return (
    <div className={cn('chips-container')}>
      {values.map((value, i) => (
        <Chip
          key={value}
          value={value}
          name={names[i]}
          onClick={onChange}
          active={value === activeValue}
        />
      ))}
    </div>
  );
}

export default ChipBox;
