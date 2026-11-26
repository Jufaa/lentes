import { Network, type DeviceType } from './network.ts';

import { TrafficEngine, type Traffic, type TrafficEvent } from '../simulation/traffic.ts';

type Outcome = 'delivered' | 'blocked' | 'dropped';

function createTopology(): Network {
  const network = new Network();
  const devices: [string, string, DeviceType][] = [
    ['gateway', 'Internet Gateway', 'internet-gateway'],
    ['firewall', 'Firewall', 'firewall'],
    ['switch', 'Switch', 'switch'],
    ['workstation-a', 'Workstation A', 'computer'],
    ['workstation-b', 'Workstation B', 'computer'],
    ['server', 'Server', 'server'],
  ];
  for (const [id, name, type] of devices) network.addDevice({ id, name, type });
  network.connect('gateway', 'firewall');
  network.connect('firewall', 'switch');
  for (const id of ['workstation-a', 'workstation-b', 'server']) network.connect('switch', id);
  return network;
}

function findPath(network: Network, source: string, target: string, isolated: ReadonlySet<string>): string[] {
  if (isolated.has(source) || isolated.has(target)) return [];
  if (!network.getDevice(source) || !network.getDevice(target)) return [];
  const queue = [[source]];
  const visited = new Set([source]);
  for (const path of queue) {
    const current = path[path.length - 1];
    if (current === target) return path;
    for (const next of network.neighbors(current)) {
      if (visited.has(next) || isolated.has(next)) continue;
      visited.add(next);
      queue.push([...path, next]);
    }
  }
  return [];
}

export class ProtectServerLab {
  private topology = createTopology();
  private engine = new TrafficEngine();
  private compromised = new Set<string>();
  private isolated = new Set<string>();
  private pending = new Map<number, { traffic: Traffic; challenged: boolean }>();
  private defense = false;
  private incidentObserved = false;
  private blockedObserved = false;
  private legitimateObserved = false;

  get network(): Network { return this.topology; }

  get completed(): boolean {
    return this.incidentObserved && this.blockedObserved && this.legitimateObserved;
  }

  reset(): void {
    this.topology = createTopology();
    this.engine.reset();
    this.isolated.clear();
    this.compromised.clear();
    this.pending.clear();
    this.defense = false;
    this.incidentObserved = false;
    this.blockedObserved = false;
    this.legitimateObserved = false;
  }

  enableDefense(): void {
    this.defense = true;
    this.engine.setRules([{
      device: 'firewall', traffic: 'unauthorized', action: 'block', source: 'gateway', target: 'server',
    }]);
  }

  get counts() { return this.engine.counts; }

  get feedback(): string {
    if (this.completed) return 'Unauthorized traffic was blocked and legitimate traffic still reached the server.';
    if (!this.incidentObserved) return 'Send simulated unauthorized traffic from the gateway to observe the issue.';
    if (!this.defense) return 'Enable the firewall defense to protect the server.';
    if (!this.blockedObserved) return 'Send unauthorized traffic again and verify it stops at the firewall.';
    return 'Verify that legitimate traffic still reaches the server.';
  }

  setIsolated(id: string, isolated: boolean): void {
    if (!this.topology.getDevice(id)) throw new Error('Unknown device ID');
    if (isolated) this.isolated.add(id);
    else this.isolated.delete(id);
  }

  startIncident(id: string): void {
    if (!this.topology.getDevice(id)) throw new Error('Unknown device ID');
    this.compromised.add(id);
  }

  isCompromised(id: string): boolean {
    return !!this.topology.getDevice(id) && this.compromised.has(id);
  }

  advanceIncident(): string[] {
    const affected = new Set<string>();
    for (const source of this.compromised) {
      if (!this.isCompromised(source) || this.isolated.has(source)) continue;
      for (const target of this.topology.neighbors(source)) {
        if (!this.isCompromised(target) && !this.isolated.has(target)) affected.add(target);
      }
    }
    for (const id of affected) this.compromised.add(id);
    return [...affected];
  }

  restoreDevice(id: string): void {
    this.setIsolated(id, false);
    this.compromised.delete(id);
  }

  enqueue(source: string, target: string, traffic: Traffic): number {
    const path = findPath(this.topology, source, target, this.isolated);
    const id = this.engine.enqueue(path, traffic);
    this.pending.set(id, { traffic, challenged: source === 'gateway' && target === 'server' && path.includes('firewall') });
    return id;
  }

  step(): TrafficEvent[] {
    const events = this.engine.tick((from, to) =>
      !this.isolated.has(from) && !this.isolated.has(to) &&
      !!this.topology.getDevice(from) && this.topology.neighbors(from).includes(to)
    );
    for (const event of events) {
      if (event.outcome === 'forwarded') continue;
      const packet = this.pending.get(event.packet);
      this.pending.delete(event.packet);
      if (!packet?.challenged) continue;
      if (!this.defense && packet.traffic === 'unauthorized' && event.outcome === 'delivered') this.incidentObserved = true;
      if (event.outcome === 'blocked') this.blockedObserved = true;
      if (this.defense && packet.traffic === 'legitimate' && event.outcome === 'delivered') this.legitimateObserved = true;
    }
    return events;
  }

  send(source: string, target: string, traffic: Traffic): { outcome: Outcome; path: string[] } {
    const packet = this.enqueue(source, target, traffic);
    for (;;) {
      for (const event of this.step()) {
        if (event.packet === packet && event.outcome !== 'forwarded') {
          return { outcome: event.outcome, path: event.path };
        }
      }
    }
  }
}
