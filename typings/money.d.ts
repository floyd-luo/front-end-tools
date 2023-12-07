export interface Money {
    /**
     * 生成金额字符串，保留两位小数
     * @return {string}
     */
    toString(): string;

    /**
     * 生成精确小数
     * @return {number}
     */
    valueOf(): number;

    /**
     * 加
     * @param {number|Money} value
     * @return {Money}
     */
    plus(value: number|Money): Money;
    /**
     * 减
     * @param {number|Money} value
     * @return {Money}
     */
    minus(value: number|Money): Money;
    /**
     * 乘
     * @param {number|Money} value
     * @return {Money}
     */
    times(value: number|Money): Money;
    /**
     * 除
     * @param {number|Money} value
     * @return {Money}
     */
    divide(value: number|Money): Money;
}

export interface MoneyGenerator {
    /**
     * 传入一个浮点数，生成一个金额对象
     * @param {number} value 浮点数
     * @param {number} precision 精度，默认为12位，可以解决大部分问题
     * @return {Money}
     */
    (value: number, precision?: number): Money;
}

export const money:MoneyGenerator;

export default money;
