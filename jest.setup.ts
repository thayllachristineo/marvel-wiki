import '@testing-library/jest-dom';
import 'cross-fetch/polyfill';

jest.mock('config', () => ({
  config: {
    marvelPrivateKey: 'private_key',
    marvelPublicKey: 'public_key',
    marvelBaseUrl: 'https://example.com',
  },
}));
