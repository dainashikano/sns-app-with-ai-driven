import '@testing-library/jest-dom';

// URLクエリパラメータのモック
window.URLSearchParams = jest.fn(() => ({
  get: jest.fn(),
  set: jest.fn(),
  delete: jest.fn(),
  toString: jest.fn(),
})) as any; 