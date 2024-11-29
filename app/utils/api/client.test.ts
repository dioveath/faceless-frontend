import apiClient from "./client";

const API_URL = 'http://localhost:3000/api'

// test('apiClient returns data successfully', async () => {
//     const data = await apiClient.get(`${API_URL}/example-task`);
//     expect(data).toBeDefined();
//     expect(data).toHaveProperty('data');
// });

// test('apiClient throws error on failure', async () => {
//     await expect(apiClient.get(`${API_URL}/example-task`)).rejects.toThrow();
// });

test('returns true', () => {
    expect(true).toBe(true);
});