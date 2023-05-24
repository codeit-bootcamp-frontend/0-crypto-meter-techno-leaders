import styles from '/src/components/MainBoard/Chip.module.css';
import classNames from 'classnames/bind';

function Chip({ value, name, onClick, active = false }) {
  const handleChipClick = () => {
    onClick(value);
  };

  const cn = classNames.bind(styles);

  return (
    <button className={cn('chip-button', { active })} onClick={handleChipClick}>
      {name}
    </button>
  );
}

export default Chip;
