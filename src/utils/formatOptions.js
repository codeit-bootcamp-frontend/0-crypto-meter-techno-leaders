export function formatOptions(coinList) {
  const formattedOptions = coinList.map((coin) => {
    const { id, name, image } = coin;
    return { value: id, label: name, image: image };
  });

  return formattedOptions;
}
