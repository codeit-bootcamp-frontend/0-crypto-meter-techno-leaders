const monthDaysCounter = {
  1: 30,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

export default function calculateDays(date) {
  const month = date.getMonth + 1;
  const day = date.getDate();

  if (month === 1) {
    return day;
  } else {
    let days = 0;
    for (let i = 1; i < month; i++) {
      days += monthDaysCounter[i];
    }
    days += day;
    return days;
  }
}
