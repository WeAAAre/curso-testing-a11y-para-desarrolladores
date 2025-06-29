# weAAAre - Curso de testing

Repositorio para el curso de testing de componentes para accesibilidad en la plataforma weAAAre.

## Descripción

En este proyecto hemos desarrollado dos componentes:

- Slider:
  Control que permite al usuario seleccionar un valor dentro de un rango, desplazando un elemento deslizante (thumb) a lo largo de una barra.

  ![Slider con un thumb ligeramente desplazado](https://www.w3.org/WAI/content-images/wai-aria-practices/images/pattern-slider.svg)

  [Ver patrón slider en w3.org](https://www.w3.org/WAI/ARIA/apg/patterns/slider/)

- TabList:
  Permite organizar el contenido en varios paneles, mostrando sólo uno a la vez. Cada panel está asociado con una pestaña (tab), que lo controla y facilita la navegación entre los mismos.

  ![Tablist con una pestaña seleccionada](https://www.w3.org/WAI/content-images/wai-aria-practices/images/pattern-tabs.svg)

  [Ver patrón tabs en w3.org](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

## Estructura del proyecto

- `src/compnoents`: Componentes creados en React.
- `test/`: Pruebas.
- `.storybook/`: Configuración de Storybook.
- `playwright/`: Archivos públicos usados en pruebas con playwright.

## Scripts disponibles

Puedes ejecutar los siguientes comandos usando `npm run <script>`:

- `lint`: Ejecuta ESLint para analizar el código.
- `prettier`: Formatea el código con Prettier.
- `storybook`: Inicia Storybook.
- `build-storybook`: Genera la build estática de Storybook.
- `test:testing-library`: Ejecuta pruebas con Testing Library y Vitest.
- `test:playwright`: Ejecuta pruebas de accesibilidad con Playwright.
- `test:storybook`: Ejecuta pruebas sobre Storybook.
- `test:screenreader:virtual`: Ejecuta pruebas virtuales de lector de pantalla.
- `test:screenreader:voiceover`: Ejecuta pruebas con el lector de pantalla voiceover. Necesita la variable de entorno 'VOICEOVER_LANG'.

## Instalación

0. Prerequisito: node 21
1. Clona el repositorio:

   ```sh
   git clone https://github.com/tu-usuario/a11y_testing.git
   cd a11y_testing
   ```

2. Instala las dependencias:
   ```sh
   npm ci
   ```

## Uso

- Para ejecutar las pruebas:

  ```sh
  npm run test:testing-library
  ```

  ```sh
  npm run test:screenreader:virtual
  ```

  ```sh
  npm run test:storybook
  ```

  ```sh
  npm run test:playwright
  ```

  ```sh
  VOICEOVER_LANG=es npm run test:screenreader:voiceover
  ```

## Recursos

- [MagentaA11Y](https://www.magentaa11y.com/web/)
- [ARIA Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Licencia

MIT

## Contacto
Si tienes preguntas o necesitas ayuda, puedes:
- Abrir un issue en este repositorio o escribir un comentario en la lección del curso.
- Contactar al equipo de weAAAre a través de hola@weaaare.com

--- 
Desarrollado con ❤️ por el equipo de weAAAre
