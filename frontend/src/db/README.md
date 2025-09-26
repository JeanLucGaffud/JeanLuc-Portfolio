# Database Initialization System

This directory contains the database initialization and seeding system for the portfolio project.

## Files

- **`schema.ts`** - Database schema definitions using Drizzle ORM
- **`init.ts`** - Main initialization script with reset and seed functionality  
- **`setup.ts`** - Setup script that handles migrations and initialization
- **`auto-init.ts`** - Automatic initialization for development (unused currently)

## Scripts

The following npm scripts are available for database management:

### Development Scripts

```bash
# Start development server without database initialization
npm run dev

# Start development server with automatic database setup
npm run dev:no-init
```

### Database Management Scripts

```bash
# Full setup: generates migrations and initializes database
npm run db:setup

# Initialize database (drop tables, recreate, and seed)
npm run db:init

# Reset database structure only (no seeding)
npm run db:reset  

# Seed database with sample data only
npm run db:seed

# Generate new migrations from schema changes
npm run db:generate

# Run existing migrations
npm run db:migrate

# Open Drizzle Studio for database inspection
npm run db:studio
```

## How It Works

### Automatic Initialization

When you run `npm run dev`, the system will:

1. **Check for migrations** - Generates them if they don't exist
2. **Drop existing tables** - Cleans the database completely
3. **Recreate tables** - Rebuilds the schema from scratch
4. **Seed sample data** - Inserts 5 sample projects
5. **Start the dev server** - Launches Next.js with fresh data

### Sample Data

The system seeds the database with 5 sample projects including:

- **Portfolio Website** - This portfolio site (Featured, Complete)
- **E-Commerce Dashboard** - Full-stack dashboard (Featured, In Progress)  
- **Task Management App** - Vue.js collaboration tool (Complete)
- **Weather API Service** - Python/FastAPI backend (Complete)
- **Mobile Fitness Tracker** - React Native app (Planning)

Each project includes:
- Title, descriptions, and long descriptions
- Technology stacks and categories
- Demo and GitHub URLs
- Image and screenshot URLs  
- Start/end dates and status
- Tags, challenges, and learnings
- Priority and featured flags

### Environment Variables

Make sure your `.env` file contains:

```env
DATABASE_URL=your_neon_database_connection_string
```

## Customization

### Adding New Sample Projects

Edit the `seedProjects` array in `src/db/init.ts` to add your own sample data:

```typescript
const seedProjects: NewProject[] = [
  {
    title: "Your Project",
    description: "Brief description",
    technologies: ["React", "TypeScript"],
    status: "Complete",
    category: "Web Development",
    slug: "your-project-slug",
    // ... other fields
  },
  // ... existing projects
];
```

### Disabling Auto-Initialization

If you want to start the dev server without resetting the database:

```bash
npm run dev:no-init
```

### Production Considerations

**⚠️ WARNING:** The initialization scripts will **DROP ALL TABLES** and **DELETE ALL DATA**.

- Never use `db:init` or `db:reset` in production
- For production, use `db:migrate` to run migrations safely
- Consider using `db:seed` separately only for initial setup

### Database Schema Changes

1. Modify `src/db/schema.ts` with your changes
2. Generate migrations: `npm run db:generate`
3. Review the generated migration files in `./drizzle/`
4. Apply migrations: `npm run db:migrate`

For development with auto-reset, just run `npm run dev` and changes will be applied automatically.

## Troubleshooting

### Migration Errors

If you get migration errors, try:

```bash
npm run db:reset  # Recreate tables without migrations
npm run db:seed   # Add sample data
```

### Connection Issues

- Verify `DATABASE_URL` in your `.env` file
- Ensure your Neon database is accessible
- Check your network connection

### TypeScript Errors

Make sure you have the required dependencies:

```bash
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit tsx
```

## Manual Database Operations

You can also import and use the functions directly:

```typescript
import { initializeDatabase, resetDatabase, seedDatabase } from './src/db/init';

// Full initialization
await initializeDatabase();

// Just reset structure  
await resetDatabase();

// Just seed data
await seedDatabase();
```