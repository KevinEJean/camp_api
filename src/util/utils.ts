export class Util {
    public getRandomID(isstring: boolean, len: number): string {
        const chars = isstring ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '0123456789';
        let result = '';
        for (let i = 0; i < len; i++) {
            result += chars.at(Math.floor(Math.random() * chars.length))
        }
        return result;
    }
}