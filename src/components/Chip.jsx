import '/src/components/Chip.css';

function Chip({ value = '1year', name = '1년', onClick, active = false }) {
  const activeClass = active ? 'active' : '';

  return <button className={`chip-button ${activeClass}`}>{name}</button>;
}

export default Chip;
