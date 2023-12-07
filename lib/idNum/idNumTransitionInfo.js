import { deepEachKey } from './../index';
import moment from 'moment';
import calculateAge from './calculateAge';

const provs = {
  11: '北京',
  12: '天津',
  13: '河北',
  14: '山西',
  15: '内蒙古',
  21: '辽宁',
  22: '吉林',
  23: '黑龙江',
  31: '上海',
  32: '江苏',
  33: '浙江',
  34: '安徽',
  35: '福建',
  36: '江西',
  37: '山东',
  41: '河南',
  42: '湖北',
  43: '湖南',
  44: '广东',
  45: '广西',
  46: '海南',
  50: '重庆',
  51: '四川',
  52: '贵州',
  53: '云南',
  54: '西藏',
  61: '陕西',
  62: '甘肃',
  63: '青海',
  64: '宁夏',
  65: '新疆',
  71: '台湾',
  81: '香港',
  82: '澳门',
};
// 根据身份证号码获取【性别】【生日】【年龄】【地址】
export default (idNum,Map) => {
  if (!idNum) return;
  const idNumArr = idNum && idNum.split('');
  if (idNumArr.length !== 18) return;
  let gender, birthdayMoment, age, idCarAddress;
  const mapDictionaryCode = deepEachKey(Map, 'label');
  // 根据身份证号码查找省，因为市区对应不上所以没做转换，默认0，0
  const provName = provs[idNumArr[0] + idNumArr[1]];
  const provId = mapDictionaryCode[provName].id;
  idCarAddress = [provId];
  // 转换性别 根据身份证第十七位判断性别如果为奇数则为男性，偶数则为女性；男：1，女：2
  gender = idNumArr[16] % 2 === 0 ? '2' : '1';
  // 获取出生年月日
  birthdayMoment =
    idNumArr[6] +
    idNumArr[7] +
    idNumArr[8] +
    idNumArr[9] +
    idNumArr[10] +
    idNumArr[11] +
    idNumArr[12] +
    idNumArr[13];
  age = calculateAge({
    nowDate: moment(new Date()).format('YYYY-MM-DD'),
    birthday: moment(birthdayMoment).format('YYYY-MM-DD'),
  });
  return { gender, birthdayMoment, age, idCarAddress };
};
