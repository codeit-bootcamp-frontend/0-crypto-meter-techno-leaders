function Divider({ width = '1px', type = 'solid', color = 'black' }) {
  const style = {
    borderBottom: `${width} ${type} ${color}`,
  };

  return <div style={style} />;
}

export default Divider;
