import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ProtectServerLab } from '../core/network/protect-server.ts';

test('exposes ordered hop events and educational feedback', () => {
  const lab = new ProtectServerLab();
  const id = lab.enqueue('gateway', 'server', 'unauthorized');
  assert.deepEqual(lab.step(), [{ packet: id, outcome: 'forwarded', path: ['gateway', 'firewall'] }]);
  lab.step();
  assert.equal(lab.step()[0].outcome, 'delivered');
  const feedback = lab.feedback;
  lab.enableDefense();
  assert.equal(lab.send('gateway', 'server', 'unauthorized').outcome, 'blocked');
  assert.equal(lab.send('gateway', 'server', 'legitimate').outcome, 'delivered');
  assert.notEqual(lab.feedback, feedback);
  assert.equal(lab.completed, true);
});

test('isolates a device even for queued traffic and restores connectivity', () => {
  const lab = new ProtectServerLab();
  lab.enqueue('gateway', 'server', 'legitimate');
  lab.setIsolated('firewall', true);
  assert.equal(lab.step()[0].outcome, 'dropped');
  assert.equal(lab.send('gateway', 'server', 'legitimate').outcome, 'dropped');
  lab.setIsolated('firewall', false);
  assert.equal(lab.send('gateway', 'server', 'legitimate').outcome, 'delivered');
  lab.setIsolated('server', true);
  lab.reset();
  assert.equal(lab.send('gateway', 'server', 'legitimate').outcome, 'delivered');
});

test('advances abstract compromise one hop, respects isolation, and restores devices', () => {
  const lab = new ProtectServerLab();
  lab.startIncident('switch');
  lab.setIsolated('server', true);
  assert.deepEqual(lab.advanceIncident(), ['firewall', 'workstation-a', 'workstation-b']);
  assert.equal(lab.isCompromised('gateway'), false);
  assert.equal(lab.isCompromised('server'), false);
  lab.restoreDevice('switch');
  assert.equal(lab.isCompromised('switch'), false);
  lab.reset();
  assert.equal(lab.isCompromised('firewall'), false);
});
