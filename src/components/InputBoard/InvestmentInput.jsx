import { NumericFormat } from 'react-number-format';
import { useCurrency } from '/src/contexts/CurrencyContext';
import { KrwButtons, UsdButtons } from '/src/components/InputBoard/AddButtons';
import styles from '/src/components/InputBoard/InvestmentInput.module.css';

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
    <div className={styles.inputWrapper}>
      <NumericFormat
        className={styles.input}
        value={investment}
        thousandSeparator
        onValueChange={handleInvestmentChange}
      />
      {currency === 'krw' ? (
        <div className={styles.currency}>원 (₩)</div>
      ) : (
        <div className={styles.currency}>USD ($)</div>
      )}
      <div className={styles.buttonsContainer} onClick={addTotalInvestment}>
        {currency === 'krw' ? <KrwButtons /> : <UsdButtons />}
      </div>
    </div>
  );
}

export default InvestmentInput;
