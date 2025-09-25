#!/usr/bin/env node
import { initializeDatabase } from './init.js';

/**
 * Auto-initialization script that runs on project startup
 * This will reset and seed the database every time the development server starts
 */
async function autoInit() {
  console.log('Auto-initializing database for development...');
  
  const result = await initializeDatabase();
  
  if (result.success) {
    console.log(`${result.message}`);
  } else {
    console.error(`${result.message}`);
    if (result.error) {
      console.error('Error details:', result.error);
    }
    process.exit(1);
  }
}

autoInit().catch((error) => {
  console.error('Auto-initialization failed:', error);
  process.exit(1);
});