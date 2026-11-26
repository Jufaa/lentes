import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TrafficEngine } from '../core/simulation/traffic.ts';

test('advances one link per tick and applies configurable rules at the firewall', () => {
  const engine = new TrafficEngine();
  engine.setRules([{ device: 'firewall', traffic: 'unauthorized', action: 'block' }]);
  const path = ['gateway', 'switch', 'firewall', 'server'];
  const packet = engine.enqueue(path, 'unauthorized');
  assert.equal(engine.tick()[0].outcome, 'forwarded');
  assert.deepEqual(engine.tick(), [{ packet, outcome: 'blocked', path: path.slice(0, 3) }]);
  engine.enqueue(path, 'legitimate');
  engine.tick();
  engine.tick();
  assert.equal(engine.tick()[0].outcome, 'delivered');
  assert.deepEqual(engine.counts, { blocked: 1, delivered: 1, dropped: 0 });
});

test('drops missing routes, pauses without consuming work and resets state', () => {
  const engine = new TrafficEngine();
  engine.enqueue([], 'legitimate');
  engine.pause();
  assert.deepEqual(engine.tick(), []);
  engine.resume();
  assert.equal(engine.tick()[0].outcome, 'dropped');
  engine.enqueue(['a', 'b'], 'legitimate');
  engine.reset();
  assert.deepEqual(engine.tick(), []);
  assert.deepEqual(engine.counts, { blocked: 0, delivered: 0, dropped: 0 });
});
