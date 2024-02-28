import * as _date from './date';
import money from './money';
import {Entity, cityMap, provinceCityDistrictMap} from './areas';
import localStorage from './localStorage';
import File from './file';
import regular from './regular';
import ID_NumUtils from './idNum';
import getAccessCode from './accessCode';
import TableUtils from './tableUtils';

export {
    cityMap,
    provinceCityDistrictMap,
    localStorage,
    _date,
    File,
    regular,
    money,
    ID_NumUtils,
    getAccessCode,
    TableUtils
};

/**
 * 压平树
 * @param {Array<*>} tree
 * @param {string} key 对应孩子节点的key
 */
export function treeToArray(tree: Array<any>, key?: string): Array<any>;

/**
 * 数组格式转树状结构
 * @param {Array<*>} array
 * @param {string} id
 * @param {string} pid
 * @param {string} childrenKey
 */
export function arrayToTree(array: Array<any>, id: string, pid: string, childrenKey: string): Array<any>;

/**
 * 查询 url search 参数，空返回null
 * @param {string} urlParamName
 */
export function queryURL(urlParamName: string): string | void;

/**
 * 数组内查询
 * @param {Array<*>} array
 * @param {string} value
 * @param {string} key
 */
export function queryArray(array: Array<any>, value: string, key: string): any | void;

/**
 * trim 对象的第一层属性
 * @param {object} obj
 */
export function trimValues(obj: object): object;

/**
 * 深度寻找树中指定的对象key，返回以key对象
 * @param {Array<*>} arr
 * @param {string} key
 * @param {string} childrenKey
 */
export function deepEachKey(arr: Array<any>, key: string, childrenKey: string): any;

/**
 * 拼接对象为请求字符串
 * @param {object} obj 待拼接的对象
 */
export function encodeSearchParams(obj: object): string;

/**
 * get UUID string
 */
export function getUuid(): string;

/**
 * 生成以 name值为key的，形如 { index： i, len: 1 } 的类Map对象
 * @param {Array<*>} data 数组
 * @param {string} keyName
 */
export function getRowSpanMap(data: Array<any>, keyName: string): object;

/**
 * 根据 value，查询枚举对象的 label
 * @param {string|number} value
 * @param {Array<Entity>} enumsWrap
 */
export function enumTransition(value: string | number, enumsWrap: Array<Entity>): string;

/**
 * 由原数组生成 selectOptions 格式的数组
 * @param {Array<Entity>} data 原数组
 * @param {Entity} optionAttribute
 */
export function selectOptionFormat(data: Array<Entity>, optionAttribute: Entity): Array<Entity>;

/**
 * 返回数组2是否是数组1的子集
 * @param {Array<string>} arr1
 * @param {Array<string>} arr2
 */
export function myIncludes(arr1: Array<string>, arr2: Array<string>): boolean;

/**
 * 从省市区code到省市区文字的转换
 * @param {string} codes
 */
export function codeToStr(codes: string): string;

interface OnChangePagination {
    (params: { pageNum: number, pageSize: number, current: number }): void;
}

/**
 * 生成分页函数对象 { onShowSizeChange, onChange }
 * @param {OnChangePagination} onChangePagination
 */
export function pageFnHelper(onChangePagination: OnChangePagination): object;

interface JsonScheme {
    type: string;
    properties: Array<{ [key: string]: { description: string, type: string } }>;

    [props: string]: any;
}

interface SchemeOption {
    /**
     * @description 依据后端api返回的数据接口配置的json schema
     */
    schema: JsonScheme;
    /**
     * @description 要映射的配置文件
     */
    config: Array<any>;
    /**
     * @description 依据那个字段映射
     */
    accordingField: string;
    /**
     * @description 要更新的字段
     */
    updateField: string | Array<string>;
}

/**
 * 根据JSON schema 生成配置文件，如table的columns 或者搜索条件的filter 配置，或者表单配置
 * const config = schemaToConfig(schemeOption);
 */
export function schemaToConfig(schemeOption: SchemeOption): object | Array<any>;

/**
 * 用于生成筛选条件配置的 map callback
 * @param {object} item
 */
interface InterfaceAssignment {
    dictionariesEnum?: object;
    updateTypeKey: object;
    selectCondition?: Array<Object>;
    componentsConfig?:object;
    itemConfig?:object;
}

export function selectConditionAssignment(item: InterfaceAssignment): object;

/**
 * mapDispatchToProps actions 属性生成器，例如 student - model，使用方式如下：
 * const mapDispatchToProps = dispatch => {
 *   const studentActionFactory = actionCreator('student')(dispatch);
 *   return {
 *     actions: {
 *       // 等同于 dispatch({ type: 'student', payload })
 *       getList: payload => studentActionFactory('getList', { payload }),
 *     },
 *   };
 * }
 * @param {string} namespace
 * @returns {*} 返回执行 action 返回Promise的高阶函数
 */
export function actionCreator(namespace: string): any;

/**
 * 进一步简化mapDispatchToProp函数，返回{ actions }对象，例如
 * const actions = { getList: ['clearFilter', 'getList']}
 * const mapDispatchToProps = actionsPropHelper(actionCreator('curriculum'), { searchList: ['clearFilter', 'getList'] });
 * @param {*} actionFactory actionCreator创建的工厂函数
 * @param {object} actions actions映射对象
 * @returns {*}
 */
export function actionsPropHelper(actionFactory: any, actions: object): any;
