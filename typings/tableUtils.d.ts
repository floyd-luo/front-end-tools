interface FieldTypeRender {
    (fieldTypeName: string, fieldTypeItem?: any): string;
}

interface FieldType {
    normal: FieldTypeRender;
    text: FieldTypeRender;
    textarea: FieldTypeRender;
    number: FieldTypeRender;
    boolean: FieldTypeRender;
    date: FieldTypeRender;
    datetime: FieldTypeRender;
    time: FieldTypeRender;
    month: FieldTypeRender;
    dateRange: FieldTypeRender;
    datetimeRange: FieldTypeRender;
    enum: FieldTypeRender;
    enumGroup: FieldTypeRender;
    cascader: FieldTypeRender;
    [fieldTypeName: string]: FieldTypeRender;
}

interface ColumnRender {
    (text: string, record?: any): any;
}

interface Column {
    title: string;
    dataIndex: string;
    key?: string;
    align?: string;
    width?: number|string;
    render?: ColumnRender;
    [propName: string]: any;
}

interface ColumnChain {
    /**
     * 返回指定 key 的列配置项，如有未匹配则生成默认列
     * @param {Array<string>} filterKeys
     * @return {ColumnChain}
     */
    pick(filterKeys?: Array<string>): ColumnChain;

    /**
     * 排除指定 key 的列配置项
     * @param {Array<string>} fieldKeys
     * @return {ColumnChain}
     */
    excludes(fieldKeys?: Array<string>): ColumnChain;

    /**
     * 扩展列配置项
     * @param {Array<Column>} columns
     * @return {ColumnChain}
     */
    extend(columns: Array<Column>): ColumnChain;

    /**
     * 返回列配置数组
     * @return {Array<Column>}
     */
    values(): Array<Column>;
}

interface TableUtilsType {
    /**
     * 组合新的 FieldType
     * @param {FieldType} types
     * @return {FieldType}
     */
    combineTypes(types: FieldType): FieldType;

    /**
     * 取 Field 指定 type 的 render 结果
     * @param {*} fieldValue
     * @param {*} field
     * @return {string}
     */
    getFieldValue(fieldValue: any, field?: { type: string, [otherProps: string]: any}): string;

    /**
     * 获取表格column数组
     * @param {Array<Column>} columns
     * @param {Array<string>} filterKeys
     * @param {Array<Column>} extraFields
     * @return {ColumnChain}
     */
    getColumns(columns: Array<Column>, filterKeys?: Array<string>, extraFields?: Array<Column>): ColumnChain;
}

declare const TableUtils: TableUtilsType;
export default TableUtils;
