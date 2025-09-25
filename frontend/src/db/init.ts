 import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { projectsTable, type NewProject } from './schema';
import { sql } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!, { casing: "snake_case" });

// Sample seed data for projects
const seedProjects: NewProject[] = [
  {
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js and TypeScript",
    longDescription: "This portfolio website showcases my projects and skills using cutting-edge web technologies. Built with Next.js 15, it features server-side rendering, optimized images, and a clean, modern design system using Tailwind CSS and shadcn/ui components.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Drizzle ORM", "PostgreSQL", "Vercel"],
    status: "Complete",
    category: "Web Development",
    demoUrl: "https://jeanluc-portfolio.vercel.app",
    githubUrl: "https://github.com/JeanLucGaffud/JeanLuc-Portfolio",
    imageUrl: "/projects/portfolio-hero.png",
    thumbnailUrl: "/projects/portfolio-thumb.png",
    screenshots: ["/projects/portfolio-1.png", "/projects/portfolio-2.png"],
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-28'),
    featured: true,
    priority: 1,
    slug: "portfolio-website",
    tags: ["React", "Frontend", "Full Stack", "Responsive"],
    challenges: "Implementing server-side rendering while maintaining optimal performance and SEO optimization.",
    learnings: "Gained deeper understanding of Next.js App Router, TypeScript best practices, and modern CSS techniques."
  }
];

/**
 * Initialize the database by dropping existing tables, running migrations, and seeding data
 */
export async function initializeDatabase() {
  console.log('Starting database initialization...');
  
  try {
    // Drop existing tables (be careful in production!)
    console.log('Dropping existing tables...');
    await db.execute(sql`DROP TABLE IF EXISTS projects CASCADE`);
    await db.execute(sql`DROP TYPE IF EXISTS project_status CASCADE`);
    
    // Recreate tables using the resetDatabase function
    console.log('Recreating database tables...');
    const resetResult = await resetDatabase();
    if (!resetResult.success) {
      throw new Error(resetResult.error || 'Failed to reset database');
    }
    
    // Seed the database with sample data
    console.log('Seeding database with sample data...');
    await db.insert(projectsTable).values(seedProjects);
    
    // Verify the data was inserted
    const projectCount = await db.select().from(projectsTable);
    console.log(`Database initialized successfully! Inserted ${projectCount.length} projects.`);
    
    return {
      success: true,
      message: `Database initialized with ${projectCount.length} projects`,
      projectsCreated: projectCount.length
    };
    
  } catch (error) {
    console.error('Database initialization failed:', error);
    return {
      success: false,
      message: 'Database initialization failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Reset database without migrations (drops and recreates tables with current schema)
 */
export async function resetDatabase() {
  console.log('Resetting database...');
  
  try {
    // Drop existing tables
    await db.execute(sql`DROP TABLE IF EXISTS projects CASCADE`);
    await db.execute(sql`DROP TYPE IF EXISTS project_status CASCADE`);
    
    // Recreate the enum
    await db.execute(sql`CREATE TYPE project_status AS ENUM ('In Progress', 'Complete', 'Planning', 'On Hold')`);
    
    // Recreate the projects table
    await db.execute(sql`
      CREATE TABLE projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        long_description TEXT,
        technologies JSON NOT NULL DEFAULT '[]'::json,
        status project_status NOT NULL DEFAULT 'In Progress',
        category VARCHAR(100) NOT NULL,
        demo_url VARCHAR(500),
        github_url VARCHAR(500),
        image_url VARCHAR(500),
        thumbnail_url VARCHAR(500),
        screenshots JSON NOT NULL DEFAULT '[]'::json,
        start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        end_date TIMESTAMP WITH TIME ZONE,
        featured BOOLEAN NOT NULL DEFAULT FALSE,
        priority INTEGER NOT NULL DEFAULT 0,
        slug VARCHAR(255) NOT NULL UNIQUE,
        tags JSON NOT NULL DEFAULT '[]'::json,
        challenges TEXT,
        learnings TEXT,
        updated_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMP WITH TIME ZONE
      )
    `);
    
    // Create indexes
    await db.execute(sql`CREATE INDEX projects_status_idx ON projects(status)`);
    await db.execute(sql`CREATE INDEX projects_featured_idx ON projects(featured)`);
    await db.execute(sql`CREATE INDEX projects_priority_idx ON projects(priority)`);
    await db.execute(sql`CREATE INDEX projects_category_idx ON projects(category)`);
    await db.execute(sql`CREATE INDEX projects_slug_idx ON projects(slug)`);
    await db.execute(sql`CREATE INDEX projects_created_at_idx ON projects(created_at)`);
    await db.execute(sql`CREATE INDEX projects_deleted_at_idx ON projects(deleted_at)`);
    
    console.log('Database reset completed successfully!');
    
    return { success: true, message: 'Database reset successfully' };
    
  } catch (error) {
    console.error('Database reset failed:', error);
    return {
      success: false,
      message: 'Database reset failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Seed the database with sample data (without dropping tables)
 */
export async function seedDatabase() {
  console.log('Seeding database...');
  
  try {
    // Clear existing data
    await db.delete(projectsTable);
    
    // Insert seed data
    await db.insert(projectsTable).values(seedProjects);
    
    const projectCount = await db.select().from(projectsTable);
    console.log(`Database seeded successfully! Inserted ${projectCount.length} projects.`);
    
    return {
      success: true,
      message: `Database seeded with ${projectCount.length} projects`,
      projectsCreated: projectCount.length
    };
    
  } catch (error) {
    console.error('Database seeding failed:', error);
    return {
      success: false,
      message: 'Database seeding failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// CLI execution when run directly
if (require.main === module) {
  const command = process.argv[2] || 'init';
  
  switch (command) {
    case 'init':
      initializeDatabase().then(() => process.exit(0)).catch(() => process.exit(1));
      break;
    case 'reset':
      resetDatabase().then(() => process.exit(0)).catch(() => process.exit(1));
      break;
    case 'seed':
      seedDatabase().then(() => process.exit(0)).catch(() => process.exit(1));
      break;
    default:
      console.log('Usage: npm run db:init [init|reset|seed]');
      console.log('  init  - Drop tables, run migrations, and seed data (default)');
      console.log('  reset - Drop and recreate tables without migrations');
      console.log('  seed  - Clear and reseed data only');
      process.exit(1);
  }
}