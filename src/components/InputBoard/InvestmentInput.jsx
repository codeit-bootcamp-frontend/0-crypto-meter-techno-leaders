import { NumericFormat } from 'react-number-format';
import { useCurrency } from '/src/contexts/CurrencyContext';
import { KrwButtons, UsdButtons } from '/src/components/InputBoard/AddButtons';
import styles from '/src/components/InputBoard/InvestmentInput.module.css';

function InvestmentInput({ investment, onChange }) {
  const currency = useCurrency();

  const handleInvestmentChange = ({ value }) => {
    onChange(+value);
  };

  const addTotalInvestment = (value) => {
    onChange(+value);
  };

  return (
    <div className={styles.inputWrapper}>
      <NumericFormat
        className={styles.input}
        value={investment}
        thousandSeparator
        onValueChange={handleInvestmentChange}
      />
      <div className={styles.currency}>
        {currency === 'krw' ? '원 (₩)' : 'USD ($)'}
      </div>
      <div className={styles.buttonsContainer}>
        {currency === 'krw' ? (
          <KrwButtons investment={investment} onAdd={addTotalInvestment} />
        ) : (
          <UsdButtons investment={investment} onAdd={addTotalInvestment} />
        )}
      </div>
    </div>
  );
}

export default InvestmentInput;
