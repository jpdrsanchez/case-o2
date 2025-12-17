/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: { runtime: 'automatic' }
          }
        }
      }
    ]
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  }
}

export default config
