# CyberSpace AR — Instrucciones para agentes

## Restricciones del proyecto

- Trabaja de forma incremental. No afirmes que algo es compatible con Lens Studio sin probarlo en la versión objetivo y en Preview.
- Mantén el núcleo de la aplicación independiente de las API de Lens Studio. El modelo de dominio es la fuente de verdad; los objetos de RA lo representan.
- Los incidentes de seguridad deben ocurrir exclusivamente dentro del modelo educativo. No implementes ataques reales, escaneos externos ni inyección de paquetes.
- No agregues servicios en la nube, IA externa, persistencia ni dependencias sin una necesidad concreta y la aprobación del usuario.
- No fabriques archivos de proyecto de Lens Studio ni documentos de planificación de Devpost que deban generarse con las herramientas oficiales.

## Verificación según la plataforma

- Arch Linux: comprobaciones del Core en TypeScript y pruebas automatizadas.
- Entorno Lens Studio: importar el proyecto, compilar scripts, trabajar con CLAD/MCP, probar interacciones, Preview y LEAF.
- Informa estos resultados por separado. Que una prueba pase en Arch no significa que también pase en Preview.

## Acuerdo de trabajo

- Comunícate con el usuario en español. Mantén en español la documentación del repositorio; conserva en inglés los identificadores de código y los nombres propios de herramientas.
- Antes de implementar una fase, explica el siguiente paso pequeño y qué archivos modificarás. Respeta el alcance aprobado.
- No instales dependencias ni cambies decisiones de arquitectura sin autorización del usuario.
- No hagas commits, pushes ni publicaciones sin autorización explícita.
