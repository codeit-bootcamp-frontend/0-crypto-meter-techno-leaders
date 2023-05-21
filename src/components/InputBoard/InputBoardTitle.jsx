import { formatDate } from '/src/utils/formatDate';

function InputBoardTitle({ values }) {
  const { selectedDate, amount, crypto } = values;

  return (
    <div className="inputBoardTitle">
      <p>
        내가 만약
        <br />
        <span>{formatDate(selectedDate)}</span>에
      </p>
      <p>
        <span>{amount}원</span>으로
        <br />
        <span>{crypto}</span>을 샀다면,
      </p>
    </div>
  );
}

export default InputBoardTitle;
