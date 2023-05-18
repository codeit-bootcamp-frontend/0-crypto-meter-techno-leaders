function Divider({ color = 'black', width = '1px', type = 'solid' }) {
  const style = {
    borderBottom: `${width} ${type} ${color}`,
  };

  return <div style={style} />;
}

export default Divider;
