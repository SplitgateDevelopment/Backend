class Utils {
    static randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    static randomString(length: number): string {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const special = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
        const chars = upper + lower + numbers + special;

        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        };
        return result;
    };

    static randomArrayElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    };
};

export default Utils;