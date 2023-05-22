import { useCurrency } from '/src/contexts/CurrencyContext';

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
      {currency === 'krw' ? (
        <div className="addButtons">
          <button value={5000} onClick={addTotalInvestment}>
            5,000원
          </button>
          <button value={10000} onClick={addTotalInvestment}>
            10,000원
          </button>
          <button value={50000} onClick={addTotalInvestment}>
            50,000원
          </button>
          <button value={100000} onClick={addTotalInvestment}>
            100,000원
          </button>
        </div>
      ) : (
        <div className="addButtons">
          <button value={10} onClick={addTotalInvestment}>
            $10
          </button>
          <button value={50} onClick={addTotalInvestment}>
            $50
          </button>
          <button value={100} onClick={addTotalInvestment}>
            $100
          </button>
          <button value={500} onClick={addTotalInvestment}>
            $500
          </button>
          <button value={1000} onClick={addTotalInvestment}>
            $1,000
          </button>
        </div>
      )}
    </>
  );
}

export default InvestmentInput;
