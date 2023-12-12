export {default as localStorage} from './localStorage';
export {default as _date} from './date';
export {default as File} from './file';
export {default as regular} from './regular';
export {default as money} from './money';
export {default as ID_NumUtils} from './idNum';
export {default as accessCode} from './accessCode';
// 连字符转驼峰
String.prototype.hyphenToHump = function () {
    return this.replace(/-(\w)/g, (...args) => {
        return args[1].toUpperCase();
    });
};

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
    return this.replace(/([A-Z])/g, '-$1').toLowerCase();
};
/**/
export const treeToArray = (data, key = 'children') => {
    const result = [];
    if (!(data instanceof Array)) {
        return result;
    }
    const changefunc = tree => {
        tree.forEach(item => {
            if (item[key]) {
                changefunc(item[key], item.key);
            }
            result.push({parentId: item?.id, ...item});
        });
    };
    changefunc(data);
    return result;
};

/**
 * @param  name {String}
 * @return  {String}
 */
export function queryURL(name) {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
export function queryArray(array, key, keyAlias = 'key') {
    if (!(array instanceof Array)) {
        return null;
    }
    const item = array.filter(v => String(v[keyAlias]) === String(key));
    if (item.length) {
        return item[0];
    }
    return null;
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export function arrayToTree(array, id = 'id', pid = 'pid', children = 'children') {
    let data = Object.assign([], array);
    let result = [];
    let hash = {};
    data.forEach((item, index) => {
        hash[data[index][id]] = data[index];
    });

    data.forEach(item => {
        let hashVP = hash[item[pid]];
        if (hashVP) {
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(item);
        } else {
            result.push(item);
        }
        // 给如果没有key数据默认加上key
        if (!item['key']) {
            item['key'] = item['id'];
        }
    });
    return result;
}

// 正则
export const reg = {
    code: /^\d{6}$/, // 短信验证码
    phone: /^\d{5,20}$/ // 手机号
};

// trim obj
export const trimValues = values => {
    return Object.keys(values).reduce((obj, key) => {
        const value = values[key];
        if (values[key] && typeof value === 'string') {
            obj[key] = value.trim();
        } else {
            obj[key] = value;
        }
        return obj;
    }, {});
};

// 深度寻找keys，返回以key为单位的json
export const deepEachKey = (arr, key = 'id', childrenKey = 'children') => {
    let obj = {};
    let look = children => {
        children.map(item => {
            let newItem = {
                ...item
            };
            delete newItem[childrenKey];

            obj[item[key]] = newItem;
            if (item[childrenKey] && item[childrenKey].length) {
                look(item[childrenKey]);
            }
        });
    };
    look(arr);
    return obj;
};

/**
 * 拼接对象为请求字符串
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 */
export function encodeSearchParams(obj) {
    const params = [];

    Object.keys(obj).forEach(key => {
        let value = obj[key];
        // 如果值为undefined我们将其置空
        if (typeof value === 'undefined') {
            value = '';
        }
        // 对于需要编码的文本（比如说中文）我们要进行编码
        params.push([key, encodeURIComponent(value)].join('='));
    });

    return params.join('&');
}

// 高德地址库与自己地址库匹配
export const aMapRegeoName = (name, suffix = '') => {
    let cn = {
        内蒙古自治区: '内蒙古',
        广西壮族自治区: '广西',
        西藏自治区: '西藏',
        宁夏回族自治区: '宁夏',
        新疆维吾尔自治区: '新疆'
    };
    return cn[name] ? cn[name] + suffix : name;
};

export function getUuid() {
    let s = [];
    let hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';
    return s.join('');
}

const getRowSpanMap = (data, keyName = 'name') => {
    let map = {};
    let hash = {};
    const len = data.length;
    for (let i = 0; i < len; i++) {
        // null 和undefined不算做重复
        let value =
            data[i][keyName] === null || data[i][keyName] === undefined
                ? `${data[i][keyName]}${i}`
                : data[i][keyName];
        let key = typeof value + value;
        if (!hash[key]) {
            map[value] = {
                index: i,
                len: 1
            };
            hash[key] = true;
        } else {
            map[value]['len'] += 1;
        }
    }
    return map;
};
export const toRowSpanData = (data, keys = []) => {
    let m = {};
    let _m = {};
    keys.forEach(item => {
        m[item] = getRowSpanMap(data, item);
        _m[item] = {};
        Object.keys(m[item]).forEach(key => {
            if (m[item][key] && m[item][key]['index'] !== undefined) {
                _m[item][m[item][key]['index']] = m[item][key]['len'];
            }
        });
    });
    return (data ?? []).map((item, index) => {
        keys.forEach(i => {
            item[`rowSpan_${i}`] = _m[i][index] || 0;
        });
        item['key'] = index;
        return item;
    });
};

export function enumTransition(value, {enums}) {
    let enumValue = '';
    if (value && !Array.isArray(enums)) {
        enumValue = value;
    } else if (Array.isArray(enums)) {
        const enumsFilter = enums.find(x => x.value == value) || {};
        enumValue = enumsFilter.label || value;
    }
    return enumValue;
}

export function selectOptionFormat(datas, optionAttribute) {
    if (!datas instanceof Array) return [];
    return datas.map(item => {
        let obj = {};
        obj['value'] = item[optionAttribute.value];
        obj['label'] = item[optionAttribute.label];
        return obj;
    });
}

export function myIncludes(arr1, arr2) {
    return arr2.every(val => arr1.includes(val));
}

// 从省市区code到省市区文字的转换
export function codeToStr(codes) {
    const region = deepEachKey(provinceCityDistrictMap);
    if (!region) return;
    const str = [];
    if (codes && typeof codes === 'string') {
        const arrCode = codes.split(',');
        arrCode.map(item => {
            const everySty = region[item] && region[item].label;
            str.push(everySty);
            return item;
        });
    }
    return str.join('-');
}
