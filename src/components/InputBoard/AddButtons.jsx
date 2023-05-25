import styles from '/src/components/InputBoard/AddButtons.module.css';

export function KrwButtons({ investment, onAdd }) {
  const krwValues = [5000, 10000, 50000, 100000];

  const addTotalInvestment = (e) => {
    const newValue = +investment + +e.target.value;
    onAdd(+newValue);
  };

  return (
    <>
      {krwValues.map((value) => {
        const formattedValue = value.toLocaleString();
        return (
          <button
            key={value}
            value={value}
            className={styles.addButton}
            onClick={addTotalInvestment}
          >
            {formattedValue}원
          </button>
        );
      })}
    </>
  );
}

export function UsdButtons({ investment, onAdd }) {
  const usdValues = [10, 50, 100, 500, 1000];

  const addTotalInvestment = (e) => {
    const newValue = +investment + +e.target.value;
    onAdd(+newValue);
  };

  return (
    <>
      {usdValues.map((value) => {
        const formattedValue = value.toLocaleString();
        return (
          <button
            key={value}
            value={value}
            className={styles.addButton}
            onClick={addTotalInvestment}
          >
            ${formattedValue}
          </button>
        );
      })}
    </>
  );
}
