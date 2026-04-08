/**
 * glossary.es.js — Spanish glossary terms
 */

export const GLOSSARY_TERMS_ES = [
  {
    id: 'mcp',
    word: 'MCP',
    metaphor: 'El contrato invisible del mago',
    definition: 'Model Context Protocol — una forma estándar para que los clientes de IA descubran y llamen herramientas, recursos y prompts expuestos por un servidor.',
  },
  {
    id: 'stdio',
    word: 'STDIO',
    metaphor: 'El túnel de mensajes hacia y desde la cámara del mago',
    definition: 'Entrada/Salida Estándar — el canal de comunicación por defecto de un servidor MCP. Los mensajes del cliente entran por STDIN; las respuestas regresan por STDOUT.',
  },
  {
    id: 'stdin',
    word: 'STDIN',
    metaphor: 'La tubería que lleva mensajes HACIA ADENTRO de la cámara del mago',
    definition: 'Entrada estándar — el flujo por donde un servidor MCP lee los mensajes JSON-RPC entrantes enviados por el cliente.',
  },
  {
    id: 'stdout',
    word: 'STDOUT',
    metaphor: 'La tubería que lleva respuestas HACIA AFUERA de la cámara del mago',
    definition: 'Salida estándar — el flujo por donde un servidor MCP escribe sus respuestas JSON-RPC de vuelta al cliente.',
  },
  {
    id: 'stderr',
    word: 'STDERR',
    metaphor: 'El humo de advertencia que sale de la cámara',
    definition: 'Error estándar — el flujo usado para registros de depuración, advertencias y mensajes de error. Los clientes no leen STDERR como parte del protocolo; es solo para visibilidad del desarrollador.',
  },
  {
    id: 'tool',
    word: 'Herramienta',
    metaphor: 'Un hechizo — una habilidad nombrada que el mago puede lanzar',
    definition: 'Una función llamable expuesta por un servidor MCP. Los clientes pueden descubrir herramientas con tools/list e invocarlas con argumentos específicos.',
  },
  {
    id: 'resource',
    word: 'Recurso',
    metaphor: 'Un estante de biblioteca del que el mago puede leer',
    definition: 'Una fuente de datos expuesta por un servidor MCP. Los clientes pueden leer recursos para obtener contexto o archivos.',
  },
  {
    id: 'prompt',
    word: 'Prompt',
    metaphor: 'Un pergamino mentor con guía predefinida',
    definition: 'Una plantilla de instrucciones reutilizable expuesta por un servidor MCP. Los clientes pueden recuperar prompts y completar los parámetros.',
  },
  {
    id: 'jsonrpc',
    word: 'JSON-RPC',
    metaphor: 'El formato estructurado del pergamino de hechizos',
    definition: 'El formato de mensajes utilizado por MCP. Cada solicitud tiene un método, id y parámetros opcionales. Cada respuesta tiene un resultado o error que coincide con el id.',
  },
  {
    id: 'uv',
    word: 'UV',
    metaphor: 'La forja veloz para entornos Python',
    definition: 'Un instalador de paquetes Python y gestor de entornos virtuales ultrarrápido. UV puede crear entornos y ejecutar proyectos Python mucho más rápido que pip + venv.',
  },
  {
    id: 'tools_list',
    word: 'tools/list',
    metaphor: 'Preguntar al mago: "¿Qué hechizos conoces?"',
    definition: 'Un método del protocolo MCP que el cliente llama para descubrir todas las herramientas que expone el servidor. El servidor responde con nombres, descripciones y esquemas de parámetros.',
  },
  {
    id: 'client',
    word: 'Cliente MCP',
    metaphor: 'El aprendiz llamando a la puerta de la cámara del mago',
    definition: 'Cualquier aplicación o modelo de IA que se conecta a un servidor MCP para descubrir y llamar sus herramientas, recursos y prompts.',
  },
  {
    id: 'decorator',
    word: '@mcp.tool()',
    metaphor: 'La marca de registro de hechizos',
    definition: 'Un decorador Python que registra una función como herramienta MCP, haciéndola descubrible y llamable por clientes conectados.',
  },
  {
    id: 'virtual_env',
    word: 'Entorno virtual',
    metaphor: 'Una biblioteca de hechizos privada para tu proyecto',
    definition: 'Un entorno Python aislado que contiene solo los paquetes que tu proyecto necesita, evitando conflictos con otros proyectos.',
  },
];
