interface StorageItem {
    [key: string]: string;
}

interface LocalStorage {
    /**
     * 设置 localstorage，参数类型为 {[key: string]: string}
     * @param {StorageItem} obj
     */
    set(obj: StorageItem): void;

    /**
     * 取 localstorage 值
     * @param {string} key
     */
    get(key: string): string;

    /**
     * 移除 localstorage，参数为字符串或字符串数组
     * @param {Array<string>|string} item
     */
    remove(item: Array<string>|string): void;
}

declare const localStorage:LocalStorage;

export default localStorage;
