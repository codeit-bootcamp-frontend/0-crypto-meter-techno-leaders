import '/src/components/Chip.css';

function Chip({ value = 'year', name = '1년', onClick, active = false }) {
  const activeClass = active ? 'active' : '';

  const handleClick = () => {
    onClick(value);
  };

  return (
    <button className={`chip-button ${activeClass}`} onClick={handleClick}>
      {name}
    </button>
  );
}

export default Chip;
