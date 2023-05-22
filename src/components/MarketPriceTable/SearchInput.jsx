import styles from '/src/components/MarketPriceTable/MarketPriceTable.module.css';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

function SearchInput({ handleInputChange }) {
  const onInputChange = (e) => {
    handleInputChange(e.target.value);
  };

  return (
    <div className={cn('input-container')}>
      <input
        type="text"
        placeholder="검색"
        className={cn('search-input')}
        onChange={onInputChange}
      ></input>
      <svg
        className={cn('search-icon')}
        fill="none"
        height="24"
        width="24"
        stroke="#666a78"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
    </div>
  );
}

export default SearchInput;
