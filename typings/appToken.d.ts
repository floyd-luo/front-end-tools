interface AppTokenItem {
    [key: string]: string;
}
interface AppToken {
    setAppToken(obj: AppTokenItem): void;

    verifyToken(getAppToken:()=>void): boolean;

}

declare const appToken:AppToken;

export default AppToken;
