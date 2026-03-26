# 📝 RESUMEN DE LA TAREA 3

## ✅ Archivos Creados

### 1. `.env`
**Qué es:** Archivo de variables de entorno  
**Para qué sirve:** Almacena información sensible como contraseñas y URLs de conexión. Nunca se sube a Git.  
**Contenido:** Usuario, contraseña y URL de conexión a PostgreSQL

### 2. `docker-compose.yml`
**Qué es:** Archivo de configuración de Docker Compose  
**Para qué sirve:** Define y configura el contenedor de PostgreSQL  
**Características:**
- Usa imagen `postgres:alpine` (versión ligera)
- Mapea el puerto 5432
- Crea un volumen para persistir datos
- Lee credenciales desde `.env`

### 3. `package.json`
**Qué es:** Archivo de configuración de Node.js  
**Para qué sirve:** Define las dependencias del proyecto y scripts  
**Dependencias instaladas:**
- `prisma@6.19.2` - ORM para gestionar la BD
- `@prisma/client@6.19.2` - Cliente para interactuar con la BD
- `@prisma/adapter-pg@6.19.2` - Adaptador para PostgreSQL
- `dotenv` - Para cargar variables de entorno
- `tsx` - Para ejecutar archivos TypeScript

**Nota:** Usamos Prisma 6 en lugar de 7 porque la versión 7 tiene problemas de compatibilidad.

### 4. `prisma/schema.prisma`
**Qué es:** Esquema de la base de datos  
**Para qué sirve:** Define la estructura de las tablas y configuración de Prisma  
**Contenido:**
- Configuración del generador de código
- Configuración de la fuente de datos (PostgreSQL)
- Modelo `Producto` con campos: id, título, descripción, precio, imagen

### 5. `prisma/prisma.client.ts`
**Qué es:** Configuración del cliente Prisma  
**Para qué sirve:** Crea y exporta la instancia de Prisma que usaremos en el código  
**Funcionalidad:**
- Carga variables de entorno
- Configura el adaptador PostgreSQL
- Inicializa PrismaClient
- Exporta la instancia para usar en otros archivos

### 6. `seed.ts`
**Qué es:** Script para poblar la base de datos  
**Para qué sirve:** Lee productos.json e inserta los datos en la BD  
**Funcionalidad:**
- Importa productos desde JSON
- Convierte precios de texto a números
- Inserta cada producto en la BD
- Muestra ejemplos de consultas:
  - Productos cuya descripción empieza por "Lámina"
  - Total de productos
  - Producto más caro

### 7. `.gitignore`
**Qué es:** Archivo de configuración de Git  
**Para qué sirve:** Define qué archivos NO deben subirse al repositorio  
**Excluye:**
- `.env` (información sensible)
- `node_modules/` (dependencias)
- `generated/` (código generado)
- Archivos temporales y de IDEs

### 8. `README.md`
**Qué es:** Documentación del proyecto  
**Para qué sirve:** Instrucciones paso a paso para ejecutar el proyecto  
**Incluye:**
- Requisitos previos
- Pasos de instalación
- Comandos útiles
- Solución de problemas

### 9. `productos.json`
**Qué es:** Datos de productos  
**Para qué sirve:** Contiene la información de todos los productos a cargar en la BD  
**Origen:** Copiado desde Tarea2

### 10. `prisma/migrations/`
**Qué es:** Carpeta de migraciones  
**Para qué sirve:** Guarda el historial de cambios en la estructura de la BD  
**Contenido:** Migración `esquema_inicial` con el SQL para crear la tabla Producto

### 11. `generated/prisma/`
**Qué es:** Código generado por Prisma  
**Para qué sirve:** Contiene el cliente TypeScript tipado para interactuar con la BD  
**Nota:** Se genera automáticamente, no se edita manualmente

## 🚀 Comandos Ejecutados

### 1. `npm install`
Instaló todas las dependencias del proyecto

### 2. `docker compose up -d`
Inició PostgreSQL en un contenedor Docker en segundo plano

### 3. `npx prisma migrate dev --name esquema_inicial`
Creó la tabla Producto en PostgreSQL según el schema.prisma

### 4. `npm run seed`
Ejecutó seed.ts para poblar la BD con 114 productos

## 📊 Resultados

✅ **Base de datos creada:** `ssbw`  
✅ **Tabla creada:** `Producto`  
✅ **Productos insertados:** 114  
✅ **Producto más caro:** Displate "Florero" - 90€  
✅ **Consultas funcionando correctamente**

## 🔍 Verificación

Para verificar que todo funciona:

```bash
# Ver contenedores corriendo
docker ps

# Ver datos en Prisma Studio
npx prisma studio

# Conectarse directamente a PostgreSQL
docker exec -it postgres_ssbw psql -U yo -d ssbw
```

## 📚 Conceptos Aprendidos

1. **ORM (Object Relational Mapping):** Capa de software que permite interactuar con la BD usando objetos en lugar de SQL directo

2. **Docker Compose:** Herramienta para definir y ejecutar aplicaciones Docker multi-contenedor

3. **Migraciones:** Sistema para versionar y aplicar cambios en la estructura de la BD

4. **Variables de entorno:** Forma segura de almacenar información sensible fuera del código

5. **Prisma Client:** Cliente tipado que se genera automáticamente desde el schema

## ⚠️ Nota Importante

Usamos **Prisma 6** en lugar de Prisma 7 porque la versión 7 tiene cambios significativos en la configuración que aún presentan problemas de compatibilidad. Prisma 6 es más estable y funciona perfectamente para este proyecto.
