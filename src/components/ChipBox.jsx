import '/src/components/ChipBox.css';
import Chip from './Chip';

function ChipBox({ values, names, activeValue, onChange }) {
  return (
    <div className="chips-container">
      {values.map((value, i) =>
        value === activeValue ? (
          <Chip key={value} value={value} name={names[i]} active />
        ) : (
          <Chip key={value} value={value} name={names[i]} />
        )
      )}
    </div>
  );
}

export default ChipBox;
