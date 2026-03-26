# Project Structure

## Directory Organization

```
Tarea3/
├── .amazonq/rules/memory-bank/    # Amazon Q documentation and rules
├── generated/prisma/              # Auto-generated Prisma Client code (DO NOT EDIT)
│   ├── runtime/                   # Prisma runtime engine files
│   ├── client.js/d.ts             # Generated client implementation
│   ├── index.js/d.ts              # Main client exports
│   └── *.wasm, *.node             # Query engine binaries
├── prisma/                        # Prisma configuration and migrations
│   ├── migrations/                # Database migration history
│   │   ├── 20260306163822_esquema_inicial/  # Initial schema migration
│   │   └── migration_lock.toml    # Migration lock file
│   ├── prisma.client.ts           # Prisma client configuration
│   └── schema.prisma              # Database schema definition
├── Tarea 3_files/                 # Static assets for documentation
├── .env                           # Environment variables (DATABASE_URL, credentials)
├── .gitignore                     # Git ignore patterns
├── consulta.ts                    # Database query examples
├── docker-compose.yml             # PostgreSQL container configuration
├── package.json                   # Node.js dependencies and scripts
├── productos.json                 # Product seed data
├── README.md                      # Project documentation
├── seed.ts                        # Database seeding script
└── *.html, *.pdf, *.md            # Assignment documentation files
```

## Core Components

### Database Layer
- **docker-compose.yml**: Defines PostgreSQL container with Alpine Linux, port 5432, persistent volume
- **prisma/schema.prisma**: Single Producto model with id, título, descripción, precio, imagen fields
- **prisma/migrations/**: Version-controlled schema changes applied to database

### Application Layer
- **prisma/prisma.client.ts**: Configured PrismaClient with PrismaPg adapter for PostgreSQL connection
- **seed.ts**: Reads productos.json and populates database with initial product data
- **consulta.ts**: Example queries demonstrating Prisma Client usage patterns

### Generated Code
- **generated/prisma/**: Auto-generated TypeScript types and client code based on schema.prisma
- Provides type-safe database access with IntelliSense support
- Includes query engine binaries for database operations

## Architectural Patterns

### ORM Pattern
- Prisma acts as abstraction layer between application code and PostgreSQL
- Schema-first approach: define models in schema.prisma, generate client code
- Type safety: TypeScript types automatically generated from database schema

### Configuration Management
- Environment variables in .env file for database credentials
- Separate configuration file (prisma.client.ts) for client initialization
- Docker Compose for infrastructure-as-code database setup

### Data Flow
1. Schema defined in schema.prisma
2. Migration created with `prisma migrate dev`
3. Client generated with `prisma generate`
4. Application imports configured client from prisma.client.ts
5. Type-safe queries executed against PostgreSQL

## Key Relationships
- schema.prisma → generates → generated/prisma/
- prisma.client.ts → imports → generated/prisma/client.ts
- seed.ts/consulta.ts → imports → prisma.client.ts
- docker-compose.yml → provides → PostgreSQL database
- .env → configures → database connection and Docker environment
