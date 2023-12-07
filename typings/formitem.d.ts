interface QueryCondition {
    inputType: string;
    title: string;
    key: string;
    label: string;
    value?: any;
    ColConfig?: any;
    formItemLayout?: any;
    itemConfig?: {
        initialValue: any;
        rules?: Array<any>;
        [props: string]: any;
    },
    componentsConfig?: {
        placeholder: string;
        [props: string]: any;
    },
}

export default QueryCondition;
