import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

/**
 * Setup script that ensures migrations exist and database is initialized
 */
async function setup() {
  console.log('Setting up database...');
  
  try {
    // Ensure drizzle directory exists
    const drizzlePath = path.join(process.cwd(), 'drizzle');
    if (!existsSync(drizzlePath)) {
      console.log('Creating drizzle migrations directory...');
      mkdirSync(drizzlePath, { recursive: true });
    }
    
    // Generate migration if none exist
    try {
      console.log('Generating database migrations...');
      execSync('npx drizzle-kit generate', { stdio: 'inherit' });
    } catch {
      console.log('Migrations may already exist or schema is up to date');
    }
    
    // Import and run initialization
    const { initializeDatabase } = await import('./init.js');
    const result = await initializeDatabase();
    
    if (result.success) {
      console.log('Database setup completed successfully!');
    } else {
      throw new Error(result.message);
    }
    
  } catch (error) {
    console.error('Database setup failed:', error);
    throw error;
  }
}

// Run setup if called directly
if (require.main === module) {
  setup().catch((error) => {
    console.error('Setup failed:', error);
    process.exit(1);
  });
}

export { setup };