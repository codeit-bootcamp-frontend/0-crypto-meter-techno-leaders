import { useCurrency } from '/src/contexts/CurrencyContext';
import { KrwButtons, UsdButtons } from '/src/components/InputBoard/AddButtons';
import styles from '/src/components/InputBoard/InvestmentInput.module.css';

function InvestmentInput({ investment, onChange }) {
  const currency = useCurrency();

  const handleInvestmentChange = (e) => {
    onChange(+e.target.value);
  };

  const addTotalInvestment = (e) => {
    const newValue = investment + +e.target.value;
    onChange(newValue);
  };

  return (
    <>
      <input
        name="investment"
        type="number"
        value={investment}
        onChange={handleInvestmentChange}
      />
      <div className={styles.buttonsContainer} onClick={addTotalInvestment}>
        {currency === 'krw' ? <KrwButtons /> : <UsdButtons />}
      </div>
    </>
  );
}

export default InvestmentInput;
