

### README.md

```markdown
# Workflow Automation - React Flow Project

Este proyecto es una aplicación de automatización de flujos de trabajo construida con **React Flow**, una biblioteca para crear diagramas interactivos y flujos de trabajo visuales. La aplicación permite a los usuarios arrastrar y soltar nodos, conectarlos y personalizar sus propiedades.

## Características

- **Drag & Drop**: Los usuarios pueden arrastrar nodos desde un panel lateral y soltarlos en el lienzo.
- **Tipos de Nodos Personalizados**: Incluye nodos como `Start`, `Email`, `Wait` y `Condition`, cada uno con su propia funcionalidad.
- **Conexión de Nodos**: Los nodos pueden conectarse entre sí para crear flujos de trabajo.
- **Edición de Nodos**: Los nodos en el lienzo pueden ser editados o eliminados.
- **Restricción de Nodos**: Solo se permite un nodo `Start` en el flujo.

## Tecnologías Utilizadas

- **React**: Biblioteca principal para la construcción de la interfaz de usuario.
- **React Flow**: Biblioteca para la creación de diagramas interactivos.
- **TypeScript**: Para tipado estático y desarrollo más robusto.
- **TailwindCSS**: Para estilos rápidos y consistentes.

## Estructura del Proyecto

```
src/
├── components/
│   ├── NodoEditable.tsx       # Componente para editar nodos
├── entities/
│   ├── nodes/
│       ├── NodeStart.tsx      # Nodo de inicio
│       ├── NodeCondition.tsx  # Nodo de condición
│       ├── NodeWait.tsx       # Nodo de espera
│       ├── NodeEmail.tsx      # Nodo de email
├── widgets/
│   ├── Sidebar.tsx            # Panel lateral para arrastrar nodos
├── App.tsx                    # Componente principal de la aplicación
```

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/workflow-automation.git
   cd workflow-automation
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

4. Abre la aplicación en tu navegador en [http://localhost:3000](http://localhost:3000).

## Uso

1. Arrastra un nodo desde el panel lateral hacia el lienzo.
2. Conecta los nodos arrastrando desde los puntos de conexión.
3. Haz clic en un nodo para editar sus propiedades.
4. Elimina un nodo utilizando el botón correspondiente.

## Funcionalidades Clave

### Sidebar
El componente `Sidebar` permite arrastrar nodos al lienzo. Cada nodo tiene un tipo (`Start`, `Email`, `Wait`, `Condition`) y un color de fondo.

### React Flow
El componente principal `ReactFlow` gestiona los nodos y las conexiones. Incluye controles como zoom y un fondo personalizable.

### Restricción de Nodo `Start`
Solo se permite un nodo `Start` en el flujo. Si intentas agregar más de uno, se mostrará una alerta.

### Edición y Eliminación de Nodos
El componente `NodoEditable` permite modificar las propiedades de un nodo o eliminarlo del flujo.

## Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm test`: Ejecuta las pruebas.

## Personalización

Puedes agregar nuevos tipos de nodos editando el objeto `nodeTypes` en `App.tsx` y creando un nuevo componente en la carpeta `entities/nodes`.

