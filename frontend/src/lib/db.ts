import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { projectsTable } from '../db/schema';
  
const db = drizzle(process.env.DATABASE_URL!, {casing: "snake_case"});

export async function getProjects() {
    const projectsList = await db.select().from(projectsTable);
    return projectsList;
}

export async function getProjectBySlug(slug: string) {
    const project = await db.select().from(projectsTable).where(eq(projectsTable.slug, slug)).limit(1);
    return project[0] || null;
}