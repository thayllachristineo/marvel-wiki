import '@testing-library/jest-dom';
import 'cross-fetch/polyfill';

jest.mock('config', () => ({
  config: {
    marvelPrivateKey: 'private_key',
    marvelPublicKey: 'public_key',
    marvelBaseUrl: 'https://example.com',
  },
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
