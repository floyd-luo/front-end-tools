import QueryCondition from '../formitem';

interface setStateFunction {
    (value: any): void;
}

interface FormItemProps {
    filterCondition: Array<QueryCondition>;
    setFilterCondition: setStateFunction;
    updateTimes: Array<any>;
    setUpdateTimes: setStateFunction;
}

interface UseFormItem {
    /**
     * 根据inputs变化，使用useEffect修改FormItem的表单属性，返回state化的conditions与更新次数
     * @param {Array} initFilterCondition
     * @param {Array} inputs
     * @param {*} mapper 形如 {inputTitle: queryCondition} 的对象
     * @return {FormItemProps}
     */
    (initFilterCondition: Array<QueryCondition>, inputs: Array<any>, mapper: any): FormItemProps;
}

export const useFormItem: UseFormItem;

export default useFormItem;
