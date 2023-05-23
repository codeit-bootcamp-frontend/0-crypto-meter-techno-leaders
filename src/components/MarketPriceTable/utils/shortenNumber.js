function shortenNumber(num) {
  if (num > 1000000000) {
    return `${Math.round(num / 1000000000).toLocaleString()}B`;
  } else if (num > 1000000) {
    return `${Math.round(num / 1000000).toLocaleString()}M`;
  } else if (num > 1000) {
    return `${Math.round(num / 1000).toLocaleString()}K`;
  } else {
    return `${num}`;
  }
}

export default shortenNumber;
