import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, desc, asc, and, isNull, or, ilike } from 'drizzle-orm';
import { projectsTable, type Project, type NewProject , commentsTable} from './schema';
  
const db = drizzle(process.env.DATABASE_URL!, {casing: "snake_case"});


// Export the database instance for use in other modules
export { db };

/**
 * Get all projects (excluding soft-deleted ones)
 */
export async function getProjects() {
    const projectsList = await db
        .select()
        .from(projectsTable)
        .where(isNull(projectsTable.deletedAt))
        .orderBy(desc(projectsTable.priority), desc(projectsTable.createdAt));
    return projectsList;
}

/**
 * Get projects paginated with total count
 */
export async function getPaginatedProjects(props: { page: number; limit?: number; query?: string }) {
    const { page, limit = 6, query } = props;
    
    const baseCondition = isNull(projectsTable.deletedAt);
    let whereCondition = baseCondition;
    
    // Add search functionality if query is provided
    if (query && query.trim()) {
        const searchCondition = or(
            ilike(projectsTable.title, `%${query}%`),
            ilike(projectsTable.description, `%${query}%`),
            ilike(projectsTable.category, `%${query}%`)
        );
        whereCondition = and(baseCondition, searchCondition)!;
    }
    
    const projectsList = await db
        .select()
        .from(projectsTable)
        .where(whereCondition)
        .orderBy(asc(projectsTable.priority), desc(projectsTable.createdAt))
        .limit(limit)
        .offset((page - 1) * limit);
        
    const totalCountResult = await db
        .select({ count: projectsTable.id })
        .from(projectsTable)
        .where(whereCondition);
    
    const totalCount = totalCountResult.length;
    const totalPages = Math.ceil(totalCount / limit);
    
    return {
        projects: projectsList,
        totalCount,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
    };
}


/**
 * Get featured projects only
 */
export async function getFeaturedProjects() {
    const featuredProjects = await db
        .select()
        .from(projectsTable)
        .where(and(eq(projectsTable.featured, true), isNull(projectsTable.deletedAt)))
        .orderBy(asc(projectsTable.priority));
    return featuredProjects;
}

/**
 * Get project by slug
 */
export async function getProjectBySlug(slug: string) {
    const project = await db
        .select()
        .from(projectsTable)
        .where(and(eq(projectsTable.slug, slug), isNull(projectsTable.deletedAt)))
        .limit(1);
    return project[0] || null;
}

/**
 * Get projects by category
 */
export async function getProjectsByCategory(category: string) {
    const projects = await db
        .select()
        .from(projectsTable)
        .where(and(eq(projectsTable.category, category), isNull(projectsTable.deletedAt)))
        .orderBy(desc(projectsTable.priority), desc(projectsTable.createdAt));
    return projects;
}

/**
 * Get projects by status
 */
export async function getProjectsByStatus(status: Project['status']) {
    const projects = await db
        .select()
        .from(projectsTable)
        .where(and(eq(projectsTable.status, status), isNull(projectsTable.deletedAt)))
        .orderBy(desc(projectsTable.priority), desc(projectsTable.createdAt));
    return projects;
}

/**
 * Create a new project
 */
export async function createProject(project: NewProject) {
    const newProject = await db
        .insert(projectsTable)
        .values({
            ...project,
            createdAt: new Date(),
        })
        .returning();
    return newProject[0];
}

/**
 * Update a project by ID
 */
export async function updateProject(id: number, updates: Partial<NewProject>) {
    const updatedProject = await db
        .update(projectsTable)
        .set({
            ...updates,
            updatedAt: new Date(),
        })
        .where(eq(projectsTable.id, id))
        .returning();
    return updatedProject[0] || null;
}

/**
 * Soft delete a project (sets deletedAt timestamp)
 */
export async function deleteProject(id: number) {
    const deletedProject = await db
        .update(projectsTable)
        .set({
            deletedAt: new Date(),
            updatedAt: new Date(),
        })
        .where(eq(projectsTable.id, id))
        .returning();
    return deletedProject[0] || null;
}

/**
 * Get project statistics
 */
export async function getProjectStats() {
    const allProjects = await getProjects();
    
    const stats = {
        total: allProjects.length,
        featured: allProjects.filter(p => p.featured).length,
        completed: allProjects.filter(p => p.status === 'Complete').length,
        inProgress: allProjects.filter(p => p.status === 'In Progress').length,
        planning: allProjects.filter(p => p.status === 'Planning').length,
        onHold: allProjects.filter(p => p.status === 'On Hold').length,
        categories: [...new Set(allProjects.map(p => p.category))].length,
        technologies: [...new Set(allProjects.flatMap(p => p.technologies || []))].length,
    };
    
    return stats;
}

