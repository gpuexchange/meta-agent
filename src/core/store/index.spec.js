import { promisify } from 'util';
import { createStore } from 'redux';

import store from './index';

describe('store', () => {
  describe('subscribe', () => {
    it('should trigger subscription following set', async () => {
      const exports = await promisify(store)({}, {});

      expect(Object.keys(exports)).toContain('store');

      const storeService = exports.store;
      expect(Object.keys(storeService)).toContain('set');
      expect(Object.keys(storeService)).toContain('get');
      expect(Object.keys(storeService)).toContain('subscribe');

      const specificSubscriber = jest.fn();
      const wildcardSubscriber = jest.fn();

      storeService.subscribe(specificSubscriber, 'hello');
      storeService.subscribe(wildcardSubscriber);
      storeService.set('hello.world', 'Australia');

      expect(specificSubscriber.mock.calls.length).toBe(1);
      expect(wildcardSubscriber.mock.calls.length).toBe(1);

      expect(specificSubscriber.mock.calls[0][0]).toEqual({ world: 'Australia' });
      expect(wildcardSubscriber.mock.calls[0][0])
        .toEqual({ hello: { world: 'Australia' } });
    });
  });
});
