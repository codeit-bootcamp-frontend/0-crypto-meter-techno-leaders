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

const activeButtonStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
  height: '40px',
  width: '126px',
  border: '1px solid #00A661',
  borderRadius: '15px',
  cursor: 'pointer',
  backgroundColor: '#DAF1E5',
  color: '#00A661',
};

function Button({ isClicked, handleClick, name, propStyle, source = null }) {
  return (
    <button
      style={
        isClicked
          ? { ...activeButtonStyle, ...propStyle }
          : { ...buttonStyle, ...propStyle }
      }
      onClick={handleClick}
    >
      {source ? <img src={source} /> : undefined}
      <p style={{ display: 'inline-block', margin: '0 auto' }}>{name}</p>
    </button>
  );
}

export default Button;
