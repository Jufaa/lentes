# CyberSpace AR

Un laboratorio inmersivo de ciberseguridad y redes para SPECS.

## Estado actual

La planificación de la Fase 0 está en `docs/`. El repositorio se inicializó desde Arch Linux. La Fase 1 comenzó con el modelo de red y sus pruebas. Todavía no hay proyecto de Lens Studio ni documento de planificación de Devpost generado.

## Qué se puede validar en cada plataforma

| Trabajo | Entorno | Estado |
|---|---|---|
| Desarrollo del Core en TypeScript y pruebas automatizadas | Arch Linux | En curso; modelo de red inicial probado |
| Proyecto SPECS, CLAD, Lens Studio MCP, Preview y LEAF | Lens Studio 5.25 o posterior en un sistema de escritorio compatible | Pendiente de acceso |

Que una prueba pase en Arch no demuestra que el código compile o funcione en Lens Studio Preview.

## Documentación del proyecto

- [Descripción general](docs/PROJECT_OVERVIEW.md)
- [Propuesta de arquitectura](docs/ARCHITECTURE.md)
- [Requisitos](docs/REQUIREMENTS.md)
- [Hoja de ruta](docs/ROADMAP.md)
- [Plan de pruebas](docs/TEST_PLAN.md)
- [Decisiones](docs/DECISIONS.md)
- [Progreso](docs/PROGRESS.md)

## Requisitos de entrega de la hackathon

La fecha límite oficial es el 7 de diciembre de 2026 a las 17:00 EST. La entrega requiere una Lens nueva para SPECS, planificada con el Skill Pack de Devpost Learn y desarrollada con CLAD, Lens Studio y Lens Studio MCP. El repositorio debe incluir el proyecto de Lens Studio y los documentos de planificación generados dentro de `devpost/`. El video público de YouTube debe durar menos de tres minutos y mostrar la Lens en Lens Studio Preview.

Fuentes: [reglamento oficial](https://learn-specs.devpost.com/rules), [Skill Pack oficial](https://github.com/challengepost/learn-specs).

## Probar el laboratorio en Arch

Con Node.js 22.23.2 (sin instalar paquetes):

```sh
node --test
node tools/demo.mjs
```

La demo muestra el tráfico virtual antes y después de activar el firewall y termina con `Challenge completed`. La escena y sus interacciones no forman parte de esta demo.
