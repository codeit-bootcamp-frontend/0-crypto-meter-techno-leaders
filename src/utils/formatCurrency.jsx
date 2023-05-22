export function formatCurrency(money, currencyContext) {
  switch (currencyContext) {
    case 'krw':
      return money.toLocaleString() + '원';
    case 'usd':
      return '$' + money.toLocaleString();
    default:
      return '지원하지 않는 통화입니다';
  }
}
