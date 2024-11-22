export function simulateApi<T>(data: T, delay: number = 1000): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
}
