import { integer, pgTable, varchar, text, timestamp, boolean, json, pgEnum, index,serial } from "drizzle-orm/pg-core";

// Define enums
export const projectStatusEnum = pgEnum("project_status", ["In Progress", "Complete", "Planning", "On Hold"]);

const timestamps = {
  updatedAt: timestamp({ withTimezone: true }),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp({ withTimezone: true }),
}

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
  priority: integer().notNull().default(0), 
  
  // Metadata
  slug: varchar({ length: 255 }).notNull().unique(),
  tags: json().$type<string[]>().notNull().default([]), 
  challenges: text(), 
  learnings: text(),
  
  //Article timestamps
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


export type Project = typeof projectsTable.$inferSelect;
export type NewProject = typeof projectsTable.$inferInsert;

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


export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(), 
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const comments = pgTable("comments", {
  id: serial().primaryKey(),
  projectId: integer("project_id").notNull().references(() => projectsTable.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const schema = {
  projectsTable,
  user,
  session,
  comments,
  account,
  verification,
};