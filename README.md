# API REST de CRUD de Usuarios

Este es el repositorio de una API RESTful robusta y segura para la gestión de usuarios (CRUD), construida con Node.js, Express, Sequelize y MySQL. El proyecto es el resultado de un proceso de desarrollo iterativo enfocado en aplicar las mejores prácticas de la industria.

## ✨ Características Principales

-   **Operaciones CRUD Completas:** Funcionalidad completa para Crear, Leer, Actualizar y Eliminar usuarios.
-   **Seguridad de Contraseñas:** Almacenamiento seguro de contraseñas utilizando `bcrypt` para el hasheo y salting.
-   **Validación de Datos Avanzada:** Reglas de validación detalladas en el backend para todos los campos de entrada (formato, longitud, complejidad de contraseña, etc.).
-   **Unicidad de Email:** Verificación a nivel de aplicación y base de datos para asegurar que no existan correos electrónicos duplicados.
-   **Manejo de Errores Centralizado:** Uso de bloques `try...catch` y códigos de estado HTTP semánticos para un manejo de errores claro y predecible.
-   **Arquitectura por Capas:** Estructura de proyecto organizada (Modelos, Controladores, Rutas, Middlewares) para una alta mantenibilidad y escalabilidad.
-   **Configuración por Entorno:** Uso de variables de entorno (`.env`) para gestionar datos sensibles y configuraciones de la aplicación.
-   **Middlewares Eficientes:** Implementación de middlewares para optimizar la lógica de negocio y evitar la duplicación de código (Principio DRY).

## 🛠️ Tecnologías Utilizadas

-   **Backend:** Node.js
-   **Framework:** Express.js
-   **ORM:** Sequelize
-   **Base de Datos:** MySQL
-   **Seguridad:** bcrypt
-   **Variables de Entorno:** dotenv
-   **Desarrollo:** Nodemon

## 🚀 Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Prerrequisitos

-   Tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior).
-   Tener instalado y corriendo un servidor de [MySQL](https://www.mysql.com/).
-   Un cliente de API como [Postman](https://www.postman.com/) para probar los endpoints.

### Pasos

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/bruizdiaz/UserCRUD.git](https://github.com/bruizdiaz/UserCRUD.git)
    cd UserCRUD
    ```

2.  **Instala las dependencias del proyecto:**
    ```bash
    npm install
    ```

3.  **Configura la Base de Datos:**
    Asegúrate de que tu servidor MySQL esté corriendo y crea una base de datos para el proyecto.
    ```sql
    CREATE DATABASE user_crud_db;
    ```

4.  **Configura las Variables de Entorno:**
    Copia el archivo de ejemplo `.env.example` y renómbralo a `.env`.
    ```bash
    cp .env.example .env
    ```
    Ahora, abre el archivo `.env` y rellena los valores con tus credenciales de la base de datos y la configuración que desees.
    ```env
    DB_HOST=localhost
    DB_USER=tu_usuario_mysql
    DB_PASSWORD=tu_contraseña_mysql
    DB_NAME=user_crud_db
    DB_PORT=3306
    SALT_ROUNDS=10
    ```

## ▶️ Uso

Una vez configurado, puedes iniciar el servidor de dos maneras:

-   **Modo Desarrollo (con reinicio automático):**
    ```bash
    npm run dev
    ```

-   **Modo Producción:**
    ```bash
    npm start
    ```

El servidor se iniciará y estará escuchando en el puerto definido (por defecto, el puerto 3000).

## 📡 API Endpoints

La API sigue las convenciones RESTful. El prefijo base para todas las rutas es `/api`.

### Usuarios (`/api/users`)

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/users` | Obtiene una lista de todos los usuarios. |
| `POST` | `/users` | Crea un nuevo usuario. |
| `GET` | `/users/:id` | Obtiene un usuario específico por su ID. |
| `PUT` | `/users/:id` | Actualiza un usuario específico por su ID. |
| `DELETE`| `/users/:id` | Elimina un usuario específico por su ID. |

---

#### `POST /api/users`

Crea un nuevo usuario.

-   **Body (raw/json):**
    ```json
    {
        "name": "Bruce Wayne",
        "email": "bruce@wayneenterprises.com",
        "password": "Password.123!",
        "isActive": true
    }
    ```
-   **Respuesta Exitosa (201 Created):**
    ```json
    {
        "id": 1,
        "name": "Bruce Wayne",
        "email": "bruce@wayneenterprises.com"
    }
    ```
-   **Respuesta de Error (400 Bad Request):**
    ```json
    {
        "message": "El email ya se encuentra registrado."
    }
    ```
    ```json
    {
        "errors": [
            {
                "message": "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos."
            }
        ]
    }
    ```

---

#### `PUT /api/users/:id`

Actualiza un usuario existente.

-   **Body (raw/json):**
    ```json
    {
        "name": "Batman",
        "email": "batman@justiceleague.com"
    }
    ```
-   **Respuesta Exitosa (200 OK):**
    ```json
    {
        "message": "Usuario 1 actualizado correctamente."
    }
    ```
-   **Respuesta de Error (404 Not Found):**
    ```json
    {
        "message": "Usuario no encontrado"
    }
    ```
---

## ✒️ Autor

-   **Mateo B. Ruiz Diaz** - [bruizdiaz](https://github.com/bruizdiaz)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
