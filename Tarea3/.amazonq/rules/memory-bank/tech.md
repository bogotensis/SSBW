# Technology Stack

## Programming Languages
- **TypeScript**: Primary language for application code (seed.ts, consulta.ts, prisma.client.ts)
- **JavaScript**: Generated Prisma Client code and runtime
- **SQL**: Underlying database queries (abstracted by Prisma)

## Runtime & Build Tools
- **Node.js**: JavaScript runtime (version 18 or higher required)
- **tsx**: TypeScript execution tool for running .ts files directly without compilation
- **npm**: Package manager for dependency management

## Database Technologies
- **PostgreSQL**: Relational database management system (Alpine Linux variant)
- **Docker**: Container platform for running PostgreSQL
- **Docker Compose**: Multi-container orchestration (version 3.8)

## ORM & Database Tools
- **Prisma**: Version 6.0.0
  - `prisma`: CLI tool for migrations, schema management, and code generation
  - `@prisma/client`: Type-safe database client
  - `@prisma/adapter-pg`: PostgreSQL adapter for Prisma Client
- **Prisma Studio**: Web-based GUI for database inspection (port 5555)

## Dependencies

### Development Dependencies
```json
{
  "prisma": "^6.0.0",
  "dotenv": "^16.4.5",
  "tsx": "^4.19.2"
}
```

### Production Dependencies
```json
{
  "@prisma/client": "^6.0.0",
  "@prisma/adapter-pg": "^6.0.0"
}
```

## Development Commands

### Initial Setup
```bash
npm install                          # Install all dependencies
docker compose up -d                 # Start PostgreSQL container
npx prisma migrate dev --name <name> # Create and apply migration
npx prisma generate                  # Generate Prisma Client
```

### Database Operations
```bash
npm run seed                         # Populate database from productos.json
npm run consulta                     # Run example queries
npx prisma studio                    # Open Prisma Studio (localhost:5555)
npx prisma migrate reset             # Reset database and reapply migrations
npx prisma migrate status            # Check migration status
```

### Docker Management
```bash
docker compose up -d                 # Start database in detached mode
docker compose down                  # Stop database
docker compose down -v               # Stop database and remove volumes
docker compose logs -f db            # View database logs
docker ps                            # List running containers
docker exec -it postgres_ssbw psql -U yo -d ssbw  # Connect to PostgreSQL CLI
```

### Troubleshooting
```bash
lsof -i :5432                        # Check if port 5432 is in use
docker ps                            # Verify container is running
```

## Configuration Files

### package.json
- Defines project metadata and dependencies
- Custom scripts: `seed` and `consulta`
- Module type: ES modules (`"type": "module"`)

### docker-compose.yml
- PostgreSQL Alpine image
- Port mapping: 5432:5432
- Persistent volume: postgres_data
- Environment variables from .env

### .env
- DATABASE_URL: PostgreSQL connection string
- POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB: Docker environment variables

### prisma/schema.prisma
- Generator configuration: output to ../generated/prisma
- Preview features: fullTextSearchPostgres
- Datasource: PostgreSQL with DATABASE_URL from .env
- Model definitions: Producto table structure

## Version Requirements
- Node.js: 18+
- Docker: Latest stable
- Docker Compose: 3.8+
- Prisma: 6.0.0
