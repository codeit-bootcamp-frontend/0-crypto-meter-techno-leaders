import '/src/components/ChipBox.css';
import Chip from '/src/components/Chip';

function ChipBox({ values, names, activeValue, onChange }) {
  return (
    <div className="chips-container">
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
