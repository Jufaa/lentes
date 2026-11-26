import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ProtectServerLab } from '../core/network/protect-server.ts';

test('loads a six-device topology and restores it on reset', () => {
  const lab = new ProtectServerLab();
  assert.deepEqual(lab.network.neighbors('switch'), ['firewall', 'workstation-a', 'workstation-b', 'server']);
  assert.deepEqual(lab.network.neighbors('gateway'), ['firewall']);
  lab.network.removeDevice('server');
  assert.equal(lab.send('workstation-a', 'server', 'legitimate').outcome, 'dropped');
  lab.reset();
  assert.equal(lab.network.getDevice('server').type, 'server');
  assert.equal(lab.completed, false);
  assert.equal(lab.send('gateway', 'server', 'unauthorized').outcome, 'delivered');
});

test('requires observed traffic before and after applying a defense', () => {
  const lab = new ProtectServerLab();
  assert.deepEqual(lab.send('gateway', 'server', 'unauthorized'), {
    outcome: 'delivered', path: ['gateway', 'firewall', 'switch', 'server']
  });
  lab.enableDefense();
  assert.equal(lab.completed, false);
  assert.deepEqual(lab.send('gateway', 'server', 'unauthorized'), {
    outcome: 'blocked', path: ['gateway', 'firewall']
  });
  assert.equal(lab.completed, false);
  assert.equal(lab.send('gateway', 'server', 'legitimate').outcome, 'delivered');
  assert.equal(lab.completed, true);
  lab.reset();
  assert.equal(lab.completed, false);
});
