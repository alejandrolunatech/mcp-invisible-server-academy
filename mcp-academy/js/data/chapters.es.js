/**
 * chapters.es.js — Spanish translations for all chapter content
 */

export const CHAPTERS_ES = [
  // ──────────────────────────────────────────────────────────
  // CAPÍTULO 1 — El Salón Silencioso
  // ──────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'El Salón Silencioso',
    subtitle: 'Entendiendo STDIO',
    description: 'El salón se ha quedado en silencio. Tres antiguos tubos de mensajes se han desconectado. Vuelve a conectarlos para restaurar el flujo.',

    dialogue: [
      {
        char: 'syn', name: 'Director Syn', role: 'Arquitecto de la Academia', emoji: '🧙',
        text: 'Bienvenido, aprendiz. Algo ha ido muy mal en el Salón Silencioso. El espíritu del servidor que vive aquí… se ha vuelto invisible, incluso para nosotros.',
      },
      {
        char: 'piper', name: 'Piper', role: 'Ingeniera de Tuberías', emoji: '🔧',
        text: '¡Conozco el problema! Cada servidor MCP se comunica a través de tres flujos. Son como tuberías: STDIN lleva mensajes HACIA ADENTRO, STDOUT lleva las respuestas HACIA AFUERA y STDERR lleva el humo de advertencia.',
      },
      {
        char: 'piper', name: 'Piper', role: 'Ingeniera de Tuberías', emoji: '🔧',
        text: 'Ahora mismo, esas tuberías están desconectadas. Los mensajes del cliente no llegan a ningún lado. Por eso el servidor parece invisible: existe, pero no puede ser escuchado ni alcanzado.',
      },
      {
        char: 'syn', name: 'Director Syn', role: 'Arquitecto de la Academia', emoji: '🧙',
        text: 'Tu tarea: reconecta cada flujo con su propósito correcto. Hazlo bien y veremos fluir los primeros mensajes reales por el túnel.',
      },
    ],

    puzzle: {
      type: 'matching',
      title: 'Reconectar los Tubos de Mensajes',
      instructions: 'Haz clic en el nombre de un flujo a la izquierda y luego en su descripción correcta a la derecha para conectarlos.',
      leftItems: [
        { id: 'stdin',  label: 'STDIN',  icon: '📥', color: '#00d4ff' },
        { id: 'stdout', label: 'STDOUT', icon: '📤', color: '#10b981' },
        { id: 'stderr', label: 'STDERR', icon: '💨', color: '#f59e0b' },
      ],
      rightItems: [
        { id: 'desc_stdin',  label: 'Los mensajes entrantes del cliente entran por aquí' },
        { id: 'desc_stdout', label: 'Las respuestas normales del servidor salen por aquí' },
        { id: 'desc_stderr', label: 'Humo de advertencia — registros de depuración, no parte del protocolo' },
      ],
      matches: { stdin: 'desc_stdin', stdout: 'desc_stdout', stderr: 'desc_stderr' },
      successMsg: '✅ ¡Las tuberías brillan! Los mensajes ya pueden fluir por la cámara.',
      failureHint: 'Inténtalo de nuevo — piensa en qué entra al servidor versus qué sale.',
    },

    terminal: {
      title: 'MCP STDIO — Flujo de mensajes',
      steps: [
        { type: 'muted',    text: '# El cliente se conecta al servidor MCP mediante STDIO' },
        { type: 'muted',    text: '# El proceso del servidor arranca y lee desde STDIN' },
        { type: 'prompt',   text: '{"jsonrpc":"2.0","method":"tools/list","id":1}' },
        { type: 'muted',    text: '# → El mensaje viaja por STDIN hacia el servidor' },
        { type: 'muted',    text: '# El servidor procesa la solicitud...' },
        { type: 'response', text: '{"jsonrpc":"2.0","id":1,"result":{"tools":[{"name":"add","description":"Suma dos números"}]}}' },
        { type: 'muted',    text: '# ← La respuesta viaja por STDOUT de vuelta al cliente' },
        { type: 'warning',  text: '[STDERR] Servidor iniciado correctamente en transporte stdio' },
        { type: 'muted',    text: '# ↑ Humo de advertencia — STDERR muestra registros, NO se envía al cliente' },
        { type: 'success',  text: '# ¡El servidor ya no es invisible! Su comportamiento es visible mediante mensajes.' },
      ],
    },

    quiz: [
      {
        q: '¿Qué transporta STDIN en una configuración de servidor MCP?',
        options: [
          'Las respuestas que regresan al cliente',
          'Los mensajes entrantes del cliente',
          'Los registros de errores y la salida de depuración',
          'Los datos de registro de herramientas',
        ],
        correct: 1,
        explanation: 'STDIN (Entrada estándar) es el flujo por donde los mensajes entrantes del cliente MCP fluyen hacia el servidor. Imagínalo como la tubería que va HACIA ADENTRO de la cámara del mago.',
      },
      {
        q: '¿Por qué un servidor MCP parece "invisible" para los principiantes?',
        options: [
          'Se ejecuta en un servidor en la nube remoto',
          'Utiliza una interfaz gráfica',
          'Se comunica silenciosamente a través de flujos STDIO, sin una ventana visible',
          'Solo funciona de noche',
        ],
        correct: 2,
        explanation: 'Los servidores MCP se comunican mediante STDIN/STDOUT — no hay ventana del navegador ni interfaz visible. Parecen invisibles porque viven tranquilamente en un proceso de terminal, intercambiando mensajes estructurados.',
      },
      {
        q: '¿Para qué se usa STDERR en un servidor MCP?',
        options: [
          'Enviar resultados de herramientas al cliente',
          'Recibir solicitudes del cliente',
          'Registros de depuración y mensajes de advertencia — no parte del protocolo MCP',
          'Almacenar definiciones de herramientas',
        ],
        correct: 2,
        explanation: 'STDERR es el "humo de advertencia" — sirve para registros orientados al desarrollador, errores y salida de depuración. Los clientes MCP NO leen STDERR como parte del flujo del protocolo.',
      },
    ],

    completionDialogue: [
      {
        char: 'piper', name: 'Piper', role: 'Ingeniera de Tuberías', emoji: '🔧',
        text: '¡Mira, las tuberías están brillando! Los mensajes fluyen de nuevo. El servidor siempre estuvo ahí. Solo no podíamos escucharlo porque las tuberías estaban desconectadas.',
      },
      {
        char: 'syn', name: 'Director Syn', role: 'Arquitecto de la Academia', emoji: '🧙',
        text: 'Recuerda esto: "El servidor es invisible, pero su comportamiento se vuelve visible a través de los mensajes." ¡A la Forja de Hechizos!',
      },
    ],

    realWorldTakeaway: 'En un servidor MCP de Python real usando transporte STDIO, tu proceso de servidor lee mensajes JSON-RPC desde sys.stdin y escribe respuestas en sys.stdout. Los registros e información de depuración van a sys.stderr. Cuando ejecutas `uv run server.py`, el cliente se conecta exactamente a esos flujos.',
  },

  // ──────────────────────────────────────────────────────────
  // CAPÍTULO 2 — La Forja de Hechizos
  // ──────────────────────────────────────────────────────────
  {
    id: 2,
    title: 'La Forja de Hechizos',
    subtitle: 'Funciones Python como herramientas MCP',
    description: 'Funciones Python ordinarias esperan en la forja. Aplica la marca de registro para convertirlas en herramientas MCP descubribles.',

    dialogue: [
      {
        char: 'hexa', name: 'Hexa', role: 'Mentora de la Forja de Hechizos', emoji: '⚗️',
        text: '¡Bienvenido a la Forja de Hechizos! Todo servidor MCP poderoso comienza con el mismo secreto: las herramientas son simplemente funciones Python con una puerta de entrada.',
      },
      {
        char: 'hexa', name: 'Hexa', role: 'Mentora de la Forja de Hechizos', emoji: '⚗️',
        text: 'Escribes una función Python normal — digamos, `def add(a, b): return a + b`. Perfectamente ordinaria. Pero una vez que pones la marca mágica `@mcp.tool()` encima… se vuelve descubrible. El cliente puede encontrarla, llamarla, obtener resultados.',
      },
      {
        char: 'hexa', name: 'Hexa', role: 'Mentora de la Forja de Hechizos', emoji: '⚗️',
        text: 'Tu desafío: empareja cada hechizo de calculadora con su función Python y luego regístralos como herramientas. Cuatro hechizos. Cuatro funciones. ¡A forjar!',
      },
    ],

    puzzle: {
      type: 'matching',
      title: 'Forjar los Hechizos de Calculadora',
      instructions: 'Haz clic en una carta de hechizo a la izquierda y luego en su función Python correspondiente a la derecha para forjar la conexión.',
      leftItems: [
        { id: 'spell_add',      label: 'hechizo suma',      icon: '➕', color: '#10b981' },
        { id: 'spell_subtract', label: 'hechizo resta',     icon: '➖', color: '#ef4444' },
        { id: 'spell_multiply', label: 'hechizo multiplicación', icon: '✖️', color: '#a855f7' },
        { id: 'spell_divide',   label: 'hechizo división',  icon: '➗', color: '#f59e0b' },
      ],
      rightItems: [
        { id: 'fn_add',      label: 'def add(a, b): return a + b' },
        { id: 'fn_subtract', label: 'def subtract(a, b): return a - b' },
        { id: 'fn_multiply', label: 'def multiply(a, b): return a * b' },
        { id: 'fn_divide',   label: 'def divide(a, b): return a / b' },
      ],
      matches: { spell_add: 'fn_add', spell_subtract: 'fn_subtract', spell_multiply: 'fn_multiply', spell_divide: 'fn_divide' },
      successMsg: '✅ ¡Chispas! Los cuatro hechizos están forjados y registrados como herramientas MCP.',
      failureHint: 'Empareja cada nombre de hechizo con su operación — suma con +, resta con -, etc.',
    },

    codeExample: {
      lang: 'Python',
      title: 'Servidor MCP Calculadora',
      rawCode: `from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Calculadora")

@mcp.tool()
def add(a: int, b: int) -> int:
    """Suma dos números"""
    return a + b

@mcp.tool()
def subtract(a: int, b: int) -> int:
    """Resta b de a"""
    return a - b

@mcp.tool()
def multiply(a: int, b: int) -> int:
    """Multiplica dos números"""
    return a * b

@mcp.tool()
def divide(a: float, b: float) -> float:
    """Divide a entre b"""
    if b == 0:
        raise ValueError("¡No se puede dividir por cero!")
    return a / b

if __name__ == "__main__":
    mcp.run(transport="stdio")`,
      explanation: 'El decorador @mcp.tool() es la marca mágica: le dice a FastMCP que registre esta función como una herramienta descubrible y llamable. El docstring se convierte en la descripción de la herramienta. Las anotaciones de tipo se convierten en el esquema de parámetros.',
    },

    terminal: {
      title: 'Descubrimiento de herramientas — tools/list',
      steps: [
        { type: 'muted',    text: '# El cliente pregunta: "¿Qué hechizos conoces?"' },
        { type: 'prompt',   text: '{"jsonrpc":"2.0","method":"tools/list","id":1}' },
        { type: 'muted',    text: '# El servidor responde con todas las herramientas registradas' },
        { type: 'response', text: '{"jsonrpc":"2.0","id":1,"result":{"tools":[' },
        { type: 'response', text: '  {"name":"add","description":"Suma dos números","inputSchema":{...}},' },
        { type: 'response', text: '  {"name":"subtract","description":"Resta b de a","inputSchema":{...}},' },
        { type: 'response', text: '  {"name":"multiply","description":"Multiplica dos números","inputSchema":{...}},' },
        { type: 'response', text: '  {"name":"divide","description":"Divide a entre b","inputSchema":{...}}' },
        { type: 'response', text: ']}}' },
        { type: 'success',  text: '# ¡Las herramientas son solo funciones con una puerta — el cliente ya sabe que existen!' },
      ],
    },

    quiz: [
      {
        q: '¿Qué hace el decorador `@mcp.tool()` a una función Python?',
        options: [
          'Ejecuta la función inmediatamente',
          'Registra la función como una herramienta MCP descubrible',
          'Hace la función más rápida',
          'Convierte código Python a JavaScript',
        ],
        correct: 1,
        explanation: '`@mcp.tool()` es la "marca de registro de hechizos": le dice al servidor MCP que exponga esta función como una herramienta llamable que los clientes pueden descubrir con tools/list e invocar.',
      },
      {
        q: 'En la metáfora de MCP, ¿qué son las herramientas?',
        options: [
          'Tablas de base de datos',
          'Sockets de red',
          'Funciones Python con una puerta de entrada — hechizos que el mago puede lanzar',
          'Plantillas HTML',
        ],
        correct: 2,
        explanation: 'Herramientas = hechizos. Una herramienta es simplemente una función Python decorada para ser descubrible y llamable por clientes MCP. El docstring de la función se convierte en su descripción y las anotaciones de tipo definen su esquema de entrada.',
      },
      {
        q: '¿Qué ocurre si llamas a `divide(10, 0)` sin manejo de errores?',
        options: [
          'Devuelve 0',
          'Devuelve None',
          'Lanza un ZeroDivisionError que el servidor debe manejar adecuadamente',
          'Devuelve infinito silenciosamente',
        ],
        correct: 2,
        explanation: 'Sin el `if b == 0: raise ValueError(...)`, Python lanza un ZeroDivisionError. Una herramienta MCP bien construida maneja los casos límite y devuelve errores significativos al cliente.',
      },
    ],

    completionDialogue: [
      {
        char: 'hexa', name: 'Hexa', role: 'Mentora de la Forja de Hechizos', emoji: '⚗️',
        text: '¡Magnífico! ¡Cuatro funciones, cuatro hechizos, todos forjados y registrados! Recuerda: las herramientas son solo funciones con una puerta de entrada. El decorador es la llave.',
      },
    ],

    realWorldTakeaway: 'En un servidor FastMCP real, cada función decorada con `@mcp.tool()` se convierte en una herramienta llamable. Cuando abres tu interfaz de MCP local y ves "add", "subtract", "multiply", "divide" en la lista — SON tus funciones Python, expuestas a través del protocolo.',
  },

  // ──────────────────────────────────────────────────────────
  // CAPÍTULO 3 — El Túnel de Mensajes
  // ──────────────────────────────────────────────────────────
  {
    id: 3,
    title: 'El Túnel de Mensajes',
    subtitle: 'Flujo de solicitud y respuesta',
    description: 'Los mensajes viajan por el túnel en parejas — cada solicitud necesita la respuesta correcta. Aprende a emparejarlos.',

    dialogue: [
      {
        char: 'tunnelfox', name: 'Zorro del Túnel', role: 'Mensajero Veloz', emoji: '🦊',
        text: '¡Llevo mensajes por el túnel a velocidad de rayo! Pero últimamente… los pares solicitud-respuesta se están mezclando. ¡Caos!',
      },
      {
        char: 'tunnelfox', name: 'Zorro del Túnel', role: 'Mensajero Veloz', emoji: '🦊',
        text: 'Cada intercambio MCP funciona igual: el cliente envía una SOLICITUD con un método y un id. El servidor debe enviar de vuelta una RESPUESTA con el MISMO id y el resultado.',
      },
      {
        char: 'tunnelfox', name: 'Zorro del Túnel', role: 'Mensajero Veloz', emoji: '🦊',
        text: '¡Empareja cada solicitud con su respuesta correcta. Hazlo bien y el túnel vuelve a fluir libremente!',
      },
    ],

    puzzle: {
      type: 'matching',
      title: 'Enrutar los Pares de Mensajes',
      instructions: 'Haz clic en una SOLICITUD a la izquierda y luego en su RESPUESTA correspondiente a la derecha.',
      leftItems: [
        { id: 'req1', label: 'tools/list (preguntar qué herramientas existen)', icon: '📋' },
        { id: 'req2', label: 'Llamar add(5, 3)', icon: '➕' },
        { id: 'req3', label: 'Llamar divide(10, 0)', icon: '⚠️' },
      ],
      rightItems: [
        { id: 'res1', label: 'Lista de todas las herramientas registradas con nombres y esquemas' },
        { id: 'res2', label: 'Resultado: 8' },
        { id: 'res3', label: 'Error: ¡No se puede dividir por cero!' },
      ],
      matches: { req1: 'res1', req2: 'res2', req3: 'res3' },
      successMsg: '✅ ¡El túnel zumba con pares de mensajes perfectamente emparejados!',
      failureHint: 'Empareja cada acción del cliente con lo que el servidor devolvería naturalmente.',
    },

    terminal: {
      title: 'Túnel de mensajes completo — Solicitud / Respuesta',
      steps: [
        { type: 'muted',    text: '# Paso 1: El cliente descubre las herramientas disponibles' },
        { type: 'prompt',   text: '→ {"jsonrpc":"2.0","method":"tools/list","id":1}' },
        { type: 'response', text: '← {"jsonrpc":"2.0","id":1,"result":{"tools":[{"name":"add",...},{"name":"divide",...}]}}' },
        { type: 'muted',    text: '' },
        { type: 'muted',    text: '# Paso 2: El cliente llama la herramienta "add"' },
        { type: 'prompt',   text: '→ {"jsonrpc":"2.0","method":"tools/call","id":2,"params":{"name":"add","arguments":{"a":5,"b":3}}}' },
        { type: 'response', text: '← {"jsonrpc":"2.0","id":2,"result":{"content":[{"type":"text","text":"8"}]}}' },
        { type: 'muted',    text: '' },
        { type: 'muted',    text: '# Paso 3: El cliente llama divide con cero (caso de error)' },
        { type: 'prompt',   text: '→ {"jsonrpc":"2.0","method":"tools/call","id":3,"params":{"name":"divide","arguments":{"a":10,"b":0}}}' },
        { type: 'error',    text: '← {"jsonrpc":"2.0","id":3,"error":{"code":-32603,"message":"¡No se puede dividir por cero!"}}' },
        { type: 'muted',    text: '# Cada solicitud tiene una respuesta correspondiente. El id los vincula.' },
      ],
    },

    quiz: [
      {
        q: '¿Qué hace el campo `id` en un mensaje JSON-RPC de MCP?',
        options: [
          'Identifica a qué servidor conectarse',
          'Vincula una solicitud con su respuesta correspondiente',
          'Establece la prioridad del mensaje',
          'Es el token de sesión',
        ],
        correct: 1,
        explanation: 'El campo `id` en JSON-RPC vincula una solicitud con su respuesta. Cuando el servidor responde, usa el mismo `id` para que el cliente sepa qué solicitud fue respondida.',
      },
      {
        q: '¿Cómo descubre un cliente qué herramientas tiene un servidor MCP?',
        options: [
          'Leyendo el código fuente Python del servidor',
          'Enviando una solicitud tools/list',
          'Adivinando basándose en el nombre del servidor',
          'Las herramientas no pueden descubrirse — deben codificarse en duro',
        ],
        correct: 1,
        explanation: 'El cliente envía una solicitud `tools/list`. El servidor responde con una lista de todas las herramientas registradas, incluyendo sus nombres, descripciones y esquemas de entrada.',
      },
      {
        q: '¿Qué devuelve el servidor cuando `tools/call` tiene éxito?',
        options: [
          'Nada — solo imprime el resultado en la terminal',
          'Una respuesta JSON-RPC con un campo `result` que contiene la salida de la herramienta',
          'Un valor Python puro',
          'Una nueva función Python',
        ],
        correct: 1,
        explanation: 'En caso de éxito, el servidor devuelve una respuesta JSON-RPC con un campo `result` que contiene la salida de la herramienta. En caso de error, devuelve un campo `error`.',
      },
    ],

    completionDialogue: [
      {
        char: 'tunnelfox', name: 'Zorro del Túnel', role: 'Mensajero Veloz', emoji: '🦊',
        text: '¡Perfecto! ¡Cada solicitud ahora tiene su respuesta correspondiente! El túnel vuelve a zumbar. Recuerda: cada mensaje entrante tiene un mensaje saliente, y el id los une.',
      },
    ],

    realWorldTakeaway: 'Cuando abres tu interfaz MCP local y haces clic en "Listar herramientas" y luego en "Ejecutar add(5, 3)", estás enviando exactamente estos mensajes JSON-RPC. El servidor los recibe en STDIN y envía las respuestas de vuelta por STDOUT.',
  },

  // ──────────────────────────────────────────────────────────
  // CAPÍTULO 4 — La Forja Veloz UV
  // ──────────────────────────────────────────────────────────
  {
    id: 4,
    title: 'La Forja Veloz UV',
    subtitle: 'Configuración rápida de Python con UV',
    description: 'Dos forjas arden lado a lado — una antigua y lenta, otra rápida y limpia. Elige el camino UV y ensambla el flujo de configuración.',

    dialogue: [
      {
        char: 'uvsprite', name: 'Duende Forja UV', role: 'Constructor Energético', emoji: '⚡',
        text: '¡ZOOM! ¡Hola! Soy UV — la forja veloz. Antes de que llegara, configurar proyectos Python significaba luchar con pip, venv y largas esperas de instalación. ¡Ya no más!',
      },
      {
        char: 'uvsprite', name: 'Duende Forja UV', role: 'Constructor Energético', emoji: '⚡',
        text: 'UV es un gestor de paquetes Python y ejecutor de proyectos ultrarrápido. Gestiona tu entorno virtual, dependencias Y ejecución — todo con comandos simples.',
      },
      {
        char: 'uvsprite', name: 'Duende Forja UV', role: 'Constructor Energético', emoji: '⚡',
        text: 'Tu misión: coloca los pasos de configuración UV en el orden correcto. ¡Arrástralos a su lugar!',
      },
    ],

    puzzle: {
      type: 'ordering',
      title: 'Ensamblar el Flujo de Configuración UV',
      instructions: 'Arrastra los pasos al orden correcto. ¿Cuál es el primero, segundo, tercero y último?',
      items: [
        { id: 'step_install', label: '1. Instala UV en tu máquina',                  icon: '📥', correctPos: 0 },
        { id: 'step_init',    label: '2. Crea un nuevo proyecto: uv init mi-server', icon: '📁', correctPos: 1 },
        { id: 'step_add',     label: '3. Añade la dependencia MCP: uv add mcp',      icon: '➕', correctPos: 2 },
        { id: 'step_run',     label: '4. Ejecuta tu servidor: uv run server.py',     icon: '🚀', correctPos: 3 },
      ],
      successMsg: '⚡ ¡Arranque de velocidad! ¡La forja UV está a pleno rendimiento!',
      failureHint: 'Piensa en el orden lógico: debes instalar UV antes de usarlo, y añadir paquetes antes de ejecutar tu código.',
    },

    codeExample: {
      lang: 'Shell',
      rawCode: `# Instala UV (una vez por máquina)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Crea un nuevo proyecto de servidor MCP
uv init mi-servidor-calculadora
cd mi-servidor-calculadora

# Añade MCP como dependencia
uv add mcp

# Ejecuta tu servidor
uv run server.py

# O ejecuta con el CLI de MCP para desarrollo
uv run mcp dev server.py`,
      explanation: 'UV crea y gestiona automáticamente un entorno virtual para tu proyecto. No se necesita "python -m venv .venv && source .venv/bin/activate" manual. UV lo hace todo.',
    },

    terminal: {
      title: 'UV vs. Método Antiguo — Comparación de velocidad',
      steps: [
        { type: 'error',   text: '# ❌ MÉTODO ANTIGUO (lento, manual)' },
        { type: 'error',   text: 'python3 -m venv .venv' },
        { type: 'error',   text: 'source .venv/bin/activate' },
        { type: 'error',   text: 'pip install mcp  # tarda 30+ segundos...' },
        { type: 'error',   text: 'python server.py' },
        { type: 'muted',   text: '' },
        { type: 'success', text: '# ✅ MÉTODO UV (rápido, automático)' },
        { type: 'success', text: 'uv init mi-server' },
        { type: 'success', text: 'uv add mcp        # < 2 segundos' },
        { type: 'success', text: 'uv run server.py  # gestiona el entorno automáticamente' },
        { type: 'muted',   text: '' },
        { type: 'info',    text: '# UV es como una forja rápida y limpia para trabajo Python.' },
        { type: 'info',    text: '# Una herramienta. Un comando. Sin dramas de entorno.' },
      ],
    },

    quiz: [
      {
        q: '¿Qué hace `uv add mcp`?',
        options: [
          'Instala UV en sí mismo',
          'Crea una nueva carpeta de proyecto',
          'Añade el paquete MCP como dependencia y lo instala',
          'Ejecuta el servidor MCP',
        ],
        correct: 2,
        explanation: '`uv add mcp` añade el paquete MCP a las dependencias de tu proyecto Y lo instala — todo en un comando rápido. UV gestiona el entorno virtual automáticamente en segundo plano.',
      },
      {
        q: '¿Qué hace `uv run server.py` de forma diferente a `python server.py`?',
        options: [
          'Nada — son idénticos',
          'Ejecuta server.py dentro del entorno virtual gestionado del proyecto automáticamente',
          'Convierte Python a JavaScript primero',
          'Solo funciona en Linux',
        ],
        correct: 1,
        explanation: '`uv run` usa automáticamente el entorno virtual gestionado del proyecto, así obtienes la versión correcta de Python y todos los paquetes correctos — sin necesidad de activar un entorno manualmente.',
      },
      {
        q: 'En la metáfora de la academia, ¿qué es UV?',
        options: [
          'Un tipo de flujo STDIO',
          'Un framework web de Python',
          'La forja veloz — un motor de construcción rápido y limpio para proyectos Python',
          'Una biblioteca de análisis JSON',
        ],
        correct: 2,
        explanation: 'UV es la "forja veloz" — acelera drásticamente la configuración de entornos Python, la instalación de dependencias y la ejecución de proyectos. Reemplaza el flujo lento y manual de pip + venv.',
      },
    ],

    completionDialogue: [
      {
        char: 'uvsprite', name: 'Duende Forja UV', role: 'Constructor Energético', emoji: '⚡',
        text: '¡ZOOM! ¡Orden perfecto! Cuatro pasos, velocidad de rayo. Sin dramas de entorno. Solo configuración limpia y rápida. ¡Ese es el método UV!',
      },
    ],

    realWorldTakeaway: 'Cuando construyas un servidor MCP real, `uv init`, `uv add` y `uv run` son los tres comandos que más usarás. UV gestiona el entorno virtual, las dependencias y la ejecución — todo automáticamente.',
  },

  // ──────────────────────────────────────────────────────────
  // CAPÍTULO 5 — El Portal del Cliente
  // ──────────────────────────────────────────────────────────
  {
    id: 5,
    title: 'El Portal del Cliente',
    subtitle: 'Explorar herramientas desde el lado del cliente',
    description: '¡El portal está activo! Adéntrate en la perspectiva del cliente y explora, llama y descubre tus herramientas.',

    dialogue: [
      {
        char: 'portalowl', name: 'Búho del Portal', role: 'Guía del Lado Cliente', emoji: '🦉',
        text: '¡Uu! ¡Bienvenido al Portal del Cliente! Aquí vive el lado del cliente — el lugar que hace preguntas, descubre herramientas y las llama.',
      },
      {
        char: 'portalowl', name: 'Búho del Portal', role: 'Guía del Lado Cliente', emoji: '🦉',
        text: 'Cuando abres una interfaz MCP local — como Claude Desktop o MCP Inspector — y la conectas a tu servidor, ESTO es lo que hace. Se conecta, pide herramientas y te deja ejecutarlas.',
      },
      {
        char: 'portalowl', name: 'Búho del Portal', role: 'Guía del Lado Cliente', emoji: '🦉',
        text: '¡Atraviesa el portal! Conéctate, explora las herramientas, ejecuta add y divide — incluso provoca el error de división por cero. Observa cómo el sistema lo maneja.',
      },
    ],

    puzzle: {
      type: 'simulation',
      title: 'Simulación del Portal del Cliente',
      instructions: 'Sigue los pasos para experimentar la interacción cliente-servidor completa. Haz clic en cada botón en orden.',
      steps: [
        {
          id: 'connect',
          label: '🔌 Conectar al servidor',
          terminalOutput: [
            { type: 'info',    text: 'Conectando al Servidor MCP Calculadora por stdio...' },
            { type: 'success', text: '✅ ¡Conectado! El servidor está listo.' },
            { type: 'muted',   text: 'Protocolo: stdio | Versión: MCP 1.0' },
          ],
        },
        {
          id: 'list_tools',
          label: '📋 Inspeccionar herramientas',
          terminalOutput: [
            { type: 'muted',    text: '# Enviando solicitud tools/list...' },
            { type: 'prompt',   text: '→ {"method":"tools/list","id":1}' },
            { type: 'response', text: '← {"result":{"tools":["add","subtract","multiply","divide"]}}' },
            { type: 'success',  text: '✅ 4 herramientas descubiertas: add, subtract, multiply, divide' },
          ],
        },
        {
          id: 'run_add',
          label: '➕ Ejecutar add(15, 27)',
          terminalOutput: [
            { type: 'muted',    text: '# Llamando herramienta add...' },
            { type: 'prompt',   text: '→ {"method":"tools/call","params":{"name":"add","arguments":{"a":15,"b":27}}}' },
            { type: 'response', text: '← {"result":{"content":[{"type":"text","text":"42"}]}}' },
            { type: 'success',  text: '✅ Resultado: 42 🎉' },
          ],
        },
        {
          id: 'run_divide',
          label: '➗ Ejecutar divide(100, 4)',
          terminalOutput: [
            { type: 'muted',    text: '# Llamando herramienta divide...' },
            { type: 'prompt',   text: '→ {"method":"tools/call","params":{"name":"divide","arguments":{"a":100,"b":4}}}' },
            { type: 'response', text: '← {"result":{"content":[{"type":"text","text":"25.0"}]}}' },
            { type: 'success',  text: '✅ Resultado: 25.0' },
          ],
        },
        {
          id: 'run_div_zero',
          label: '⚠️ Ejecutar divide(10, 0) — ¡error!',
          terminalOutput: [
            { type: 'muted',    text: '# Llamando divide con cero...' },
            { type: 'prompt',   text: '→ {"method":"tools/call","params":{"name":"divide","arguments":{"a":10,"b":0}}}' },
            { type: 'error',    text: '← {"error":{"code":-32603,"message":"¡No se puede dividir por cero!"}}' },
            { type: 'warning',  text: '⚠️  ¡Error manejado con elegancia — el servidor sigue activo!' },
            { type: 'muted',    text: '# Este es el comportamiento esperado. Un buen servidor maneja los errores de forma limpia.' },
          ],
        },
      ],
      successMsg: '🌀 ¡Portal dominado! Has experimentado el ciclo completo cliente-servidor.',
    },

    terminal: {
      title: 'Sesión completa del Portal del Cliente',
      steps: [
        { type: 'info',    text: '# Resumen de la sesión completa del portal del cliente' },
        { type: 'success', text: '1. Conectado por stdio ✅' },
        { type: 'success', text: '2. 4 herramientas descubiertas con tools/list ✅' },
        { type: 'success', text: '3. Llamado add(15, 27) → 42 ✅' },
        { type: 'success', text: '4. Llamado divide(100, 4) → 25.0 ✅' },
        { type: 'warning', text: '5. Llamado divide(10, 0) → Error (esperado, manejado) ✅' },
        { type: 'muted',   text: '' },
        { type: 'info',    text: '# ¡El servidor es invisible — pero su comportamiento es completamente visible a través de los mensajes!' },
      ],
    },

    quiz: [
      {
        q: '¿Qué hace primero un cliente MCP al conectarse a un servidor?',
        options: [
          'Llama a una herramienta inmediatamente',
          'Descarga el código fuente del servidor',
          'Envía tools/list para descubrir qué herramientas están disponibles',
          'Pide al usuario que escriba un comando',
        ],
        correct: 2,
        explanation: 'Lo primero que hace cualquier cliente MCP es enviar `tools/list` para descubrir las capacidades del servidor. Es como preguntar "¿qué hechizos conoces?" antes de lanzar cualquiera.',
      },
      {
        q: '¿Qué ocurre cuando un cliente llama a una herramienta que produce un error?',
        options: [
          'El servidor completo se bloquea',
          'El cliente se desconecta permanentemente',
          'El servidor devuelve una respuesta de error JSON-RPC y sigue funcionando',
          'El error se ignora silenciosamente',
        ],
        correct: 2,
        explanation: 'Un servidor MCP bien construido maneja los errores con elegancia: devuelve una respuesta de error JSON-RPC con un mensaje, pero sigue activo y listo para la siguiente solicitud.',
      },
      {
        q: '¿Qué es un "cliente MCP" en términos del mundo real?',
        options: [
          'Solo Claude Desktop',
          'Cualquier aplicación o modelo de IA que se conecta a un servidor MCP para usar sus herramientas',
          'Solo una biblioteca Python',
          'Un servicio en la nube',
        ],
        correct: 1,
        explanation: 'Un cliente MCP es CUALQUIER aplicación que hable el protocolo MCP — Claude Desktop, MCP Inspector, scripts personalizados, agentes de IA. El protocolo es abierto, por lo que cualquier cliente que conozca JSON-RPC puede conectarse.',
      },
    ],

    completionDialogue: [
      {
        char: 'portalowl', name: 'Búho del Portal', role: 'Guía del Lado Cliente', emoji: '🦉',
        text: '¡Uu uu! ¡Lo lograste! ¡Te conectaste, exploraste, llamaste herramientas e incluso manejaste un error! Ese es el ciclo completo cliente-servidor. ¡Queda un desafío más — el Jefe Final!',
      },
    ],

    realWorldTakeaway: 'Cuando abres MCP Inspector o Claude Desktop y lo conectas a tu `uv run server.py` en ejecución, TÚ eres el Búho del Portal. Te conectas, listas herramientas, las ejecutas y ves los resultados — todo a través del túnel STDIO invisible.',
  },

  // ──────────────────────────────────────────────────────────
  // CAPÍTULO 6 — Jefe Final: Restaurar el Servidor Invisible
  // ──────────────────────────────────────────────────────────
  {
    id: 6,
    title: 'Restaurar el Servidor Invisible',
    subtitle: 'El Jefe Final',
    description: 'El Servidor Invisible de la academia está roto en 5 aspectos. Usa todo lo que has aprendido para diagnosticarlo y arreglarlo.',
    isFinalBoss: true,

    dialogue: [
      {
        char: 'syn', name: 'Director Syn', role: 'Arquitecto de la Academia', emoji: '🧙',
        text: '¡Aprendiz! El gran Servidor Invisible en el corazón de la academia ha fallado. Cinco problemas, todos a la vez. Necesito tu conocimiento combinado para arreglarlos.',
      },
      {
        char: 'syn', name: 'Director Syn', role: 'Arquitecto de la Academia', emoji: '🧙',
        text: 'Has aprendido STDIO, herramientas, flujo de mensajes, UV y el portal del cliente. Ahora aplica todo para diagnosticar y reparar esta arquitectura rota.',
      },
      {
        char: 'syn', name: 'Director Syn', role: 'Arquitecto de la Academia', emoji: '🧙',
        text: 'Cinco componentes rotos. Cinco arreglos. Comienza.',
      },
    ],

    puzzle: {
      type: 'diagnosis',
      title: 'Diagnosticar el servidor roto',
      instructions: 'Cinco componentes están rotos. Lee cada problema y haz clic en la solución correcta.',
      problems: [
        {
          id: 'prob1', icon: '🌀',
          symptom: 'El servidor arranca pero el cliente no recibe respuestas. Los mensajes parecen desvanecerse.',
          options: [
            'Intercambiar las conexiones STDOUT y STDIN — están invertidas',
            'Reiniciar el servidor dos veces',
            'Añadir más funciones Python',
          ],
          correct: 0,
          explanation: 'Cuando STDIN y STDOUT están invertidos, los mensajes fluyen en la dirección equivocada. El cliente envía a lo que debería ser STDOUT y el servidor lee de lo que debería ser STDIN — nada se conecta.',
        },
        {
          id: 'prob2', icon: '⚗️',
          symptom: 'El cliente hace tools/list y obtiene una lista vacía — no se encuentran herramientas.',
          options: [
            'Añadir más sentencias print',
            'Añadir el decorador @mcp.tool() a todas las funciones Python',
            'Eliminar el servidor y empezar de nuevo',
          ],
          correct: 1,
          explanation: 'Sin `@mcp.tool()`, las funciones Python existen pero NO están registradas en MCP. Son invisibles para el protocolo. Añadir el decorador es lo que "les da una puerta de entrada".',
        },
        {
          id: 'prob3', icon: '📡',
          symptom: 'Las llamadas a herramientas devuelven resultados con el id equivocado — el cliente se confunde sobre qué resultado pertenece a qué solicitud.',
          options: [
            'Usar un id aleatorio en cada respuesta',
            'Ignorar el campo id — es opcional',
            'Asegurarse de que cada respuesta use el mismo id que su solicitud',
          ],
          correct: 2,
          explanation: 'El campo id en JSON-RPC es cómo se emparejan solicitudes y respuestas. Si una respuesta usa el id equivocado, el cliente no puede saber qué solicitud fue respondida. El id siempre debe coincidir.',
        },
        {
          id: 'prob4', icon: '⚡',
          symptom: 'La configuración tarda 5 minutos y falla debido a conflictos de paquetes Python.',
          options: [
            'Usar uv init + uv add para configurar un entorno limpio y aislado',
            'Instalar todo globalmente con sudo pip',
            'Usar una versión más antigua de Python',
          ],
          correct: 0,
          explanation: 'UV crea un entorno virtual aislado para el proyecto. Sin conflictos globales. Sin esperas de 5 minutos. `uv init` + `uv add mcp` + `uv run` es el camino limpio y rápido.',
        },
        {
          id: 'prob5', icon: '🌀',
          symptom: 'El cliente se conecta pero ve "0 herramientas disponibles" aunque las funciones Python están decoradas correctamente.',
          options: [
            'El servidor olvidó llamar a mcp.run(transport="stdio") al arrancar',
            'El cliente está roto',
            'Se registraron demasiadas herramientas',
          ],
          correct: 0,
          explanation: 'Incluso con las herramientas decoradas y todo configurado, el servidor debe iniciarse con `mcp.run(transport="stdio")`. Sin esto, el servidor nunca empieza a escuchar — simplemente sale silenciosamente.',
        },
      ],
      successMsg: '🏆 ¡INCREÍBLE! ¡Los cinco problemas resueltos! ¡El Servidor Invisible ha sido RESTAURADO!',
    },

    terminal: {
      title: 'Academia restaurada — Comprobación del sistema completo',
      steps: [
        { type: 'success', text: '✅ Flujos STDIO: STDIN → ENTRADA, STDOUT → SALIDA, STDERR → registros' },
        { type: 'success', text: '✅ Herramientas registradas: add, subtract, multiply, divide' },
        { type: 'success', text: '✅ Enrutamiento de mensajes: todos los IDs de solicitud coinciden con las respuestas' },
        { type: 'success', text: '✅ Configuración UV: entorno limpio, instalación rápida, sin conflictos' },
        { type: 'success', text: '✅ Servidor iniciado: mcp.run(transport="stdio") — ¡escuchando!' },
        { type: 'muted',   text: '' },
        { type: 'info',    text: '# Cliente conectándose...' },
        { type: 'prompt',  text: '→ {"method":"tools/list","id":1}' },
        { type: 'response',text: '← {"result":{"tools":[{"name":"add"},{"name":"subtract"},{"name":"multiply"},{"name":"divide"}]}}' },
        { type: 'success', text: '🌟 ¡EL SERVIDOR INVISIBLE HA SIDO RESTAURADO!' },
        { type: 'success', text: '   ¿Invisible? Sí. ¿Sin poder? Nunca.' },
      ],
    },

    quiz: [
      {
        q: '¿Cuál es la línea mínima requerida para INICIAR un servidor MCP escuchando conexiones?',
        options: [
          'import mcp',
          'def main(): pass',
          'mcp.run(transport="stdio")',
          'print("servidor listo")',
        ],
        correct: 2,
        explanation: '`mcp.run(transport="stdio")` es lo que inicia el bucle de eventos y comienza a leer desde STDIN. Sin esta línea, todas tus funciones decoradas existen pero el servidor nunca se activa.',
      },
      {
        q: '¿Cuál de estos representa el flujo completo y correcto de configuración de un servidor MCP?',
        options: [
          'Escribir Python → ejecutarlo con python server.py → listo',
          'uv init → uv add mcp → escribir servidor con @mcp.tool() → uv run server.py',
          'Instalar globalmente con pip → saltarse venv → ejecutar como root',
          'Copiar código del servidor de internet → adivinar las importaciones correctas',
        ],
        correct: 1,
        explanation: 'El flujo completo es: `uv init` → `uv add mcp` → escribir tu servidor con decoradores `@mcp.tool()` → `mcp.run(transport="stdio")` → `uv run server.py`.',
      },
      {
        q: 'Completa la frase: "El servidor es invisible, pero..."',
        options: [
          '"...eso significa que está roto"',
          '"...su comportamiento se vuelve visible a través de los mensajes"',
          '"...solo los expertos pueden entenderlo"',
          '"...solo funciona en producción"',
        ],
        correct: 1,
        explanation: '¡Esta es la idea central de MCP Academy! El servidor no tiene ventana visible — vive en un proceso, leyendo y escribiendo flujos. Pero cada acción que realiza es visible a través de los mensajes estructurados que intercambia.',
      },
    ],

    completionDialogue: [
      {
        char: 'syn', name: 'Director Syn', role: 'Arquitecto de la Academia', emoji: '🧙',
        text: '¡EXTRAORDINARIO! ¡Lo has conseguido! ¡El Servidor Invisible ha sido restaurado! ¡Las tuberías fluyen, los hechizos están forjados, los mensajes se enrutan perfectamente, la forja arde rápido y el portal está abierto!',
      },
      {
        char: 'syn', name: 'Director Syn', role: 'Arquitecto de la Academia', emoji: '🧙',
        text: 'Ya no eres un aprendiz. Eres un Arquitecto Invisible — alguien que entiende que los mejores servidores son los que no puedes ver, solo sentir a través de su comportamiento.',
      },
      { char: 'piper', name: 'Piper', role: 'Ingeniera de Tuberías', emoji: '🔧', text: '¡Las tuberías cantan!' },
      { char: 'hexa', name: 'Hexa', role: 'Mentora de la Forja de Hechizos', emoji: '⚗️', text: '¡Los hechizos están registrados!' },
      { char: 'tunnelfox', name: 'Zorro del Túnel', role: 'Mensajero Veloz', emoji: '🦊', text: '¡Los mensajes fluyen!' },
      { char: 'uvsprite', name: 'Duende Forja UV', role: 'Constructor Energético', emoji: '⚡', text: '¡ZOOM! ¡La forja arde!' },
      { char: 'portalowl', name: 'Búho del Portal', role: 'Guía del Lado Cliente', emoji: '🦉', text: '¡El portal brilla! ¡Uu uu!' },
    ],

    realWorldTakeaway: 'Ahora sabes exactamente cómo construir un servidor MCP Python real: crea un proyecto con UV, escribe funciones Python decoradas con @mcp.tool(), llama a mcp.run(transport="stdio") y ejecútalo con uv run. El cliente se conecta, descubre herramientas y las llama — todo a través del túnel STDIO invisible.',
  },
];
