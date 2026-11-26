# Requisitos

## P0 — MVP

- Representar dispositivos y conexiones independientemente de la capa de RA.
- Crear y validar la topología predefinida Protect the Server.
- Simular tráfico legítimo y no autorizado de forma determinista.
- Aplicar reglas de firewall que bloqueen los paquetes no autorizados que coincidan con ellas y permitan el tráfico legítimo.
- Registrar incidentes abstractos y sus consecuencias únicamente dentro del modelo virtual.
- Evaluar los objetivos del desafío a partir del estado real de la simulación, no de colores ni mensajes de presentación.
- Emitir eventos para una futura visualización de RA y ofrecer explicaciones educativas locales.
- Integrar y validar la experiencia en Lens Studio Preview antes de considerar completo el MVP.

## P1 — después de integrar y probar el P0

Conceptos básicos de protocolos, latencia/congestión, controles defensivos más completos, varios desafíos, asistencia contextual de IA e interacciones espaciales avanzadas.

## P2 — opcional

Generación de desafíos personalizados, interacciones por voz y persistencia avanzada.

## Seguridad y plataformas

- Las amenazas son eventos educativos abstractos. No se implementará malware real, explotación de vulnerabilidades, escaneo externo, inyección de paquetes ni ataques contra redes físicas.
- El Core determinista debe funcionar sin un servicio de IA externo.
- Las API específicas de Lens Studio deben permanecer fuera del Core.
- Las pruebas del Core en Arch deben diferenciarse de la integración y validación en Preview.

## Requisitos de la hackathon

Crear una Lens nueva para SPECS durante el período de participación; usar el Skill Pack requerido de Devpost y el flujo de CLAD/Lens Studio/MCP; incluir en el repositorio el proyecto de Lens Studio y los documentos de planificación generados; y entregar un video público de YouTube de menos de tres minutos que muestre Lens Studio Preview. Consultar el [reglamento oficial](https://learn-specs.devpost.com/rules).
