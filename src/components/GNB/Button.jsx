const buttonStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
  height: '40px',
  width: '126px',
  borderRadius: '15px',
  cursor: 'pointer',
};

function Button({ handleClick, name, propStyle = {}, source = null }) {
  return (
    <button
      style={propStyle ? { ...buttonStyle, propStyle } : buttonStyle}
      onClick={handleClick}
    >
      {source ? <img src={source} /> : undefined}
      <p style={{ display: 'inline-block' }}>{name}</p>
    </button>
  );
}

export default Button;
