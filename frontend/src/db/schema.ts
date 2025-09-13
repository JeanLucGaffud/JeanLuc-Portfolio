import { integer, pgTable, varchar, text, timestamp, boolean, json, pgEnum } from "drizzle-orm/pg-core";

// Define enums
export const projectStatusEnum = pgEnum("project_status", ["In Progress", "Complete", "Planning", "On Hold"]);

const timestamps = {
  updated_at: timestamp({withTimezone: true}),
  created_at: timestamp({withTimezone: true}).defaultNow().notNull(),
  deleted_at: timestamp({withTimezone: true}),
}

export const projectsTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  longDescription: text(),
  technologies: json().$type<string[]>().notNull().default([]),
  status: projectStatusEnum().notNull().default("In Progress"),
  category: varchar({ length: 100 }).notNull(),
  
  demoUrl: varchar({ length: 500 }),
  githubUrl: varchar({ length: 500 }),
  
  imageUrl: varchar({ length: 500 }),
  thumbnailUrl: varchar({ length: 500 }),
  screenshots: json().$type<string[]>().default([]),
  
  // Project Details
  startDate: timestamp().notNull().defaultNow(),
  endDate: timestamp(),
  featured: boolean().notNull().default(false),
  priority: integer().notNull().default(0), // For ordering projects
  
  // Metadata
  slug: varchar({ length: 255 }).notNull().unique(), // URL-friendly version of title
  tags: json().$type<string[]>().default([]), // Additional tags for filtering
  challenges: text(), // What challenges you faced
  learnings: text(), // What you learned from this project
  
  ...timestamps,
});

// Types for TypeScript
export type Project = typeof projectsTable.$inferSelect;
export type NewProject = typeof projectsTable.$inferInsert;
