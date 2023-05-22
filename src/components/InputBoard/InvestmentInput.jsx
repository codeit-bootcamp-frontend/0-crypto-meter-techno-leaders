import { useCurrency } from '/src/contexts/CurrencyContext';
import { KrwButtons, UsdButtons } from '/src/components/InputBoard/AddButtons';

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
      <div className="addButtons" onClick={addTotalInvestment}>
        {currency === 'krw' ? <KrwButtons /> : <UsdButtons />}
      </div>
    </>
  );
}

export default InvestmentInput;
