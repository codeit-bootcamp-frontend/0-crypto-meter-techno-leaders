import { useCallback, useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import { getCoinsMarkets } from '/src/api/api';
import useAsync from '/src/hooks/useAsync';
import { formatOptions } from '/src/utils/formatOptions';
import styles from '/src/components/InputBoard/CoinSelect.module.css';

const PER_PAGE = 100;
const VS_CURRENCY = 'krw';
const ORDER = 'market_cap_desc';

function CustomOption({ innerProps, label, data }) {
  return (
    <div {...innerProps} className={styles.coinOption}>
      <img className={styles.coinImg} src={data.image} />
      {label}
    </div>
  );
}

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

function CoinSelect({ coinInfo, onChange }) {
  const [options, setOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, loadingError, getCoinsMarketsAsync] =
    useAsync(getCoinsMarkets);

  const handleCoinInfoChange = (selectedCoin) => {
    onChange(selectedCoin);
  };

  const handleLoad = useCallback(
    async (queryOptions) => {
      const result = await getCoinsMarketsAsync(queryOptions);
      if (!result) return;

      const formattedResult = formatOptions(result);
      if (queryOptions.page === 1) {
        setOptions(formattedResult);
      } else {
        setOptions((prevItems) => [...prevItems, ...formattedResult]);
      }
      setPage(queryOptions.page + 1);
    },
    [getCoinsMarketsAsync]
  );

  const handleLoadMore = () => {
    handleLoad({
      page,
      perPage: PER_PAGE,
      vsCurrency: VS_CURRENCY,
      order: ORDER,
    });
  };

  useEffect(() => {
    handleLoad({
      page: 1,
      perPage: PER_PAGE,
      vsCurrency: VS_CURRENCY,
      order: ORDER,
    });
  }, [page, handleLoad]);

  return (
    <Select
      options={options}
      components={{
        Option: CustomOption,
        Control: CustomControl,
      }}
      value={coinInfo}
      onChange={handleCoinInfoChange}
    />
  );
}

export default CoinSelect;
