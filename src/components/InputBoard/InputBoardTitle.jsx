import { formatDate } from '/src/utils/formatDate';

function InputBoardTitle({ values }) {
  const { selectedDate, investment, cryptoName } = values;

  const formattedDate = formatDate(selectedDate);

  return (
    <div className="inputBoardTitle">
      <div>
        내가 만약
        <br />
        <span>{formattedDate}</span>에
      </div>
      <div>
        <span>{investment}원</span>으로
        <br />
        <span>{cryptoName}</span>을 샀다면,
      </div>
    </div>
  );
}

export default InputBoardTitle;
