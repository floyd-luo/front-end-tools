import {ComponentType} from 'react';

interface PermissionItem {
    id: number;
    key: string;
    title: string;
    type: number;
    checked: boolean;
    [other: string]: any;
}

interface CreatePermissionItemOptions {
    (permissionList: Array<PermissionItem>, component: ComponentType, filterProp: string): ComponentType;
}
