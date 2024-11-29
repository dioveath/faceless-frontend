import type { Config } from 'jest'

const config: Config = {
  setupFiles: ['./jest.setup.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/app/utils/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transform TypeScript files using ts-jest
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1', // Map `@/` to `app/`
  }
};

export default config;