function HistoryItem({ datas }) {
  const { purchaseDate, investment, coinName, currentDate, currentValue } =
    datas;

  return (
    <li
      style={{
        width: '472px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '20px 0',
        borderBottom: '1px solid #E7E9F0',
      }}
    >
      <div className="coin-logo">
        <img
          style={{ width: '28px', height: '28px' }}
          src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
        />
      </div>
      <div style={{ height: '39px', display: 'flex', flexDirection: 'column' }}>
        <div>
          <p
            style={{
              height: '19px',
              margin: 0,
              fontSize: '14px',
              color: '#848898',
            }}
          >
            만약 {purchaseDate}에 {investment}원으로
          </p>
        </div>
        <div>
          <p
            style={{
              height: '19px',
              margin: 0,
              fontSize: '14px',
              color: '#0B0E1B',
            }}
          >
            {coinName} 코인을 샀다면, {currentDate}에는 {currentValue}원입니다.
          </p>
        </div>
      </div>
    </li>
  );
}

export default HistoryItem;
