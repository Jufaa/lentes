# Propuesta de arquitectura

Este documento registra las separaciones propuestas por el usuario. No afirma que ya se hayan validado en Lens Studio.

## Capas propuestas

| Capa | Responsabilidad |
|---|---|
| Core | Modelo de red, grafo, simulación, seguridad, desafíos, estado de la aplicación, eventos de dominio y explicaciones educativas locales |
| Adaptadores | Solo las interfaces necesarias para conectar el reloj de simulación, la entrada, la escena, la visualización, el almacenamiento o un proveedor opcional del tutor |
| RA | Escenas de Lens Studio/SPECS, interacciones espaciales, menús, renderizado y animaciones |
| Infraestructura | Servicios externos o persistencia opcionales, únicamente si un requisito posterior los justifica |

El modelo de red debe ser la única fuente de verdad. Los objetos de la escena representan su estado y no contienen las reglas de simulación.

## Restricción de compatibilidad

Lens Studio documenta compatibilidad nativa de TypeScript con SPECS y un entorno de scripts basado en ES2019. Eso no garantiza que cualquier paquete de npm, opción del compilador o empaquetador sea compatible. El Core debe mantenerse independiente de la plataforma y la estructura elegida de módulos debe validarse en el proyecto SPECS real y en Preview antes de depender de ella.

## Aspectos pendientes de validar

- La versión de Lens Studio y la plantilla SPECS disponibles en el equipo de integración.
- Dónde ubicar el código del Core y cómo importarlo desde esa plantilla.
- Qué configuración de TypeScript y sintaxis admite esa versión.
- Si la estructura de módulos elegida funciona tanto con las pruebas de Arch como con el proyecto.

Fuentes: [TypeScript en Lens Studio](https://docs.lensstudio.com/develop/foundation/scripting/typescript), [módulos de scripts](https://docs.lensstudio.com/develop/foundation/scripting/script-modules), [estructura del proyecto](https://docs.lensstudio.com/develop/foundation/lens-studio-workflow/advanced/source-control).
