# Decisiones y preguntas abiertas

## Restricciones registradas

- El modelo de red será la única fuente de verdad; los elementos de RA representarán ese estado.
- Los incidentes de seguridad serán simulaciones educativas y no afectarán redes reales.
- El Core debe poder desarrollarse y probarse en Arch Linux.
- La compatibilidad con Lens Studio debe verificarse en la versión objetivo y en Preview; no se debe inferir solo porque TypeScript esté soportado.
- El Core inicial no incorporará IA externa, servicios en la nube, persistencia ni dependencias innecesarias.

## Preguntas para una etapa posterior

- Tipos exactos del modelo del Core y reglas de validación.
- Algoritmo de grafos y criterio determinista para desempatar rutas.
- Herramienta de pruebas y formato de módulos/build de TypeScript.
- Ubicación del Core y ruta de importación en la plantilla SPECS oficial.
- Versiones objetivo de Lens Studio, SPECS, Interaction Kit y LEAF.

Este documento no resuelve decisiones de implementación de forma implícita.
