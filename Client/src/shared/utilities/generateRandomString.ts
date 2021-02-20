export function generateRandomstring(length: number): string {
    let value = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890';
    for (let i = 0; i < length; i++) {
        value = value.concat(chars[Math.floor(Math.random() * chars.length)])
    }
    return value
}