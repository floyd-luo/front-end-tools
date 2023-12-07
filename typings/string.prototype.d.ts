export {};

declare global {
    interface String {
        /**
         * 连字符转驼峰
         */
        hyphenToHump(): string;

        /**
         * 驼峰转连字符
         */
        humpToHyphen(): string;
    }
}
