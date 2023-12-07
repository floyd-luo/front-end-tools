import {Moment} from "moment";

interface DateRangeMapper {
    date: [Moment, Moment],
    r_k: [string, string],
}

/**
 * 将若干个DateRange的组件返回值，根据指定映射关系，合并成一个对象
 * @param {Array<DateRangeMapper>} arrDate dateRange数组
 * @param {boolean} showTime 是否显示时间
 * @return {object}
 */
export function momentFormatDate(arrDate: Array<DateRangeMapper>, showTime?: boolean): object;

/**
 * 计算两个时间字符串的差值，返回时间字符串，时间字符串格式为：HH:mm
 * @param {string} startTimeStr
 * @param {string} endTimeStr
 * @return {string}
 */
export function getTimes(startTimeStr, endTimeStr): string;

/**
 * 计算指定日期字符串的年龄
 * @param {string} dateStr 日期时间字符串 1999-11-11
 * @return {string} X岁X月X天
 */
export function getAge(dateStr): string;
