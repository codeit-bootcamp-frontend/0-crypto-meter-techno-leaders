import { useCurrency } from '/src/contexts/CurrencyContext';
import { KrwButtons, UsdButtons } from '/src/components/InputBoard/AddButtons';
import styles from '/src/components/InputBoard/InvestmentInput.module.css';
import { NumericFormat } from 'react-number-format';

function InvestmentInput({ investment, onChange }) {
  const currency = useCurrency();

  const handleInvestmentChange = ({ value }) => {
    onChange(+value);
  };

  const addTotalInvestment = (e) => {
    const newValue = investment + +e.target.value;
    onChange(newValue);
  };

  return (
    <>
      <NumericFormat
        value={investment}
        thousandSeparator
        onValueChange={handleInvestmentChange}
      />
      <div className={styles.buttonsContainer} onClick={addTotalInvestment}>
        {currency === 'krw' ? <KrwButtons /> : <UsdButtons />}
      </div>
    </>
  );
}

export default InvestmentInput;
