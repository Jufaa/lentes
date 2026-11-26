export type DeviceType = 'computer' | 'server' | 'switch' | 'router' | 'firewall' | 'internet-gateway';

export interface NetworkDevice {
  readonly id: string;
  readonly name: string;
  readonly type: DeviceType;
}

export class Network {
  private readonly devices = new Map<string, NetworkDevice>();
  private readonly links = new Map<string, Set<string>>();

  addDevice(device: NetworkDevice): void {
    if (this.devices.has(device.id)) throw new Error('Duplicate device ID');
    this.devices.set(device.id, { ...device });
    this.links.set(device.id, new Set());
  }

  getDevice(id: string): NetworkDevice | undefined {
    const device = this.devices.get(id);
    return device ? { ...device } : undefined;
  }

  neighbors(id: string): readonly string[] {
    return [...this.requireLinks(id)];
  }

  connect(first: string, second: string): void {
    const source = this.requireLinks(first);
    const target = this.requireLinks(second);
    if (first === second) throw new Error('Cannot connect a device to itself');
    if (source.has(second)) throw new Error('Connection already exists');
    source.add(second);
    target.add(first);
  }

  disconnect(first: string, second: string): boolean {
    const source = this.requireLinks(first);
    const target = this.requireLinks(second);
    if (!source.delete(second)) return false;
    target.delete(first);
    return true;
  }

  removeDevice(id: string): boolean {
    const links = this.links.get(id);
    if (!links) return false;
    for (const neighbor of links) this.disconnect(id, neighbor);
    this.links.delete(id);
    return this.devices.delete(id);
  }

  private requireLinks(id: string): Set<string> {
    const links = this.links.get(id);
    if (!links) throw new Error('Unknown device ID');
    return links;
  }
}
