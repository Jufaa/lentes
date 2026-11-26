export type Traffic = 'legitimate' | 'unauthorized';
export type Outcome = 'forwarded' | 'blocked' | 'delivered' | 'dropped';
export interface Rule {
  device: string;
  traffic: Traffic;
  action: 'allow' | 'block';
  source?: string;
  target?: string;
}
export interface TrafficEvent {
  packet: number;
  outcome: Outcome;
  path: string[];
}

export class TrafficEngine {
  private queue: { id: number; path: string[]; traffic: Traffic; hop: number }[] = [];
  private rules: Rule[] = [];
  private sequence = 0;
  private paused = false;
  private totals = { blocked: 0, delivered: 0, dropped: 0 };

  get counts() { return { ...this.totals }; }

  setRules(rules: readonly Rule[]): void { this.rules = rules.map(rule => ({ ...rule })); }

  enqueue(path: readonly string[], traffic: Traffic): number {
    const id = ++this.sequence;
    this.queue.push({ id, path: [...path], traffic, hop: 0 });
    return id;
  }

  pause(): void { this.paused = true; }
  resume(): void { this.paused = false; }

  reset(): void {
    this.queue = [];
    this.rules = [];
    this.sequence = 0;
    this.paused = false;
    this.totals = { blocked: 0, delivered: 0, dropped: 0 };
  }

  tick(canTraverse?: (from: string, to: string) => boolean): TrafficEvent[] {
    if (this.paused) return [];
    const pending = this.queue;
    this.queue = [];
    return pending.map(packet => {
      const { id, path, traffic } = packet;
      if (packet.hop + 1 < path.length) {
        if (canTraverse && !canTraverse(path[packet.hop], path[packet.hop + 1])) {
          this.totals.dropped++;
          return { packet: id, outcome: 'dropped', path: path.slice(0, packet.hop + 1) };
        }
        packet.hop++;
      }
      const device = path[packet.hop];
      const rule = this.rules.find(rule =>
        rule.device === device && rule.traffic === traffic &&
        (rule.source === undefined || rule.source === path[0]) &&
        (rule.target === undefined || rule.target === path[path.length - 1])
      );
      const outcome: Outcome = path.length === 0 ? 'dropped'
        : rule?.action === 'block' ? 'blocked'
        : packet.hop === path.length - 1 ? 'delivered' : 'forwarded';
      if (outcome === 'forwarded') this.queue.push(packet);
      else this.totals[outcome]++;
      return { packet: id, outcome, path: path.slice(0, packet.hop + 1) };
    });
  }
}
