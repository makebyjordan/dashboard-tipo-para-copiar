# Configuración del Proyecto - InvoDash Management Dashboard

## 📋 Requisitos Previos

- Node.js 18+ instalado
- PostgreSQL instalado o acceso a una base de datos PostgreSQL en la nube
- npm o yarn

## 🚀 Instalación

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Base de Datos PostgreSQL

Tienes tres opciones:

#### Opción A: PostgreSQL Local
```bash
# Instalar PostgreSQL en tu sistema
# Ubuntu/Debian:
sudo apt-get install postgresql postgresql-contrib

# macOS (con Homebrew):
brew install postgresql

# Iniciar servicio
sudo service postgresql start
```

#### Opción B: Usar Neon (Recomendado para desarrollo)
1. Ve a https://neon.tech
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Copia la connection string

#### Opción C: Usar Supabase
1. Ve a https://supabase.com
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Ve a Settings > Database y copia la connection string

### 3. Configurar Variables de Entorno

```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita el archivo .env con tus credenciales
nano .env  # o usa tu editor favorito
```

Ejemplo de `.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/invodash?schema=public"
NEXTAUTH_SECRET="tu-secreto-generado-aqui"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

Para generar `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 4. Configurar Prisma

```bash
# Generar el cliente de Prisma
npm run prisma:generate

# Crear y ejecutar migraciones
npm run prisma:migrate

# (Opcional) Abrir Prisma Studio para ver la base de datos
npm run prisma:studio
```

### 5. Crear Usuario Inicial

Crea un archivo `prisma/seed.ts` y ejecuta:
```bash
npm run prisma:seed
```

O manualmente a través de Prisma Studio o SQL:
```sql
INSERT INTO "User" (id, email, password, name, role)
VALUES (
  'cuid_example_123',
  'admin@invodash.com',
  '$2a$10$hashed_password_here',  -- usa bcrypt para hashear
  'Admin User',
  'ADMIN'
);
```

## 🏃 Ejecutar la Aplicación

```bash
# Modo desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:3000
```

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
- `npm run prisma:generate` - Genera el cliente de Prisma
- `npm run prisma:migrate` - Ejecuta migraciones de base de datos
- `npm run prisma:studio` - Abre Prisma Studio
- `npm run prisma:seed` - Ejecuta el seed de la base de datos

## 🔐 Seguridad

- Todas las contraseñas se hashean con bcrypt
- Sesiones manejadas por NextAuth.js con JWT
- API Routes protegidas con middleware de autenticación
- Validación de datos con Zod
- Variables de entorno para credenciales sensibles

## 📚 Estructura del Proyecto

```
/app              - Next.js App Router (páginas y layouts)
/components       - Componentes React reutilizables
/lib              - Utilidades y configuración (Prisma, Auth)
/prisma           - Esquema de base de datos y migraciones
/public           - Archivos estáticos
/types            - Definiciones de TypeScript
```

## 🐛 Solución de Problemas

### Error de conexión a la base de datos
- Verifica que PostgreSQL esté corriendo
- Revisa la `DATABASE_URL` en `.env`
- Verifica credenciales y permisos

### Error de Prisma Client
```bash
npm run prisma:generate
```

### Problemas con migraciones
```bash
npx prisma migrate reset  # ⚠️ Esto borrará todos los datos
npm run prisma:migrate
```

## 📞 Soporte

Si encuentras algún problema, revisa:
1. Logs en la consola del servidor
2. Logs en la consola del navegador
3. Estado de la base de datos en Prisma Studio
