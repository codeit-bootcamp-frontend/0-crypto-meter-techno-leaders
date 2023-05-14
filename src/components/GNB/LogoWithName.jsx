import logo from '../../assets/images/symbol.svg';
import serviceNameLogo from '../../assets/images/CryptoMeter.svg';

function LogoWithName() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '11px',
      }}
    >
      <img src={logo} />
      <img src={serviceNameLogo} />
    </div>
  );
}

export default LogoWithName;
