import Select, { components } from 'react-select';
import coinsList from '/src/assets/coins_markets.json';

const options = coinsList.map((coin) => {
  const { id, name, image } = coin;
  return { value: id, label: name, image: image };
});

function CustomControl({ children, ...props }) {
  const selectedOption = props.selectProps.value;
  const { image } = selectedOption || {};

  return (
    <components.Control {...props}>
      {image && <img src={image} style={{ width: '24px', height: 'auto' }} />}
      {children}
    </components.Control>
  );
}

function CustomOption({ innerProps, label, data }) {
  return (
    <div {...innerProps}>
      <img src={data.image} style={{ width: '24px', height: 'auto' }} />
      {label}
    </div>
  );
}

function CoinSelect({ coinInfo, onChange }) {
  const handleCoinInfoChange = (selectedCoin) => {
    onChange(selectedCoin);
  };
  return (
    <Select
      options={options}
      components={{ Option: CustomOption, Control: CustomControl }}
      value={coinInfo}
      onChange={handleCoinInfoChange}
    />
  );
}

export default CoinSelect;
