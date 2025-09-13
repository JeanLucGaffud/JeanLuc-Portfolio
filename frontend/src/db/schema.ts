import { integer, pgTable, varchar, text, timestamp, boolean, json, pgEnum, index,serial } from "drizzle-orm/pg-core";

// Define enums
export const projectStatusEnum = pgEnum("project_status", ["In Progress", "Complete", "Planning", "On Hold"]);

const timestamps = {
  updatedAt: timestamp({ withTimezone: true }),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp({ withTimezone: true }),
}
//Use snake_case
export const projectsTable = pgTable("projects", {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  longDescription: text(),
  technologies: json().$type<string[]>().notNull().default([]),
  status: projectStatusEnum().notNull().default("In Progress"),
  category: varchar({ length: 100 }).notNull(),
  
  // URLs and Links
  demoUrl: varchar({ length: 500 }),
  githubUrl: varchar({ length: 500 }),
  
  // Images and Media  
  imageUrl: varchar({ length: 500 }),
  thumbnailUrl: varchar({ length: 500 }),
  screenshots: json().$type<string[]>().notNull().default([]),
  
  // Project Details
  startDate: timestamp({ withTimezone: true }).notNull().defaultNow(),
  endDate: timestamp({ withTimezone: true }),
  featured: boolean().notNull().default(false),
  priority: integer().notNull().default(0), // For ordering projects
  
  // Metadata
  slug: varchar({ length: 255 }).notNull().unique(), // URL-friendly version of title
  tags: json().$type<string[]>().notNull().default([]), // Additional tags for filtering
  challenges: text(), // What challenges you faced
  learnings: text(), // What you learned from this project
  
  ...timestamps,
}, (table) => [
  // Indexes for better query performance
  index("projects_status_idx").on(table.status),
  index("projects_featured_idx").on(table.featured),
  index("projects_priority_idx").on(table.priority),
  index("projects_category_idx").on(table.category),
  index("projects_slug_idx").on(table.slug), 
  index("projects_created_at_idx").on(table.createdAt),
  index("projects_deleted_at_idx").on(table.deletedAt),
]);

// Types for TypeScript
export type Project = typeof projectsTable.$inferSelect;
export type NewProject = typeof projectsTable.$inferInsert;

// Helper types for better development experience
export type ProjectStatus = typeof projectStatusEnum.enumValues[number];
export type ProjectWithoutTimestamps = Omit<Project, 'createdAt' | 'updatedAt' | 'deletedAt'>;
export type ProjectForUpdate = Partial<Omit<NewProject, 'id' | 'createdAt'>> & { updatedAt?: Date };

// Validation constants
export const PROJECT_VALIDATION = {
  TITLE_MAX_LENGTH: 255,
  DESCRIPTION_MIN_LENGTH: 10,
  CATEGORY_MAX_LENGTH: 100,
  URL_MAX_LENGTH: 500,
  SLUG_MAX_LENGTH: 255,
  MAX_SCREENSHOTS: 10,
  MAX_TECHNOLOGIES: 20,
  MAX_TAGS: 15,
} as const;
