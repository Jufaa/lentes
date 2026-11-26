import { ProtectServerLab } from '../core/network/protect-server.ts';

const lab = new ProtectServerLab();

function show(traffic) {
  const result = lab.send('gateway', 'server', traffic);
  console.log(`${traffic}: ${result.outcome} (${result.path.join(' → ')})`);
}

show('legitimate');
show('unauthorized');
lab.enableDefense();
show('unauthorized');
show('legitimate');
console.log(lab.feedback);
console.log(lab.counts);
console.log(lab.completed ? 'Challenge completed' : 'Challenge incomplete');
if (!lab.completed) process.exitCode = 1;
