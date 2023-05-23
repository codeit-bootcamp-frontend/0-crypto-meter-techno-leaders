import defaultImg from '/src/assets/no-image.jpg';
import styles from '/src/components/MarketPriceTable/MarketPriceTable.module.css';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

function CryptoCard({ name, image, symbol }) {
  const imageSrc = image !== 'missing_large.png' ? image : defaultImg;

  return (
    <div className={cn('coin-name-container')}>
      <img className={cn('coin-image')} src={imageSrc} alt={name} />
      <div className={cn('coin-description')}>
        <span className={cn('coin-name')}>{name}</span>
        <span className={cn('coin-symbol')}>{symbol}</span>
      </div>
    </div>
  );
}

export default CryptoCard;
