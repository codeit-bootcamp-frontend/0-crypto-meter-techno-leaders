import clsx from 'clsx';
import '/src/components/Chip.css';

function Chip({ value, name, onClick, active = false }) {
  const chipClass = clsx('chip-button', { active });

  const handleChipClick = () => {
    onClick(value);
  };

  return (
    <button className={chipClass} onClick={handleChipClick}>
      {name}
    </button>
  );
}

export default Chip;
