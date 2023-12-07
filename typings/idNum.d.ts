import {Moment} from 'moment';

interface CalculateAgeParams {
    /**
     * @description 年龄日期字符串，例如 1999-11-11
     */
    birthday: string;

    /**
     * @description 当前时间
     */
    nowDate?: Moment;
}

interface IdNumType {
    /**
     * 根据生日字符串取当前年龄
     * @param {CalculateAgeParams} param
     */
    calculateAge(param: CalculateAgeParams): number;

    /**
     */
    phoneNumberMasking(param: string): string;
}

declare const ID_NumUtils: IdNumType;
export default ID_NumUtils;
