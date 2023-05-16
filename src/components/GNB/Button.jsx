const buttonStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
  height: '40px',
  width: '126px',
  border: '1px solid #CED2DD',
  borderRadius: '15px',
  cursor: 'pointer',
  backgroundColor: 'transparent',
};

function Button({ handleClick, name, propStyle, source = null }) {
  return (
    <button
      style={propStyle ? { ...buttonStyle, ...propStyle } : buttonStyle}
      onClick={handleClick}
    >
      {source ? <img src={source} /> : undefined}
      <p style={{ display: 'inline-block', margin: '0 auto' }}>{name}</p>
    </button>
  );
}

export default Button;
