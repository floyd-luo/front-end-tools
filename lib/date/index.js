import moment from 'moment';
import _ from 'lodash';
// 日期格式化
Date.prototype.format = function(format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  }
  return format;
};
// moment时间转换成年月日格式，
// 接收一个数组[{
//         date: [dayjs, dayjs],
//         r_k: ['createStartTime', 'createEndTime']
//       }]
// showTime: true,//是否显示时间
// 返回 {createEndTime: "2019-11-17 23:59:59",createStartTime: "2019-11-16 00:00:00"}
const momentFormatDate = function(arrDate, showTime = false) {
  let r = {};
  if (!Array.isArray(arrDate)) return r;
  arrDate.map(item => {
    const { date, r_k } = item;
    let startDate;
    let endDate;
    if (date) {
      if (_.isArray(date)) {
        startDate = date[0];
        endDate = date[1];
      }
      // dayjs获取到的是字符串需要做处理
      if (_.isString(date)) {
        const _date = date.split(',');
        startDate = _date[0];
        endDate = _date[1];
      }
      r[r_k[0]] = startDate ? showTime
          ? `${moment(startDate).format('YYYY-MM-DD HH:mm:ss')}`
          : `${moment(startDate).format('YYYY-MM-DD')} 00:00:00` : '';
      r[r_k[1]] = endDate ? showTime
          ? `${moment(endDate).format('YYYY-MM-DD HH:mm:ss')}`
          : `${moment(endDate).format('YYYY-MM-DD')} 23:59:59` : '';
    }
  });
  return r;
};
// 计算时分时间差
const getTimes = function(startTime, endTime) {
  const momentStart = moment(startTime, 'HH:mm:ss');
  const momentEnd = moment(endTime, 'HH:mm:ss');
  const duration = moment.duration(momentEnd - momentStart);
  return `${String(duration.hours()).padStart(2, '0')}:${String(duration.minutes()).padStart(2, '0')}`;
};
function getAge(str) {
  let r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/);
  if (r == null) return false;

  let d = new Date(r[1], r[3] - 1, r[4]);
  let returnStr = '输入的日期格式错误！';

  if (d.getFullYear() == r[1] && d.getMonth() + 1 == r[3] && d.getDate() == r[4]) {
    let date = new Date();
    let yearNow = date.getFullYear();
    let monthNow = date.getMonth() + 1;
    let dayNow = date.getDate();

    let largeMonths = [1, 3, 5, 7, 8, 10, 12], //大月， 用于计算天，只在年月都为零时，天数有效
      lastMonth = monthNow - 1 > 0 ? monthNow - 1 : 12, // 上一个月的月份
      isLeapYear = false, // 是否是闰年
      daysOFMonth = 0; // 当前日期的上一个月多少天

    if ((yearNow % 4 === 0 && yearNow % 100 !== 0) || yearNow % 400 === 0) {
      // 是否闰年， 用于计算天，只在年月都为零时，天数有效
      isLeapYear = true;
    }

    if (largeMonths.indexOf(lastMonth) > -1) {
      daysOFMonth = 31;
    } else if (lastMonth === 2) {
      if (isLeapYear) {
        daysOFMonth = 29;
      } else {
        daysOFMonth = 28;
      }
    } else {
      daysOFMonth = 30;
    }

    let Y = yearNow - parseInt(r[1]);
    let M = monthNow - parseInt(r[3]);
    let D = dayNow - parseInt(r[4]);
    if (D < 0) {
      D = D + daysOFMonth; //借一个月
      M--;
    }
    if (M < 0) {
      // 借一年 12个月
      Y--;
      M = M + 12; //
    }

    if (Y < 0) {
      returnStr = '出生日期有误！';
    } else if (Y === 0) {
      if (M === 0) {
        returnStr = D + '天';
      } else {
        returnStr = M + '月';
      }
    } else {
      if (M === 0) {
        returnStr = Y + '岁';
      } else {
        returnStr = Y + '岁' + M + '月' + D + '天';
      }
    }
  }

  return returnStr;
}
export default {
  momentFormatDate,
  getTimes,
  getAge,
};
