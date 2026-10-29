# Cyber Management System 🚀

Este proyecto es una aplicación full-stack diseñada para gestionar productos, consolas, ventas y sesiones de un cibercafé.

## 📜 Tabla de Contenidos

- [🚀 Título del Proyecto e Insignias](#-título-del-proyecto-e-insignias)
- [📝 Descripción](#-descripción)
- [📚 Tabla de Contenidos](#-tabla-de-contenidos)
- [✨ Características](#-características)
- [💻 Tecnologías](#-tecnologías)
- [⚙️ Instalación](#-instalación)
- [💡 Uso](#-uso)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔗 Referencia de la API](#-referencia-de-la-api)
- [🤝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)
- [⭐ Enlaces Importantes](#-enlaces-importantes)
- [📝 Pie de página](#-pie-de-página)

## 🚀 Título del Proyecto e Insignias

![JavaScript](https://img.shields.io/badge/javascript-ES6-blue.svg)
![Python](https://img.shields.io/badge/python-3.x-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.136.1-green.svg)
![React](https://img.shields.io/badge/React-19.x-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-N/A-informational)

## 📝 Descripción

Esta aplicación proporciona una solución integral para la gestión de un cibercafé. Incluye funcionalidades para:

- **Gestión de Productos:** Seguimiento de inventario, precios de compra, precios de venta y niveles de stock.
- **Gestión de Consolas:** Monitoreo del estado de las consolas de videojuegos (Disponible, Ocupada, Inactiva).
- **Seguimiento de Sesiones:** Iniciar y finalizar sesiones de juego, calculando la duración y el precio total en base a tarifas definidas.
- **Gestión de Ventas:** Registro de ventas de productos, cálculo de totales y visualización del historial de ventas.
- **Gestión de Tarifas:** Definición de tarifas por hora según la cantidad de jugadores.
- **Panel de Control (Dashboard):** Visualización de métricas clave como ingresos totales, ventas y ocupación de consolas.

El sistema está compuesto por un backend en FastAPI y un frontend en React.

## ✨ Características

- **CRUD de Productos:** Crear, Leer, Actualizar y Eliminar productos.
- **Gestión del Estado de Consolas:** Seguimiento en tiempo real de la disponibilidad de las consolas.
- **Gestión del Ciclo de Vida de las Sesiones:** Iniciar, finalizar y realizar un seguimiento de las sesiones de juego activas e históricas.
- **Registro de Ventas:** Registrar eficientemente las ventas de productos y generar comprobantes.
- **Precios Dinámicos:** Las tarifas se aplican dinámicamente según la cantidad de jugadores y la duración de la sesión.
- **Dashboard Interactivo:** Representación visual de las métricas clave del negocio.
- **Interfaz de Usuario Responsiva:** Interfaz amigable construida con React.

## 💻 Tecnologías

- **Backend:**
  - **Lenguaje:** Python
  - **Framework:** FastAPI
  - **ORM de Base de Datos:** SQLAlchemy
  - **Driver de Base de Datos:** psycopg2-binary (para PostgreSQL)
  - **Otras Librerías:** pydantic, python-dotenv, alembic

- **Frontend:**
  - **Librería:** React
  - **Framework:** Vite
  - **Enrutamiento:** React Router DOM
  - **Componentes de UI:** lucide-react (para íconos)
  - **Estilos:** CSS
  - **Linting:** ESLint

## ⚙️ Instalación

### Backend (FastAPI)

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/PDR1004/cyber-management-system.git
    cd cyber-management-system/Backend
    ```

2.  **Crear y activar un entorno virtual:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # En Windows usa `venv\Scripts\activate`
    ```

3.  **Instalar dependencias:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configurar variables de entorno:**
    Crea un archivo `.env` en el directorio `Backend` con tu URL de conexión a la base de datos:
    ```dotenv
    DATABASE_URL=postgresql://usuario:contraseña@host:puerto/nombre_base_de_datos
    ```

5.  **Ejecutar migraciones de la base de datos (si usas Alembic):**
    ```bash
    alembic init alembic
    # Configura alembic.ini y env.py para tu base de datos
    alembic revision --autogenerate -m "create tables"
    alembic upgrade head
    ```
    *Nota: El código proporcionado crea las tablas directamente usando `Base.metadata.create_all(bind=engine)`. La configuración de Alembic podría ser opcional dependiendo de la estrategia de despliegue deseada.* 

6.  **Ejecutar el servidor backend:**
    ```bash
    uvicorn app.main:app --reload
    ```

### Frontend (React)

1.  **Navegar al directorio del frontend:**
    ```bash
    cd ../Frontend
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    # o
    yarn dev
    ```

## 💡 Uso

Esta aplicación está diseñada para optimizar las operaciones de un cibercafé. Así es como puedes usar sus funcionalidades principales:

### Gestión de Productos 🛍️

-   Navega a la sección de **Productos (Products)** en la barra lateral.
-   **Añadir Nuevos Productos:** Completa el formulario con los detalles del producto (nombre, precio de compra, precio de venta, stock, categoría) y haz clic en "Crear Producto".
-   **Ver Productos:** Se muestra una lista de todos los productos activos.
-   **Editar Productos:** Haz clic en el botón "Editar" en la fila de un producto para modificar sus detalles.
-   **Eliminar Productos:** Haz clic en el botón "Eliminar" para marcar un producto como inactivo.
-   **Ver Detalles:** Haz clic en "Ver" para observar información más específica sobre un producto.

### Gestión de Consolas 🎮

-   Navega a la sección de **Consolas (Consoles)**.
-   **Añadir Consolas:** Ingresa un nombre para la consola y haz clic en "Crear Consola".
-   **Ver Consolas:** Observa una lista de todas las consolas con su estado actual (Disponible, Ocupada, Inactiva).
-   **Editar Consolas:** Modifica los nombres de las consolas o su estado.
-   **Eliminar Consolas:** Marca las consolas como "Inactivas" si ya no están en uso.

### Gestión de Sesiones ⏱️

-   Navega a la sección de **Sesiones (Sessions)**.
-   **Iniciar una Sesión:** Selecciona una consola disponible e ingresa la cantidad de jugadores. Haz clic en "Iniciar Sesión". El estado de la consola se actualizará a "Ocupada".
-   **Ver Sesiones Activas:** Observa una lista de las sesiones actualmente en curso con su hora de inicio.
-   **Finalizar una Sesión:** Haz clic en "Finalizar Sesión" para una sesión activa. El sistema calcula el precio total según las tarifas definidas y marca la consola como "Disponible".
-   **Ver Historial de Sesiones:** Explora sesiones pasadas, filtra por fecha y observa los ingresos totales.

### Gestión de Ventas 💰

-   Navega a la sección de **Ventas (Sales)**.
-   **Crear una Venta:** Selecciona productos del menú desplegable, ingresa la cantidad y haz clic en "Añadir". El artículo se agregará a la venta actual.
-   **Ver Detalles de la Venta:** Observa la lista de artículos y el total acumulado de la venta actual.
-   **Finalizar Venta:** Haz clic en "Finalizar Venta" para registrar la transacción. El stock de los productos se actualizará en consecuencia.
-   **Ver Historial de Ventas:** Explora ventas pasadas, filtra por fecha y ve recibos detallados.

### Gestión de Tarifas 💲

-   Navega a la sección de **Tarifas (Rates)**.
-   **Añadir Tarifas:** Define tarifas especificando la cantidad de jugadores y el precio por hora.
-   **Ver Tarifas:** Observa todas las tarifas definidas.
-   **Editar/Eliminar Tarifas:** Modifica o elimina tarifas existentes.

### Panel de Control (Dashboard) 📊

-   Navega a la sección del **Dashboard**.
-   **Resumen:** Obtén un resumen de los ingresos totales, ventas de productos, ingresos por sesiones y la ocupación actual de consolas.
-   **Selección de Período:** Filtra los datos mostrados por "Hoy", "Últimos 7 días" o "Este mes".
-   **Gráfico de Ingresos Diarios:** Visualiza los ingresos diarios de productos y sesiones durante los últimos 7 días.

## 📁 Estructura del Proyecto

```
cyber-management-system/
├── Backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── database/
│   │   │   ├── __init__.py
│   │   │   ├── base.py
│   │   │   ├── connection.py
│   │   │   └── dependencies.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── console.py
│   │   │   ├── product.py
│   │   │   ├── rate.py
│   │   │   ├── sale.py
│   │   │   ├── sale_detail.py
│   │   │   └── session.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── console_routes.py
│   │   │   ├── product_routes.py
│   │   │   ├── rate_routes.py
│   │   │   ├── sale_routes.py
│   │   │   └── session_routes.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── console.py
│   │   │   ├── product.py
│   │   │   ├── rate.py
│   │   │   ├── sale.py
│   │   │   └── session.py
│   │   └── services/
│   │       ├── __init__.py
│   │       ├── console_service.py
│   │       ├── product_service.py
│   │       ├── rate_service.py
│   │       ├── sale_service.py
│   │       └── session_service.py
│   ├── migrations/ (Migraciones de Alembic, si está configurado)
│   ├── .env (Variables de entorno)
│   ├── main.py (Punto de entrada de la app FastAPI)
│   ├── requirements.txt (Dependencias del Backend)
│   └── uvicorn_config.py (Configuración de Uvicorn, si aplica)
│
└── Frontend/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.css
    │   │   └── Sidebar.jsx
    │   ├── pages/
    │   │   ├── Consoles.css
    │   │   ├── Consoles.jsx
    │   │   ├── Dashboard.css
    │   │   ├── Dashboard.jsx
    │   │   ├── Products.css
    │   │   ├── Products.jsx
    │   │   ├── Rates.css
    │   │   ├── Rates.jsx
    │   │   ├── Sales.css
    │   │   ├── Sales.jsx
    │   │   ├── Sessions.css
    │   │   └── Sessions.jsx
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   ├── Layout.css
    │   └── Layout.jsx
    ├── .eslintrc.cjs (Configuración de ESLint)
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── README.md
```

## 🔗 Referencia de la API (Backend)

El backend está construido usando FastAPI, exponiendo endpoints de API RESTful para todas las funcionalidades principales.

-   **`/products` (Productos)**
    -   `POST /`: Crear un nuevo producto.
    -   `GET /`: Obtener todos los productos activos.
    -   `GET /{product_id}`: Obtener un producto específico por su ID.
    -   `PUT /{product_id}`: Actualizar un producto.
    -   `DELETE /{product_id}`: Desactivar un producto.

-   **`/consoles` (Consolas)**
    -   `POST /`: Crear una nueva consola.
    -   `GET /`: Obtener todas las consolas disponibles y ocupadas.
    -   `GET /{console_id}`: Obtener una consola específica por su ID.
    -   `PUT /{console_id}`: Actualizar el nombre o estado de una consola.
    -   `DELETE /{console_id}`: Marcar una consola como inactiva.

-   **`/rates` (Tarifas)**
    -   `POST /`: Crear una nueva tarifa.
    -   `GET /`: Obtener todas las tarifas activas.
    -   `GET /{rate_id}`: Obtener una tarifa específica por su ID.
    -   `PUT /{rate_id}`: Actualizar una tarifa.
    -   `DELETE /{rate_id}`: Marcar una tarifa como inactiva.

-   **`/sessions` (Sesiones)**
    -   `POST /start`: Iniciar una nueva sesión.
    -   `POST /{session_id}/end`: Finalizar una sesión activa y calcular el precio total.
    -   `GET /`: Obtener todas las sesiones (activas y finalizadas).
    -   `GET /active/`: Obtener solo las sesiones activas.

-   **`/sales` (Ventas)**
    -   `POST /`: Crear una nueva venta con productos y cantidades.
    -   `GET /`: Obtener todas las ventas.
    -   `GET /{sale_id}`: Obtener una venta específica por su ID, incluyendo detalles.

*Para ver esquemas detallados de solicitudes y respuestas, consulta los modelos Pydantic en el directorio `Backend/app/schemas/`.*

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, siéntete libre de:

-   Hacer un fork del repositorio.
-   Crear una nueva rama para tu característica (`git checkout -b feature/CaracteristicaIncreible`).
-   Hacer un commit de tus cambios (`git commit -m 'Añadir alguna CaracteristicaIncreible'`).
-   Hacer push a la rama (`git push origin feature/CaracteristicaIncreible`).
-   Abrir un Pull Request.

## 📄 Licencia

Este proyecto no se encuentra actualmente bajo ninguna licencia especificada.

## ⭐ Enlaces Importantes

-   **Demo en vivo:** (No disponible)
-   **Repositorio:** [https://github.com/PDR1004/cyber-management-system](https://github.com/PDR1004/cyber-management-system)

## 📝 Pie de página

© 2024 PDR1004. Todos los derechos reservados.

Repositorio: [cyber-management-system](https://github.com/PDR1004/cyber-management-system)
Autor: PDR1004
Contacto: [pdr1004@example.com](mailto:pdr1004@example.com)

**¿Te gusta este proyecto?** Deja una estrella ⭐ | Haz un Fork 🍴 | Reporta un problema 🐛

---
**<p align="center">Generado por [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**
