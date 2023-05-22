import defaultImg from '/src/assets/no-image.jpg';

function CryptoCard({ name, image, symbol }) {
  return (
    <div className="coin-name-container">
      <img
        className="coin-image"
        src={image !== 'missing_large.png' ? image : defaultImg}
        alt={name}
      />
      <div className="coin-description">
        <span className="coin-name">{name}</span>
        <span className="coin-symbol">{symbol}</span>
      </div>
    </div>
  );
}

export default CryptoCard;
