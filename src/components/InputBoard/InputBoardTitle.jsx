import { format } from 'date-fns';
import hamburger from '/src/assets/images/hamburger.svg';
import { formatCurrency } from '/src//utils/formatCurrency';
import { useCurrency } from '/src/contexts/CurrencyContext';
import styles from '/src/components/InputBoard/InputBoardTitle.module.css';

function InputBoardTitle({ selectedDate, investment, coinInfo }) {
  const currency = useCurrency();

  const formattedDate = format(selectedDate, 'yyyy년 M월 d일');
  const formattedInvestment = formatCurrency(investment, currency);

  return (
    <div className={styles.title}>
      <div>
        내가 만약{'  '}
        <br className={styles.br} />
        <span className={styles.titleValues}>{formattedDate}</span>에
      </div>
      <img className={styles.hamburger} src={hamburger} />
      <div>
        <span className={styles.titleValues}>{formattedInvestment}</span>으로
        {'  '}
        <br className={styles.br} />
        <span className={styles.titleValues}>{coinInfo.label}</span>을 샀다면,
      </div>
    </div>
  );
}

export default InputBoardTitle;
