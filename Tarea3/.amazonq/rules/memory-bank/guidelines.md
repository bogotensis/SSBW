# Development Guidelines

## Code Quality Standards

### Documentation Style
- **Extensive inline comments**: Every file uses triple-slash comments (///) for major sections and double-slash (//) for line-level explanations
- **Spanish language documentation**: All comments and documentation written in Spanish for educational purposes
- **Pedagogical approach**: Comments explain not just what code does, but why and how it works
- **Step-by-step explanations**: Complex operations broken down with numbered steps in comments

### Code Formatting
- **ES Modules**: Project uses `"type": "module"` in package.json for modern JavaScript module syntax
- **TypeScript**: All application code written in TypeScript (.ts files)
- **No semicolons**: Code style omits semicolons at end of statements
- **Consistent indentation**: 2-space indentation throughout
- **Explicit type annotations**: TypeScript types defined for data structures

### Naming Conventions
- **Spanish identifiers**: Variables and functions use Spanish names (e.g., `Guardar_en_DB`, `productos`, `título`)
- **camelCase for variables**: Standard camelCase for variable names
- **PascalCase for types**: TypeScript types use PascalCase (e.g., `Producto`, `Productos`)
- **Descriptive names**: Function names clearly describe their purpose (e.g., `Guardar_en_DB` for database saving)

### Import Organization
- **dotenv first**: Environment variable loading (`import 'dotenv/config'`) always at top of files that need it
- **Generated code imports**: Prisma client imported from generated directory with explicit path
- **Adapter imports**: Database adapters imported from npm packages
- **JSON imports**: Modern ES module JSON import syntax with `with {type: 'json'}` assertion

## Semantic Patterns

### Database Client Configuration Pattern
```typescript
// 1. Load environment variables
import 'dotenv/config'

// 2. Import Prisma Client from generated code
import { PrismaClient } from '../generated/prisma/index.js'

// 3. Import database adapter
import { PrismaPg } from '@prisma/adapter-pg'

// 4. Configure adapter with connection string
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

// 5. Initialize Prisma with adapter
const prisma = new PrismaClient({ adapter })

// 6. Export for reuse
export default prisma
```
**Frequency**: Used in 1/5 files (prisma.client.ts) - central configuration pattern

### Prisma Query Patterns

#### Basic CRUD Operations
```typescript
// Create single record
await prisma.producto.create({
  data: {
    título,
    descripción,
    imagen,
    precio
  }
})

// Find many with filtering
await prisma.producto.findMany({
  where: {
    descripción: {
      contains: 'text',
      mode: 'insensitive'
    }
  },
  orderBy: {
    precio: 'asc'
  }
})

// Count records
await prisma.producto.count()

// Find first with ordering
await prisma.producto.findFirst({
  orderBy: {
    precio: 'desc'
  }
})
```
**Frequency**: Used in 2/5 files (seed.ts, consulta.ts) - core data access pattern

### Error Handling Pattern
```typescript
try {
  const result = await prisma.producto.create({
    data: { /* ... */ }
  })
  console.log('Creado:', result.título)
} catch(error: any) {
  console.error('Error al crear producto:', error.message)
}
```
**Frequency**: Used in 1/5 files (seed.ts) - standard error handling for database operations

### Data Transformation Pattern
```typescript
// Convert price string "12,99 €" to number 12.99
const precio = Number(producto.texto_precio.slice(0, -2).replace(/,/, '.'))
```
**Frequency**: Used in 1/5 files (seed.ts) - specific to data seeding

### Resource Cleanup Pattern
```typescript
// Always disconnect from database when done
await prisma.$disconnect()
```
**Frequency**: Used in 2/5 files (seed.ts, consulta.ts) - mandatory cleanup pattern

## Prisma-Specific Conventions

### Schema Definition
- **Spanish field names**: Database fields use Spanish names with accents (título, descripción)
- **Explicit database types**: Use `@db.Char()`, `@db.Text` for precise PostgreSQL types
- **Decimal for currency**: Use `Decimal` type for monetary values (not Float)
- **Auto-increment IDs**: Primary keys use `@id @default(autoincrement())`
- **Preview features**: Enable experimental features like `fullTextSearchPostgres` in generator

### Query Options
- **Case-insensitive search**: Use `mode: 'insensitive'` for text searches
- **Text search operators**: `contains`, `startsWith` for partial matching
- **Ordering**: `orderBy` with `asc` or `desc` for sorting results
- **Filtering**: `where` clause with nested conditions for complex queries

## TypeScript Patterns

### Type Definitions
```typescript
// Define data structure types
type Producto = {
  título: string
  descripción: string
  texto_precio: string
  imagen: string
}

// Array type alias
type Productos = Producto[]
```
**Frequency**: Used in 1/5 files (seed.ts) - type safety for data structures

### Async/Await Usage
- **Top-level await**: Enabled by ES modules, used directly in script files
- **Async functions**: All database operations wrapped in async functions
- **Promise typing**: Explicit `Promise<void>` return types for async functions

## Project Structure Conventions

### File Organization
- **Configuration files**: Database client configuration in `prisma/` directory
- **Generated code**: Prisma-generated code in `generated/prisma/` (never edit manually)
- **Scripts**: Seed and query scripts at project root
- **Schema**: Single `schema.prisma` file defines entire data model

### Environment Variables
- **DATABASE_URL**: PostgreSQL connection string in .env file
- **Docker variables**: POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB for container setup
- **Security**: .env file excluded from version control via .gitignore

## Common Idioms

### Iteration Pattern
```typescript
// Modern for...of loop for arrays
for (const producto of productos) {
  // Process each item
}

// Array forEach for display
productos.forEach(p => {
  console.log(`- ${p.título}: ${p.precio}€`)
})
```
**Frequency**: Used in 2/5 files (seed.ts) - standard iteration approaches

### Console Output Pattern
```typescript
// Section headers with separators
console.log('\\n=== Section Title ===')

// Formatted output with template literals
console.log(`Encontrados ${count} productos:`)
console.log(`- ${item.título}: ${item.precio}€`)
```
**Frequency**: Used in 2/5 files (seed.ts, consulta.ts) - consistent logging style

## Best Practices Observed

1. **Single source of truth**: One configured Prisma client instance exported and reused
2. **Type safety**: TypeScript types defined for all data structures
3. **Error handling**: Try-catch blocks around database operations
4. **Resource management**: Always disconnect from database when done
5. **Data validation**: Type system ensures data structure correctness
6. **Separation of concerns**: Configuration, seeding, and querying in separate files
7. **Educational code**: Extensive comments make code self-documenting for learning
8. **Modern JavaScript**: ES modules, top-level await, template literals throughout
