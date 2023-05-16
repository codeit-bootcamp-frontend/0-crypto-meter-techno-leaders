import imgLogo from '/src/assets/images/imgLogo.svg';
import textLogo from '/src/assets/images/textLogo.svg';

function Logo() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '11px',
      }}
    >
      <img src={imgLogo} />
      <img src={textLogo} />
    </div>
  );
}

export default Logo;
