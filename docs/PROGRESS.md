# Progreso

Última actualización: 2026-11-26

## Fase actual

Fase 1 — modelo de dominio de red.

## Completado

- Se verificó que el entorno es Arch Linux y se comprobaron Node.js, npm, Git y Codex CLI.
- Se verificaron la fecha límite oficial de la hackathon y sus principales requisitos de entrega.
- Se revisaron el Skill Pack oficial de Devpost y los requisitos previos de `plan-lens`.
- Se revisó la documentación oficial de TypeScript, módulos, estructura del proyecto, MCP y LEAF de Lens Studio.
- Se inicializó el repositorio Git local en la rama `main`.
- Se documentaron la propuesta de arquitectura, las plataformas, la hoja de ruta y el plan de pruebas.

## Pendiente o sin verificar

- No se instalaron dependencias.
- No se generó el documento oficial de `plan-lens`: este espacio no tiene un proyecto SPECS `.esproj`, Lens Studio, CLAD ni conexión MCP.
- No se ejecutaron compilaciones de Lens Studio ni pruebas en Preview o LEAF.
- No se validó en gafas SPECS físicas.

## Próximo paso

Preparar la primera sesión con Lens Studio.

## Fase 1 — Primer incremento

Se añadió un grafo de dispositivos y enlaces bidireccionales en `core/network/network.ts`. El modelo rechaza identificadores duplicados, enlaces a dispositivos inexistentes, autoenlaces y enlaces duplicados; al eliminar un dispositivo, elimina sus enlaces.

Para comprobarlo desde Arch con Node.js 22.23.2: `node --test`. Estas pruebas no realizan una comprobación estática de tipos ni validan Lens Studio. La topología predefinida y el reinicio están implementados en el escenario descrito abajo.

## Escenario ejecutable: Protect the Server

`core/network/protect-server.ts` carga seis dispositivos y cinco conexiones, calcula rutas por cantidad de saltos y devuelve el recorrido y resultado de cada envío virtual. El desafío registra la entrega previa de tráfico no autorizado y comprueba que, tras activar la defensa, ese tráfico se bloquee en el firewall y el legítimo llegue al servidor. El reinicio restaura la topología y limpia la defensa y el progreso.

Se ejecutó `node --test`: seis pruebas aprobadas. La defensa es específica del escenario: no sustituye un motor configurable ni simula redes reales. La validación en Lens Studio sigue pendiente.

## Motor de tráfico por pasos

El motor en `core/simulation/traffic.ts` avanza un salto por paquete en cada paso, devuelve eventos y cuenta paquetes entregados, bloqueados y descartados. Las reglas se aplican en el dispositivo alcanzado y la primera coincidencia decide; si no hay coincidencias, el tráfico continúa. El desafío usa este motor para obtener sus resultados. La suite de Arch pasó las ocho pruebas con `node --test`.

## Demostración local y entrega a integración

- El Core expone `enqueue` y `step` para conectar acciones y animar un salto por evento. También permite aislar y restaurar dispositivos, reiniciar el laboratorio y consultar contadores y pistas locales.
- En Arch, `node --test` pasó las 11 pruebas y `node tools/demo.mjs` mostró 3 entregas, 1 bloqueo y el desafío completado.
- La comprobación estática del Core pasó con TypeScript 5.9.3 y `tsconfig.json`. El flujo local cubre el desafío principal, no el MVP en Lens Studio.

### Primera sesión con Lens Studio

1. Crear el proyecto SPECS con la plantilla oficial, conectar CLAD/MCP y completar `plan-lens`.
2. Probar una importación mínima del Core y un salto en Preview antes de elegir la estrategia definitiva de incorporación de fuentes.
3. Conectar controles de la escena con las operaciones del laboratorio y usar los eventos de `step` para animar paquetes. El adaptador no debe decidir si se permite el tráfico.
4. Validar selección, movimiento, controles defensivos, desafío y reinicio en Preview; usar LEAF para interacciones compatibles. Registrar por separado cualquier limitación del simulador.

La propagación educativa se limita a marcar dispositivos del grafo virtual como comprometidos, un salto por paso. Respeta el aislamiento y permite restaurar dispositivos; no ejecuta código ni genera tráfico de red real.
