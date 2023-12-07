/**
 * 金额处理通用函数
 * 使用方式：引用文件 import { money } from 'utils'
 *
 * 使用场景：
 * 1. 回显后台返回的小数，例如回显 data.amount，<div>{ money(data.amount).toString() }</div>
 * 2. 前端加减小数金额，并显示到页面上：<div>{ money(0.1 + 0.2).toString() }</div>
 * 3. 把一个精确浮点数传入给后台：{ payload: money(0.1 + 0.2).valueOf() }
 * 4. 在前端精确计算金额，比如使用两块五红包再打八八折：
 * const money = money(amount).minus(2.5).divide(0.88);
 * 重写了 toString 和 valueOf 方法，valueOf 取得精度小数，toString 取两位小数
 *
 * APIs：
 * 可以使用链式调用：money(0.1).plus(0.2).times(0.3).divide(0.4)
 * 计算是否相等
 * money(0.1).plus(0.2) == 0.3 // true, 两个等号，不推荐
 * money(0.1).plus(0.3).valueOf() === 0.3 // true，三个等号
 *
 * money.prototype.plus     加
 * money.prototype.minus    减
 * money.prototype.times    乘
 * money.prototype.divide   除
 * money.prototype.toString 取两位小数
 * money.prototype.valueOf  取精确小数
 * 参考：https://github.com/nefe/number-precision/blob/master/src/index.ts
 */

import _ from 'lodash';

const {isNumber} = _;
export default function (value, precision = 12) {
    const strip = (num, precision) => +parseFloat(num.toPrecision(precision));

    const digitLength = num => {
        const eSplit = num.toString().split(/[eE]/);
        const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
        return len > 0 ? len : 0;
    };

    const float2Fixed = num => {
        if (num.toString().indexOf('e') === -1) {
            return Number(num.toString().replace('.', ''));
        }
        const dLen = digitLength(num);
        return dLen > 0 ? strip(num * Math.pow(10, dLen)) : num;
    };

    const times = (num1, num2, ...others) => {
        if (others.length > 0) {
            return times(times(num1, num2), others[0], ...others.slice(1));
        }
        const num1Changed = float2Fixed(num1);
        const num2Changed = float2Fixed(num2);
        const baseNum = digitLength(num1) + digitLength(num2);
        const leftValue = num1Changed * num2Changed;

        return leftValue / Math.pow(10, baseNum);
    };

    const plus = (num1, num2, ...others) => {
        if (others.length > 0) {
            return plus(plus(num1, num2), others[0], ...others.slice(1));
        }
        const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
        return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
    };

    const minus = (num1, num2, ...others) => {
        if (others.length > 0) {
            return minus(minus(num1, num2), others[0], ...others.slice(1));
        }
        const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
        return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
    };

    const divide = (num1, num2, ...others) => {
        if (others.length > 0) {
            return divide(divide(num1, num2), others[0], ...others.slice(1));
        }
        const num1Changed = float2Fixed(num1);
        const num2Changed = float2Fixed(num2);
        // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
        return times(
            num1Changed / num2Changed,
            strip(Math.pow(10, digitLength(num2) - digitLength(num1)))
        );
    };

    const round = (num, ratio) => {
        const base = Math.pow(10, ratio);
        return divide(Math.round(times(num, base)), base);
    };

    const money = function (_value, _precision = 12) {
        this.value = _value;
        this.stripValue = strip(_value, _precision);
    };

    const validateType = (m) => {
        if (!m instanceof money || !isNumber(m))
            throw new Error('Need a money instance OR a Number value');
    };

    money.prototype.plus = function (m) {
        validateType(m);
        return new money(plus(this.value, m?.value ?? m));
    };

    money.prototype.minus = function (m) {
        validateType(m);
        return new money(minus(this.value, m?.value ?? m));
    };

    money.prototype.times = function (m) {
        validateType(m);
        return new money(times(this.value, m?.value ?? m));
    };

    money.prototype.divide = function (m) {
        validateType(m);
        return new money(divide(this.value, m?.value ?? m));
    };

    money.prototype.toString = function () {
        return round(this.stripValue, 3).toFixed(2);
    };

    money.prototype.valueOf = function () {
        return this.stripValue;
    };

    if (!isNumber(value)) throw new Error('Need a Number value!');
    return new money(value, precision);
}
