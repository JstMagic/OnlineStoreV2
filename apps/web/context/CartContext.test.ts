import { describe, expect, it, vi, afterEach } from 'vitest';
import { generateUUID } from './CartContext';

const realCrypto = globalThis.crypto;

describe('generateUUID (cart id generation)', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('never calls Math.random (CWE-338: predictable cart ids are guessable bearer tokens)', () => {
    const randomSpy = vi.spyOn(Math, 'random');
    generateUUID();
    expect(randomSpy).not.toHaveBeenCalled();
  });

  it('produces well-formed, unique v4-style UUIDs', () => {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const ids = new Set(Array.from({ length: 20 }, () => generateUUID()));
    expect(ids.size).toBe(20);
    for (const id of ids) {
      expect(id).toMatch(uuidPattern);
    }
  });

  it('falls back to crypto.getRandomValues when crypto.randomUUID is unavailable, still without Math.random', () => {
    vi.stubGlobal('crypto', {
      getRandomValues: (arr: Uint8Array) => realCrypto.getRandomValues(arr),
    });
    const randomSpy = vi.spyOn(Math, 'random');

    const id = generateUUID();
    expect(id).toMatch(/^[0-9a-f-]{36}$/i);
    expect(randomSpy).not.toHaveBeenCalled();
  });

  it('fails fast instead of minting a guessable id when no CSPRNG is available', () => {
    vi.stubGlobal('crypto', {});
    expect(() => generateUUID()).toThrow();
  });
});
