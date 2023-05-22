export function KrwButtons() {
  const krwValues = [5000, 10000, 50000, 100000];

  return (
    <>
      {krwValues.map((value) => {
        const formattedValue = value.toLocaleString();
        return (
          <button key={value} value={value}>
            {formattedValue}원
          </button>
        );
      })}
    </>
  );
}

export function UsdButtons() {
  const usdValues = [10, 50, 100, 500, 1000];

  return (
    <>
      {usdValues.map((value) => {
        const formattedValue = value.toLocaleString();
        return (
          <button key={value} value={value}>
            ${formattedValue}
          </button>
        );
      })}
    </>
  );
}
