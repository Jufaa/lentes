# Plan de pruebas

## En Arch Linux

Cuando comience la implementación del Core, se usarán pruebas unitarias deterministas para las operaciones del modelo, la conectividad y el cálculo de rutas del grafo, la entrega y el bloqueo de paquetes, los efectos de incidentes, la evaluación del firewall y los criterios del desafío. Se agregarán escenarios de integración entre la red, la simulación, la seguridad, los eventos y el estado del desafío. La simulación avanzará mediante pasos/ticks explícitos, no con temporizadores de renderizado o de tiempo real.

### Escenario de aceptación

1. Inicializar la topología Protect the Server.
2. Entregar tráfico legítimo.
3. Introducir un paquete no autorizado simulado.
4. Agregar una regla de firewall.
5. Comprobar que se bloqueó el paquete no autorizado y se entregó el legítimo.
6. Evaluar la finalización correcta del desafío.
7. Reiniciar y comprobar el estado inicial.

## En Lens Studio

Cuando estén disponibles la plantilla SPECS oficial y CLAD/MCP, validar la importación del Core y la compilación de TypeScript, la inicialización de la escena, las interacciones, la sincronización entre el modelo y la escena, la visualización de paquetes, los controles defensivos, la finalización del desafío y el reinicio en Lens Studio Preview. LEAF se usará para los escenarios de interacción compatibles con Preview.

## Cómo informar resultados

Registrar los comandos ejecutados y sus resultados observados. Marcar como pendientes las pruebas de Preview/LEAF y de hardware físico hasta ejecutarlas. Una prueba de Node.js no demuestra compatibilidad con el entorno de Lens Studio.
