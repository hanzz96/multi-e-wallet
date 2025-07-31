import { default as Redlock } from 'redlock';
import redis from '../lib/redis';

export const redlock = new Redlock([redis], {
  retryCount: 3,
  retryDelay: 200,
  retryJitter: 100,
});

/**
 * Acquires a Redis lock for one or more resources.
 * @param resourceKeys - A single key or array of keys to lock
 * @param ttl - Lock time-to-live in milliseconds (default: 5000 ms)
 */
export const acquireLock = async (
  resourceKeys: string | string[],
  ttl = 5000
): Promise<{ release: () => Promise<unknown> }> => {
  try {
    const lock = await redlock.acquire(
      Array.isArray(resourceKeys) ? resourceKeys : [resourceKeys],
      ttl
    );

    return {
      release: () => lock.release(), // returns Promise<ExecutionResult>
    };
  } catch (err: any) {
    err.name = 'LockError';
    throw err;
  }
};