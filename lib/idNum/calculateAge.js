import moment from 'moment';

export default ({ nowDate = moment(new Date()).format('YYYY-MM-DD'), birthday }) => {
  let age = 0;
  const strBirthdayArr = birthday.split('-');
  const birthYear = parseInt(strBirthdayArr[0], 10);
  const birthMonth = parseInt(strBirthdayArr[1], 10);
  const birthDay = parseInt(strBirthdayArr[2], 10);

  const d = nowDate.split('-');
  const nowYear = parseInt(d[0], 10);
  const nowMonth = parseInt(d[1], 10);
  const nowDay = parseInt(d[2], 10);

  if (nowYear == birthYear) {
    age = 0; //同年 则为0岁
  } else {
    const ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        const dayDiff = nowDay - birthDay; //日之差
        if (dayDiff < 0) {
          age = ageDiff - 1;
        } else {
          age = ageDiff;
        }
      } else {
        const monthDiff = nowMonth - birthMonth; //月之差
        if (monthDiff < 0) {
          age = ageDiff - 1;
        } else {
          age = ageDiff;
        }
      }
    } else {
      age = -1; //返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return age;
};
