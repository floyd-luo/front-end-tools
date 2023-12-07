interface PageConfig {
    pageNum: number;
    pageSize: number;
    showTotal(total: number): string;
    showSizeChanger: boolean;
    total: number;
    current: number;
}

interface PaginationProps extends PageConfig {
    onShowSizeChange(pageNum, pageSize): void;
    onChange(pageNum, pageSize): void;
}

interface Formdata2Params {
    /**
     * 把表单数据转换成listAction参数的mapper函数
     * @param {object} formdata
     * @return {object}
     */
    (formdata: object): object;
}

interface QsReducer {
    /**
     * 缓存表单参数合并策略，默认取新的表单参数与老的表单参数的合并
     * @param {object} beforeParams
     * @param {object} currentParams
     * @return {object}
     */
    (beforeParams: object, currentParams: object): object;
}

interface UseTableOptions {
    pageConfig?: PageConfig;
    formdata2Params?: Formdata2Params;
    qsReducer?: QsReducer;
}

interface ListAction {
    /**
     * 对应dva model effect，组件会给此函数传递表单数据到第一个参数，期望返回一个Promise对象，
     * resolve 分页对象 {data, total}
     * @param {object} payload
     */
    (payload: object): Promise<{data: Array<object>, total: number}>
}

interface TableProps {
    spinning: boolean,
    list: Array<any>,
    onSearch(): void,
    onReset(): void,
    refreshPage(): void,
    selected: { selectedRowKeys: Array<string|number>, selectedRows: Array<any>},
    rowSelection: {
        selectedRowKeys: Array<string|number>,
        onChange(selectedRowKeys: Array<string|number>, selectedRows: Array<any>): void;
    },
    paginationProps: PaginationProps,
    qs: any,
}

interface UseTable {
    /**
     * SarchTable 对应封装Hook，抽取了统一的筛选、查询、重置、选择列、分页的逻辑
     * @param {ListAction} listAction @type 查询列表 effect action
     * @param {*} form Form.create() 对应实例
     * @param {UseTableOptions} useTableOptions 额外参数
     * @return {TableProps}
     */
    (listAction: ListAction, form: any, useTableOptions?: UseTableOptions): TableProps;
}

declare const useTable: UseTable;

export default useTable;
