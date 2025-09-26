 import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { projectsTable, type NewProject } from './schema';
import { sql } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!, { casing: "snake_case" });

// Sample seed data for projects
const seedProjects: NewProject[] = [
  {
    title: "Portfolio/Blog Website",
    description: "A minimalist, responsive portfolio website built with Next.js and TypeScript",
    longDescription: "TBA",
    technologies: [  "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Drizzle ORM", "Postgresql", "Vercel", "Reactjs"],
    status: "In Progress",
    category: "Web Development",
    demoUrl: "https://jean-luc-portfolio.vercel.app",
    githubUrl: "https://github.com/JeanLucGaffud/JeanLuc-Portfolio",
    imageUrl: null,
    thumbnailUrl: null,
    screenshots: [],
    startDate: new Date('2025-09-07'),
    endDate: null,
    featured: true,
    priority: 1,
    slug: "portfolio-website",
    tags: ["React", "Full Stack"],
    challenges: "TBA",
    learnings: "TBA"
  },
  {
    title: "Word Trivia Board Game",
    description: "A console-based word trivia game featuring a grid board system, multiplayer support, and comprehensive admin functionality for word/clue management",
    longDescription: 
      "A sophisticated C programming project developed for CCPROG2 that implements a complete word trivia game with board-based gameplay. " +
      "Players navigate through a grid board where each cell contains the first letter of a word, and must correctly guess words based on relation-value clues within a 10-second time limit. " +
      "The game features a comprehensive admin system for managing words and clues, including CRUD operations, file import/export functionality, and data validation. " +
      "The implementation demonstrates advanced C programming concepts including custom data structures, file I/O operations, string manipulation, time-based gameplay mechanics, and modular code organization with separate game and admin phases.",

    technologies: ["C", "File I/O", "Struct Data Types", "String Manipulation", "Time Functions"],
    status: "Complete",
    category: "Console Gaming",
    demoUrl: null,
    githubUrl: null,
    imageUrl: null,
    thumbnailUrl: null,
    screenshots: [],
    startDate: new Date('2024-01-19'),
    endDate: new Date('2024-04-01'),
    featured: false,
    priority: 4,
    slug: "word-trivia-board-game",
    tags: ["C Programming", "Game Development", "Data Structures", "Academic Project", "Console Application"],
    challenges: 
      "Implementing a dynamic board generation system that ensures unique first letters per row while maintaining randomization. " +
      "Designing efficient search algorithms (linear, binary, and custom row search) for different data access patterns. " +
      "Managing complex game state with multiple players, turn-based mechanics, and time constraints. " +
      "Creating a robust admin system with comprehensive CRUD operations and file import/export functionality with duplicate handling and data validation.",
    learnings: 
      "Mastered advanced C programming concepts including complex struct hierarchies and pointer manipulation. " +
      "Developed proficiency in file I/O operations for data persistence and import/export functionality. " +
      "Learned to implement time-based game mechanics using C's time functions. " +
      "Gained experience in designing modular program architecture with separate game and admin phases. " +
      "Enhanced skills in string processing, input validation, and creating user-friendly console interfaces with menu systems."
  },
  {
    title: "Motel Reservation System",
    description: "A comprehensive motel management system with GUI interface for handling reservations, employee management, client records, and multi-branch operations",
    longDescription: 
      "A full-featured motel reservation and management system developed using Java Swing and MySQL database. " +
      "The application provides a complete solution for motel operations including room booking management, employee administration, client record keeping, and multi-branch coordination. " +
      "Features include real-time room availability checking, reservation scheduling, payment processing, employee role management, and comprehensive reporting capabilities. " +
      "The system implements a robust database design with proper normalization, transaction handling, and data integrity constraints. " +
      "Built with a user-friendly GUI interface using Java Swing components, providing intuitive navigation and efficient workflow management for motel staff and administrators.",
    technologies: ["Java", "Java Swing", "MySQL", "JDBC", "SQL"],
    status: "Complete",
    category: "Desktop Application",
    demoUrl: null,
    githubUrl: null,
    imageUrl: null,
    thumbnailUrl: null,
    screenshots: [],
    startDate: new Date('2024-09-09'),
    endDate: new Date('2024-11-23'),
    featured: false,
    priority: 3,
    slug: "motel-reservation-system",
    tags: ["Java", "Database Design", "Desktop Application", "Academic Project", "GUI Development"],
    challenges: 
      "Designing a normalized database schema to handle complex relationships between rooms, reservations, clients, employees, and multiple motel branches. " +
      "Implementing concurrent booking management to prevent double-bookings and handle simultaneous reservation requests. " +
      "Creating an intuitive GUI layout that accommodates multiple user roles (staff, managers, administrators) with appropriate access controls. " +
      "Developing efficient SQL queries for complex reporting requirements including occupancy rates, revenue analytics, and operational metrics across multiple branches.",
    learnings: 
      "Gained proficiency in Java Swing for creating professional desktop applications with complex UI components and event handling. " +
      "Mastered MySQL database design principles including normalization, indexing, and transaction management for business applications. " +
      "Developed skills in JDBC programming for database connectivity and implementing proper connection pooling and error handling. " +
      "Learned to design scalable software architecture with proper separation of concerns using MVC pattern and data access layers. " +
      "Enhanced understanding of business logic implementation for real-world applications including reservation systems, inventory management, and user access controls."
  }, 
{
    title: "The Forum",
    description: "Reddit-style forum with user authentication, file uploads, infinite scrolling, post comments, and upvote/downvote system",
    longDescription: 
      "A full-featured forum application built with Node.js and Express, featuring community-based discussions similar to Reddit. " +
      "The application provides comprehensive user management with authentication, community creation and management, post creation with image uploads, and interactive commenting systems. " +
      "Features include user registration and login, community browsing, post creation with file upload capabilities, infinite scrolling for better performance, voting system for posts and comments, user profiles, and real-time content management. " +
      "The system implements MongoDB for data persistence with proper schema design using Mongoose ODM, session management with MongoDB store, and secure file handling with Multer. " +
      "Built with EJS templating engine and responsive design, providing an intuitive user interface for seamless forum interaction and content discovery.",
    technologies: ["Node.js", "Express.js", "MongoDB", "Mongoose", "EJS", "JavaScript", "HTML/CSS", "Multer"],
    status: "Complete",
    category: "Web Application",
    demoUrl: "https://the-forum.onrender.com/",
    githubUrl: "https://github.com/JeanLucGaffud/The-Forum",
    imageUrl: null,
    thumbnailUrl: null,
    screenshots: [],
    startDate: new Date('2025-04-02'),
    endDate: new Date('2025-04-07'),
    featured: false,
    priority: 3,
    slug: "the-forum",
    tags: ["Node.js", "Express", "MongoDB", "Forum", "Social Media", "Web Development", "Full-Stack"],
    challenges: 
      "Implementing efficient infinite scrolling to handle large amounts of forum content without performance degradation. " +
      "Designing a scalable MongoDB schema to handle complex relationships between users, communities, posts, and comments with proper referencing. " +
      "Creating a secure file upload system with proper validation and storage management for user-generated content. " +
      "Implementing session-based authentication with secure cookie handling and proper user access controls across different forum features. " +
      "Managing real-time content updates and vote counting while maintaining data consistency and preventing race conditions.",
    learnings: 
      "Mastered full-stack web development using Node.js and Express.js for building scalable server-side applications. " +
      "Gained expertise in MongoDB and Mongoose ODM for designing efficient database schemas and managing complex data relationships. " +
      "Developed skills in EJS templating engine for dynamic server-side rendering and creating reusable view components. " +
      "Enhanced understanding of authentication systems, session management, and security best practices for web applications. " +
      "Learned to implement advanced features like infinite scrolling, file uploads, and real-time user interactions in a forum-style application."
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