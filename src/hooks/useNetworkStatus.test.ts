import { renderHook, waitFor } from '@testing-library/react';
import useNetworkStatus from './useNetworkStatus';

describe('useNetworkStatus', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'navigator', {
      value: {},
      writable: true,
    });

    jest.clearAllMocks();
  });

  it('should return true when the browser is online', () => {
    Object.defineProperty(window, 'navigator', {
      value: { onLine: true },
      writable: true,
    });

    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current).toBe(true);
  });

  it('should return false when the browser is offline', () => {
    Object.defineProperty(window, 'navigator', {
      value: { onLine: false },
      writable: true,
    });

    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current).toBe(false);
  });

  it('should return true when the browser does not support connection detection', () => {
    Object.defineProperty(window, 'navigator', {
      value: {},
      writable: true,
    });

    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current).toBe(true);
  });

  it('should set the online status', () => {
    const { result } = renderHook(() => useNetworkStatus());

    window.dispatchEvent(new Event('online'));

    waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('should set the offline status', () => {
    const { result } = renderHook(() => useNetworkStatus());

    window.dispatchEvent(new Event('offline'));

    waitFor(() => {
      expect(result.current).toBe(false);
    });
  });
});
