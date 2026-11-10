# FrontMagic

Frontend en React para **descubrir cartas de Magic: The Gathering deslizándolas, al estilo Tinder**, y construir tus propios mazos con ellas.

Las cartas se obtienen de la API pública [magicthegathering.io](https://docs.magicthegathering.io/). Los usuarios y los mazos se guardan en el backend [**apimagic**](https://github.com/cosmona/apimagic).

> 🚧 Proyecto en desarrollo.

---

## ✨ Funcionalidades

- **Swipe de cartas**: arrastra una carta a la derecha para añadirla al mazo que estás construyendo, o a la izquierda para descartarla. Cuando se acaban las cartas de la página, se carga la siguiente automáticamente.
- **Filtros de búsqueda**:
  - Identidad de color (⚪ blanco, 🔵 azul, ⚫ negro, 🔴 rojo, 🟢 verde)
  - Rareza (común, infrecuente, rara, mítica)
  - Nombre y texto de la carta
  - Tipo de carta (cargados dinámicamente desde la API)
  - Legalidad por formato
- **Constructor de mazos**: panel inferior desplegable con las cartas elegidas, desde donde puedes guardar o borrar el mazo.
- **Mis mazos**: listado de los mazos guardados del usuario.
- **Login de usuario** con token, que se envía en la cabecera `Authorization` al backend.
- **Persistencia local**: el estado de Redux (sesión, mazos y carta en vista) se guarda en `localStorage`, así que no se pierde al recargar.

## 🛠️ Tecnologías

| Área | Herramientas |
| --- | --- |
| UI | React 18, TypeScript, Semantic UI React, Font Awesome, Sass |
| Estado | Redux Toolkit, React Redux, redux-localstorage-simple |
| Animaciones y gestos | @react-spring/web, react-use-gesture |
| Peticiones HTTP | axios, fetch |
| Tooling | Create React App (`react-scripts` 5), Babel |

## 🚀 Puesta en marcha

### Requisitos

- [Node.js](https://nodejs.org/) 16 o superior y npm
- El backend [apimagic](https://github.com/cosmona/apimagic) en marcha, para el login y los mazos (para buscar cartas no hace falta)

### Instalación

```bash
git clone https://github.com/cosmona/frontmagic.git
cd frontmagic
npm install
```

### Configuración

Crea un archivo `.env` en la raíz con el puerto donde escucha el backend:

```env
REACT_APP_PORT=3001
```

> ⚠️ Ahora mismo la IP del backend está escrita a mano en el código (`http://192.168.0.21`). Si tu backend corre en otra máquina o en `localhost`, cámbiala en estos archivos:
> - `src/Login/Login.tsx`
> - `src/Helpers/Helpers.tsx`
> - `src/Components/MazoConstructor/MazoConstructor.tsx`

### Arrancar

```bash
npm start
```

La app se abre en [http://localhost:3000](http://localhost:3000).

## 📜 Scripts

| Comando | Qué hace |
| --- | --- |
| `npm start` | Arranca el servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera la versión de producción en `build/` |
| `npm test` | Lanza los tests con Jest en modo *watch* |

## 📁 Estructura del proyecto

```
src/
├── App.tsx                  # Layout principal: header, filtros, mazos, deck y constructor
├── store.ts                 # Store de Redux: slices user, mazos y cardview
├── Header/                  # Cabecera con login / logout
├── Login/                   # Formulario y modal de inicio de sesión
├── Components/
│   ├── Cartas/              # Deck de cartas con swipe (react-spring + gestos)
│   ├── Filtros/             # Filtros por color, rareza, tipo, texto y legalidad
│   ├── MazoConstructor/     # Panel para construir, guardar y borrar mazos
│   ├── Mazos/               # Listado de mazos del usuario
│   ├── Swipe/               # Componente de swipe
│   └── Loading/             # Indicador de carga
├── Helpers/                 # Funciones auxiliares, interfaces y tipos de TypeScript
├── hooks/                   # Hooks de peticiones (useApi, useFetch) y useLocalStorage
└── Media/                   # Imágenes, iconos de rareza y símbolos de maná
```

## 🔌 Endpoints del backend usados

| Método | Ruta | Uso |
| --- | --- | --- |
| `POST` | `/users/login/` | Iniciar sesión y obtener el token |
| `GET` | `/getmazos/` | Listar los mazos del usuario |
| `GET` | `/getmazos/:id/` | Obtener un mazo concreto |
| `POST` | `/mazos/` | Guardar un mazo nuevo |
| `DELETE` | `/deletemazo/:id/` | Borrar un mazo |

## 🗺️ Pendiente

- [ ] Actualizar un mazo existente (ahora solo se pueden crear)
- [ ] Poner nombre a los mazos desde la interfaz
- [ ] Llevar la URL del backend a una variable de entorno
- [ ] Registro de usuarios

## 🙏 Créditos

- Datos de las cartas: [magicthegathering.io](https://magicthegathering.io/)
- Iconos de expansiones: [Keyrune](https://keyrune.andrewgioia.com/)
- Magic: The Gathering es una marca registrada de Wizards of the Coast. Este es un proyecto personal sin afiliación oficial.
