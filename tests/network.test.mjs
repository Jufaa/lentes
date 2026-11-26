import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Network } from '../core/network/network.ts';

function lab() {
  const network = new Network();
  network.addDevice({ id: 'pc', name: 'Workstation', type: 'computer' });
  network.addDevice({ id: 'sw', name: 'Switch', type: 'switch' });
  return network;
}

test('queries devices by unique ID', () => {
  const network = lab();
  assert.equal(network.getDevice('pc').name, 'Workstation');
  assert.throws(() => network.addDevice({ id: 'pc', name: 'Duplicate', type: 'computer' }));
  assert.equal(network.getDevice('pc').name, 'Workstation');
});

test('connects and disconnects in either direction', () => {
  const network = lab();
  network.connect('pc', 'sw');
  assert.deepEqual(network.neighbors('pc'), ['sw']);
  assert.deepEqual(network.neighbors('sw'), ['pc']);
  assert.throws(() => network.connect('sw', 'pc'));
  assert.equal(network.disconnect('sw', 'pc'), true);
  assert.deepEqual(network.neighbors('pc'), []);
  assert.deepEqual(network.neighbors('sw'), []);
});

test('rejects self-links and unknown endpoints without changing the graph', () => {
  const network = lab();
  assert.throws(() => network.connect('pc', 'pc'));
  assert.throws(() => network.connect('pc', 'missing'));
  assert.deepEqual(network.neighbors('pc'), []);
});

test('removing a device also removes its links', () => {
  const network = lab();
  network.connect('pc', 'sw');
  assert.equal(network.removeDevice('sw'), true);
  assert.equal(network.getDevice('sw'), undefined);
  assert.deepEqual(network.neighbors('pc'), []);
});
