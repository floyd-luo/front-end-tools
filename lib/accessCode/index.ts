const randomString = (e?:number) => {
    e = e || 32;
    let t:string = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz',
        a:number = t.length,
        n:string = '';
    for (let i:number = 0; i < e; i++) {
        n += t.charAt(Math.floor(Math.random() * a));
    }
    return n;
};
const Random = (min, max) => {
    return Math.round(Math.random() * (max - min)) + min;
};
const getAccessCode = (code:string) => {
    const s = randomString();
    const n = Random(0, s.length - 1);
    return s.slice(0, n) + code + s.slice(n);
};
export default getAccessCode;