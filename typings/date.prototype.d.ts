export {};

declare global {
    interface Date {
        /**
         * 格式化时间
         * @param format 日期模板字符串，例如 yyyy/MM/dd hh:mm:ss
         *               yyyy 年份
         *               MM 月份
         *               dd 日期
         *               hh 大小写均可，小时
         *               mm 分钟
         *               ss 秒
         * @return {string}
         */
        format(format: string): string;
    }
}
